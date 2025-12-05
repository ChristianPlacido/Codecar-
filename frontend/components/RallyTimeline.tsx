import React from 'react'

const ProgressBar: React.FC<{percent: number; label: string}> = ({ percent, label }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="text-sm text-white/70">{percent}%</div>
      </div>
      <div className="w-full bg-white/10 rounded h-3 overflow-hidden" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className="bg-codecar-ocra h-3 rounded transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

const RallyTimeline: React.FC<{ highlights: any[]; timeline: any[] }> = ({ highlights, timeline }) => {
  return (
    <section className="text-white">
      <h2 className="text-2xl font-bold mb-4">Traguardi e progressi</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {highlights.map((h) => (
            <div key={h.id} className="mb-6 p-4 border border-white/10 rounded section-card">
              <h3 className="font-semibold text-white">{h.title}</h3>
              <p className="text-sm text-white/70 mt-1">{h.description}</p>
              <div className="mt-3">
                <ProgressBar percent={h.percent} label={`${h.title} - Performance`} />
              </div>
            </div>
          ))}
        </div>

        <div className="section-card rounded-lg p-4">
          <h3 className="font-semibold mb-3 text-white">Timeline gare</h3>
          <ol className="border-l-2 border-white/20 relative">
            {timeline.map((t, i) => (
              <li key={i} className="mb-6 ml-4">
                <div className="absolute -left-3 mt-1 w-5 h-5 bg-codecar-ocra rounded-full" />
                <div className="text-sm font-medium text-white">{t.event} <span className="text-xs text-white/60">({t.date})</span></div>
                <div className="text-sm text-white/70">{t.blurb}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default RallyTimeline
