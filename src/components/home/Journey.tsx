import { lazy, Suspense, useRef } from 'react'
import habitacion from '../../assets/fotos/habitacion-cuadro-pez.jpg?responsive'
import playaAerea from '../../assets/fotos/playa-aerea-cayo.jpg?responsive'
import terraza from '../../assets/fotos/terraza-cortinas-mar.jpg?responsive'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useScrollFrame } from '../../hooks/useScrollFrame'
import Picture from '../Picture'
import SectionHeader from '../SectionHeader'

const JourneyScene = lazy(() => import('./JourneyScene'))

// `at`: punto del recorrido (0 a 1) en el que cada texto está visible
const chapters = [
  { at: 0.32, label: 'La posada', text: 'Madera, caña y concreto frente al mar turquesa.' },
  { at: 0.56, label: 'La mesa', text: 'Gastronomía del mar y cenas bajo las estrellas.' },
  { at: 0.8, label: 'El mar', text: 'Lancha transparente, kayak y snorkel entre cayos.' },
]

const staticPhotos = [
  { src: playaAerea, alt: 'Vista aérea de una playa de arena blanca y agua turquesa en Los Roques' },
  { src: terraza, alt: 'Terraza con cortinas blancas abierta al mar' },
  { src: habitacion, alt: 'Habitación con cama king size y cuadro de un pez azul' },
]

function StaticJourney() {
  return (
    <section id="recorrido" className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 md:px-6 md:py-24">
      <SectionHeader label="Recorrido" title="Un paseo por Chelonia" />
      <div className="grid gap-4 md:grid-cols-3">
        {staticPhotos.map(({ src, alt }) => (
          <Picture
            key={alt}
            src={src}
            alt={alt}
            sizes="(min-width: 768px) 33vw, 100vw"
            coverAspect={4 / 5}
            className="aspect-4/5 w-full rounded-2xl object-cover"
          />
        ))}
      </div>
    </section>
  )
}

// Vuelo de cámara entre fotos de la posada, controlado por el scroll
export default function Journey() {
  const reduceMotion = usePrefersReducedMotion()
  const section = useRef<HTMLElement>(null)
  const progress = useRef(0)

  useScrollFrame(section, (rect, viewportHeight) => {
    const p = Math.min(1, Math.max(0, -rect.top / (rect.height - viewportHeight)))
    progress.current = p
    section.current?.style.setProperty('--p', p.toFixed(4))
  })

  if (reduceMotion) return <StaticJourney />

  return (
    <section id="recorrido" ref={section} aria-label="Recorrido por Chelonia" className="relative h-[300svh] md:h-[360svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Suspense fallback={null}>
            <JourneyScene progress={progress} eventSource={section} />
          </Suspense>
        </div>

        <div
          className="pointer-events-none relative flex h-full items-center justify-center px-4 pt-24 pb-6 md:px-6"
          style={{ opacity: 'calc(1 - var(--p, 0) * 8)', transform: 'translateY(calc(var(--p, 0) * -320px))' }}
        >
          {/* Panel esmerilado: el título se lee aunque pase una foto por detrás */}
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-background/75 p-6 text-center shadow-xl shadow-laguna-950/5 backdrop-blur-xl md:p-10">
            <p className="text-label text-primary">Recorrido</p>
            <h2 className="text-display">Un paseo por Chelonia</h2>
            <p className="max-w-170 text-lead text-foreground-muted">Desliza para recorrer la posada, del cayo a tu habitación.</p>
          </div>
        </div>

        {chapters.map(({ at, label, text }) => (
          <div
            key={label}
            className="pointer-events-none absolute inset-x-4 bottom-8 flex flex-col gap-2 rounded-2xl bg-background/70 p-6 backdrop-blur-md md:inset-x-auto md:bottom-12 md:left-12 md:max-w-sm"
            style={{
              opacity: `calc(1 - max(var(--p, 0) - ${at}, ${at} - var(--p, 0)) * 10)`,
              transform: `translateY(calc((var(--p, 0) - ${at}) * -240px))`,
            }}
          >
            <p className="text-label text-primary">{label}</p>
            <p className="text-title-3">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
