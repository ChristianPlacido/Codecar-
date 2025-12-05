import React from 'react'
import Link from 'next/link'

type Vehicle = {
  id: string
  title?: string
  price?: string
  year?: string
  mileage?: string
  images?: string[]
  fuel?: string
  gearbox?: string
  highlight?: string
  ctaLink?: string
  tags?: string[]
}

const VehicleCard: React.FC<{vehicle: Vehicle}> = ({ vehicle }) => {
  const img = vehicle.images && vehicle.images.length ? vehicle.images[0] : '/placeholder-car.jpg'
  return (
    <Link href={`/veicoli/${encodeURIComponent(vehicle.id)}`} className="clickable block border border-white/10 rounded overflow-hidden hover:shadow-lg hover:shadow-black/40 transition-shadow bg-white/5" aria-label={`Visualizza ${vehicle.title}`}>
      <div className="w-full bg-gray-100 relative aspect-[4/3] sm:aspect-[16/10]">
        <img src={img} alt={vehicle.title || 'Veicolo'} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 badge-ocra">Pronta consegna</div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-base text-white">{vehicle.title}</h3>
        {vehicle.highlight && <p className="text-sm text-white/70">{vehicle.highlight}</p>}
        <div className="flex items-center gap-3 text-xs text-white/60">
          <span>{vehicle.year || '-'}</span>
          <span className="w-1 h-1 bg-white/30 rounded-full" />
          <span>{vehicle.mileage || '-'}</span>
          <span className="w-1 h-1 bg-white/30 rounded-full" />
          <span>{vehicle.fuel}</span>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <span className="text-white/80">{vehicle.gearbox}</span>
          <span className="text-codecar-ocra text-lg">{vehicle.price || '-'}</span>
        </div>
        {vehicle.tags && (
          <div className="flex flex-wrap gap-2 text-xs text-white/80">
            {vehicle.tags.map((tag) => (
              <span key={tag} className="badge-ocra">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

export default VehicleCard
