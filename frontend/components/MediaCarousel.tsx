import React, { useEffect, useRef, useState } from 'react'

type MediaItem = {
  type: 'image' | 'video' | 'clip'
  title: string
  src: string
  // optional clip times (seconds)
  start?: number
  end?: number
}

function toYouTubeEmbed(src: string, start?: number, end?: number) {
  try {
    // extract video id from various YouTube URL formats
    const url = new URL(src)
    let id = ''
    if (url.hostname.includes('youtube.com')) {
      id = url.searchParams.get('v') || ''
    } else if (url.hostname === 'youtu.be') {
      id = url.pathname.slice(1)
    }
    if (!id) {
      // fallback: try last path segment
      const parts = url.pathname.split('/').filter(Boolean)
      id = parts[parts.length - 1] || ''
    }
    if (!id) return src

    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      controls: '0',
      modestbranding: '1',
      rel: '0',
      showinfo: '0',
      fs: '0',
      playsinline: '1',
      enablejsapi: '0',
      iv_load_policy: '3'
    })
    if (start) params.set('start', String(start))
    if (end) params.set('end', String(end))
    return `https://www.youtube.com/embed/${id}?${params.toString()}`
  } catch (e) {
    return src
  }
}

const MediaCarousel: React.FC<{ items: MediaItem[]; interval?: number }> = ({ items, interval = 6000 }) => {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)
  const clipRef = useRef<number | null>(null)

  // Prefer clips if present: reorder so clips come first (keeps original order otherwise)
  const ordered = React.useMemo(() => {
    const clips = items.filter(i => i.type === 'clip')
    const others = items.filter(i => i.type !== 'clip')
    return clips.concat(others)
  }, [items])

  useEffect(() => {
    const current = ordered[index]

    if (timerRef.current) window.clearTimeout(timerRef.current)
    if (clipRef.current) window.clearTimeout(clipRef.current)
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % ordered.length)
    }, interval)

    // handle precise clip advance when start/end provided
    if (current?.type === 'clip' && current.start !== undefined && current.end !== undefined) {
      const duration = Math.max((current.end - current.start) * 1000, 1000)
      clipRef.current = window.setTimeout(() => {
        setIndex((i) => (i + 1) % ordered.length)
      }, duration)
    }

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      if (clipRef.current) window.clearTimeout(clipRef.current)
    }
  }, [index, ordered, interval])

  if (!ordered || ordered.length === 0) return null

  const current = ordered[index]

  const renderMedia = (it: MediaItem) => {
    if (it.type === 'image') {
      return <img src={it.src} alt={it.title} className="w-full h-full object-cover" />
    }

    const isYouTube = /youtu(?:\.be|be\.com)/i.test(it.src)
    if (isYouTube) {
      const embed = toYouTubeEmbed(it.src, it.start, it.end)
      return (
        <iframe
          title={it.title}
          src={embed}
          className="w-full h-full"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
    }

    // HTML5 video for mp4/local clips: precise control with events
    if (it.src.endsWith('.mp4') || it.src.includes('.mp4')) {
      const start = it.start || 0
      const end = it.end || undefined
      return (
        <video
          className="w-full h-full object-cover"
          src={it.src + (it.start || it.start === 0 ? `#t=${start}` : '')}
          playsInline
          muted
          autoPlay
          loop={!end}
          controls={false}
        />
      )
    }

    // fallback iframe for other providers
    return (
      <iframe
        title={it.title}
        src={it.src}
        className="w-full h-full"
        frameBorder={0}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    )
  }

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded">
        <div className="w-full bg-black flex items-center justify-center aspect-[16/9] sm:aspect-[18/9] md:h-[420px]">
          {renderMedia(current)}
        </div>
      </div>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="text-sm font-semibold leading-snug">{current.title}</div>
        <div className="flex items-center gap-2" aria-label="Indicatori carosello">
          {ordered.map((it, i) => (
            <button
              key={i}
              aria-label={`Vai a ${it.title}`}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === index ? 'bg-codecar-ocra scale-110' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MediaCarousel
