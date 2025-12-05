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

  // Prefer clips if present: reorder so clips come first (keeps original order otherwise)
  const ordered = React.useMemo(() => {
    const clips = items.filter(i => i.type === 'clip')
    const others = items.filter(i => i.type !== 'clip')
    return clips.concat(others)
  }, [items])

  useEffect(() => {
    start()
    return stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, ordered])

  const start = () => {
    stop()
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % ordered.length)
    }, interval)
  }

  const stop = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = null
  }

  if (!ordered || ordered.length === 0) return null

  const current = ordered[index]

  // For autoplay snippets we manage timers: HTML5 video gives precise events, YouTube uses embed start/end and a fallback timer
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const ytTimerRef = useRef<number | null>(null)

  useEffect(() => {
    // cleanup timers on unmount
    return () => {
      if (ytTimerRef.current) window.clearTimeout(ytTimerRef.current)
    }
  }, [])

  const logEvent = (name: string, payload: any = {}) => {
    // analytics stub: replace with GA/Plausible/event endpoint integration
    try { console.log('[analytics]', name, payload) } catch (e) {}
  }

  const renderMedia = (it: MediaItem) => {
    if (it.type === 'image') {
      return <img src={it.src} alt={it.title} className="w-full h-full object-cover" />
    }

    const isYouTube = /youtu(?:\.be|be\.com)/i.test(it.src)
    if (isYouTube) {
      const embed = toYouTubeEmbed(it.src, it.start, it.end)
      // schedule advance based on start/end when clip provided
      useEffect(() => {
        if (it.start !== undefined && it.end !== undefined) {
          const dur = (it.end - it.start) * 1000
          if (ytTimerRef.current) window.clearTimeout(ytTimerRef.current)
          ytTimerRef.current = window.setTimeout(() => {
            // advance
            setIndex((i) => (i + 1) % ordered.length)
            logEvent('clip_end', { title: it.title })
          }, dur)
          logEvent('clip_start', { title: it.title, duration: dur })
        }
        return () => { if (ytTimerRef.current) window.clearTimeout(ytTimerRef.current) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [index])

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
          ref={videoRef}
          className="w-full h-full object-cover"
          src={it.src + (it.start || it.start === 0 ? `#t=${start}` : '')}
          playsInline
          muted
          autoPlay
          onPlay={() => logEvent('video_play', { title: it.title })}
          onEnded={() => { logEvent('video_end', { title: it.title }); setIndex((i) => (i + 1) % ordered.length) }}
          onLoadedMetadata={(e) => {
            const v = e.currentTarget as HTMLVideoElement
            if (start) v.currentTime = start
            if (end) {
              // ensure we stop at end
              const handler = () => {
                if (v.currentTime >= (end as number)) {
                  v.pause()
                  v.removeEventListener('timeupdate', handler)
                  setIndex((i) => (i + 1) % ordered.length)
                  logEvent('video_clip_end', { title: it.title })
                }
              }
              v.addEventListener('timeupdate', handler)
            }
          }}
        />
      )
    }

    // fallback iframe for other providers
    return <iframe title={it.title} src={it.src} className="w-full h-full" frameBorder={0} allow="autoplay; encrypted-media" allowFullScreen />
  }

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded">
        <div className="w-full bg-black flex items-center justify-center" style={{height: 420}}>
          {renderMedia(current)}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm font-semibold">{current.title}</div>
        <div className="flex items-center gap-2">
          {ordered.map((it, i) => (
            <button key={i} aria-label={`Vai a ${it.title}`} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full ${i === index ? 'bg-codecar-ocra' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MediaCarousel
