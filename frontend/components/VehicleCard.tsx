import React from 'react'
import Link from 'next/link'

type Vehicle = {
  id: string
  title?: string
  price?: string
  year?: string
  mileage?: string
  images?: string[]
}

const VehicleCard: React.FC<{vehicle: Vehicle}> = ({ vehicle }) => {
  const img = vehicle.images && vehicle.images.length ? vehicle.images[0] : '/placeholder-car.jpg'
  return (
    <Link href={`/veicoli/${encodeURIComponent(vehicle.id)}`} className="clickable block border rounded overflow-hidden hover:shadow-lg transition-shadow" aria-label={`Visualizza ${vehicle.title}`}>
      <div className="w-full h-44 bg-gray-100">
        <img src={img} alt={vehicle.title || 'Veicolo'} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm">{vehicle.title}</h3>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
          <div>{vehicle.year || '-'}</div>
          <div>{vehicle.mileage || '-'}</div>
          <div className="font-bold text-codecar-ocra">{vehicle.price || '-'}</div>
        </div>
      </div>
    </Link>
  )
}

export default VehicleCard
