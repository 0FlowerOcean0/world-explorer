'use client'

import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const cities: { name: string; coordinates: [number, number]; active?: boolean }[] = [
  { name: 'Beijing', coordinates: [116.4, 39.9], active: true },
  { name: 'Shenzhen', coordinates: [114.06, 22.54] },
  { name: 'Tokyo', coordinates: [139.69, 35.69] },
  { name: 'Hong Kong', coordinates: [114.17, 22.32] },
]

export function WorldMap() {
  return (
    <div
      className="w-full"
      role="img"
      aria-label="Bureau this week: Beijing, Shenzhen, Tokyo, Hong Kong"
    >
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 130, center: [60, 30] }}
        width={800}
        height={360}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="var(--muted-foreground)"
                stroke="var(--background)"
                strokeWidth={0.3}
                style={{
                  default: { outline: 'none', opacity: 0.45 },
                  hover: { outline: 'none', opacity: 0.45 },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>
        {cities.map((city) => (
          <Marker key={city.name} coordinates={city.coordinates}>
            <circle
              r={city.active ? 5 : 3.5}
              fill={city.active ? 'var(--accent)' : 'var(--foreground)'}
              stroke="var(--background)"
              strokeWidth={1}
            />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}
