#!/usr/bin/env python3
"""Scraper per AutoScout24 (dealer page -> raccoglie annunci e immagini)

Uso:
  python3 scripts/scrape_autoscout.py --dealer-url "<URL del dealer>" [--download-images]

Note:
 - Questo script usa Selenium per renderizzare JS. Scaricherà automaticamente il chromedriver.
 - Esegui lo script localmente: l'ambiente qui nel container non ha accesso al web.
 - Rispetta robots.txt e i termini del sito; questo script è pensato per uso legittimo del proprietario dei dati.
"""

import argparse
import json
import os
import time
import re
from urllib.parse import urlparse, urljoin

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import requests


def setup_driver(headless=True):
    opts = Options()
    if headless:
        opts.add_argument("--headless=new")
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-dev-shm-usage")
    opts.add_argument("--window-size=1920,1080")
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=opts)
    return driver


def is_listing_url(href, dealer_netloc):
    if not href:
        return False
    # only same domain
    parsed = urlparse(href)
    if parsed.netloc and dealer_netloc not in parsed.netloc:
        return False
    # heuristics: many AutoScout ad urls contain '/annunci' or '/listing' or long id-like path
    if '/annunci/' in href or '/announcement/' in href or '/advertisement' in href or re.search(r'/[0-9]{4,}', href):
        return True
    # fallback: if path length is long and not the dealer page
    if len(parsed.path) > 20:
        return True
    return False


def extract_from_listing(html, url):
    soup = BeautifulSoup(html, 'lxml')
    data = {
        'source_url': url,
        'title': None,
        'price': None,
        'year': None,
        'mileage': None,
        'fuel': None,
        'gearbox': None,
        'kw': None,
        'location': None,
        'images': [],
        'description': None,
        'publication_date': None,
    }

    # try JSON-LD
    for script in soup.find_all('script', type='application/ld+json'):
        try:
            j = json.loads(script.string)
        except Exception:
            continue
        if isinstance(j, dict):
            if j.get('@type') in ('Product', 'Vehicle', 'Car') or 'vehicle' in (j.get('name','') or '').lower():
                # map fields
                data['title'] = data['title'] or j.get('name')
                images = j.get('image') or j.get('images') or []
                if isinstance(images, str):
                    images = [images]
                data['images'].extend(images)
                data['description'] = data['description'] or j.get('description')
                price = j.get('offers', {}).get('price') if isinstance(j.get('offers'), dict) else None
                data['price'] = data['price'] or price

    # meta tags
    og_title = soup.find('meta', property='og:title')
    if og_title and not data['title']:
        data['title'] = og_title.get('content')
    og_desc = soup.find('meta', property='og:description')
    if og_desc and not data['description']:
        data['description'] = og_desc.get('content')
    og_image = soup.find('meta', property='og:image')
    if og_image:
        data['images'].append(og_image.get('content'))

    # find common labels for price/year/km
    text = soup.get_text(separator='|')
    # price: look for €\n    m = re.search(r'€\s*[0-9\.\,]+', text)
    if m and not data['price']:
        data['price'] = m.group(0)
    # year: 19xx or 20xx
    m = re.search(r'\b(19|20)\d{2}\b', text)
    if m:
        data['year'] = m.group(0)
    # mileage: look for km
    m = re.search(r'([0-9\.\,]+)\s*km', text, re.IGNORECASE)
    if m:
        data['mileage'] = m.group(0)

    # images: gather img tags
    imgs = set()
    for img in soup.find_all('img'):
        src = img.get('data-src') or img.get('src') or img.get('data-lazy-src')
        if src and src.startswith('http'):
            imgs.add(src)
    data['images'].extend(list(imgs))

    # more precise extraction for fields inside page: try labels
    try:
        spec_table = soup.find('table')
        if spec_table:
            for row in spec_table.find_all('tr'):
                tds = row.find_all(['td', 'th'])
                if len(tds) >= 2:
                    key = tds[0].get_text(strip=True).lower()
                    val = tds[1].get_text(strip=True)
                    if 'alimentazione' in key or 'carburante' in key or 'fuel' in key:
                        data['fuel'] = val
                    if 'cambio' in key or 'gear' in key:
                        data['gearbox'] = val
                    if 'kw' in key or 'kw' in key:
                        data['kw'] = val
    except Exception:
        pass

    # fallback title from h1
    h1 = soup.find('h1')
    if h1 and not data['title']:
        data['title'] = h1.get_text(strip=True)

    # trim duplicates and empty
    data['images'] = [u for u in dict.fromkeys(data['images']) if u]

    return data


def download_image(url, path):
    try:
        r = requests.get(url, stream=True, timeout=20)
        r.raise_for_status()
        with open(path, 'wb') as f:
            for chunk in r.iter_content(1024 * 10):
                f.write(chunk)
        return True
    except Exception as e:
        print(f"Impossibile scaricare {url}: {e}")
        return False


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dealer-url', required=True, help='URL della pagina concessionario su AutoScout')
    parser.add_argument('--download-images', action='store_true', help='Scarica le immagini localmente in data/images/')
    parser.add_argument('--headless', action='store_true', default=True, help='Esegui browser in headless mode')
    args = parser.parse_args()

    out_dir = os.path.join(os.getcwd(), 'data')
    os.makedirs(out_dir, exist_ok=True)
    images_dir = os.path.join(out_dir, 'images')
    if args.download_images:
        os.makedirs(images_dir, exist_ok=True)

    driver = setup_driver(headless=args.headless)
    print('Apro la pagina concessionario...')
    driver.get(args.dealer_url)
    time.sleep(3)

    dealer_netloc = urlparse(args.dealer_url).netloc

    # raccogli tutti i link presenti nella pagina concessionario
    anchors = driver.find_elements(By.TAG_NAME, 'a')
    hrefs = [a.get_attribute('href') for a in anchors]
    hrefs = [h for h in hrefs if h]

    listing_candidates = []
    for h in hrefs:
        if is_listing_url(h, dealer_netloc):
            listing_candidates.append(h)

    listing_candidates = list(dict.fromkeys(listing_candidates))
    print(f'Trovati {len(listing_candidates)} link candidati; verranno visitati in sequenza.')

    vehicles = []
    for i, link in enumerate(listing_candidates, start=1):
        print(f'[{i}/{len(listing_candidates)}] Carico: {link}')
        try:
            driver.get(link)
            time.sleep(2.5)
            html = driver.page_source
            v = extract_from_listing(html, link)
            v['id'] = f"vehicle-{i}"
            vehicles.append(v)

            if args.download_images and v.get('images'):
                v_image_dir = os.path.join(images_dir, v['id'])
                os.makedirs(v_image_dir, exist_ok=True)
                for idx, img_url in enumerate(v['images'], start=1):
                    ext = os.path.splitext(urlparse(img_url).path)[1] or '.jpg'
                    fname = f"img_{idx}{ext}"
                    dest = os.path.join(v_image_dir, fname)
                    download_image(img_url, dest)
        except Exception as e:
            print(f"Errore durante l'estrazione di {link}: {e}")

    driver.quit()

    out_path = os.path.join(out_dir, 'vehicles.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(vehicles, f, ensure_ascii=False, indent=2)

    print(f'Completato. Dati salvati in {out_path} (veicoli: {len(vehicles)})')


if __name__ == '__main__':
    main()
