import React from 'react'

const ProgressBar: React.FC<{percent: number; label: string}> = ({ percent, label }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-sm text-gray-600">{percent}%</div>
      </div>
      <div className="w-full bg-gray-200 rounded h-3 overflow-hidden" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className="bg-codecar-ocra h-3 rounded transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

const RallyTimeline: React.FC<{ highlights: any[]; timeline: any[] }> = ({ highlights, timeline }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Traguardi e progressi</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {highlights.map((h) => (
            <div key={h.id} className="mb-6 p-4 border rounded">
              <h3 className="font-semibold">{h.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{h.description}</p>
              <div className="mt-3">
                <ProgressBar percent={h.percent} label={`${h.title} - Performance`} />
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-semibold mb-3">Timeline gare</h3>
          <ol className="border-l-2 border-gray-200">
            {timeline.map((t, i) => (
              <li key={i} className="mb-6 ml-4">
                <div className="absolute -left-3 mt-1 w-5 h-5 bg-codecar-ocra rounded-full" />
                <div className="text-sm font-medium">{t.event} <span className="text-xs text-gray-500">({t.date})</span></div>
                <div className="text-sm text-gray-600">{t.blurb}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default RallyTimeline
