import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import poster from '../../assets/video/dia-noche-poster.webp'
import videoVertical from '../../assets/video/dia-noche-vertical.mp4'
import videoHorizontal from '../../assets/video/dia-noche.mp4'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useScrollFrame } from '../../hooks/useScrollFrame'
import { heroReady } from '../../lib/heroReady'

// `at`: punto del recorrido (0 a 1) en el que cada texto está visible
const moments = [
  { at: 0.15, label: 'De día', text: 'Áreas sociales para relajarte al sol o compartir con amigos.' },
  { at: 0.48, label: 'Al caer la tarde', text: 'Madera, caña y cortinas blancas que cambian con la luz.' },
]

function Closing() {
  return (
    <div className="flex max-w-2xl flex-col items-start gap-6 rounded-2xl bg-background/70 p-8 backdrop-blur-md md:p-12">
      <p className="text-label text-primary">De noche</p>
      <h2 className="text-title-1">Vivimos experiencias y construimos grandes recuerdos</h2>
      <p className="text-lead text-foreground-muted">
        La terraza se enciende para cenar bajo las estrellas, en una posada de lujo ecosustentable frente al mar.
      </p>
      <Link
        to="/reservacion"
        className="w-full rounded-full bg-primary px-6 py-3 text-center text-base font-semibold text-on-primary transition-all duration-700 ease-fluid hover:bg-primary-hover active:scale-[0.98] sm:w-auto"
      >
        Reserva ahora
      </Link>
    </div>
  )
}

// El scroll controla el tiempo del video: el lounge pasa del día a la noche
export default function DayToNight() {
  const reduceMotion = usePrefersReducedMotion()
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const time = useRef(0)
  const [src, setSrc] = useState<string>()

  // Se descarga entero como blob: así cualquier fotograma es accesible al instante. Empieza en
  // cuanto el video de portada tiene margen (o si la sección se acerca antes), con prioridad
  // baja para no frenar lo que se está viendo. Si la descarga falla, se reproduce en streaming.
  useEffect(() => {
    const el = section.current
    if (!el || reduceMotion) return
    const url = window.matchMedia('(max-aspect-ratio: 3/4)').matches ? videoVertical : videoHorizontal
    const controller = new AbortController()
    let objectUrl = ''
    let started = false
    const start = () => {
      if (started || controller.signal.aborted) return
      started = true
      fetch(url, { signal: controller.signal, priority: 'low' })
        .then((res) => res.blob())
        .then((blob) => {
          objectUrl = URL.createObjectURL(blob)
          setSrc(objectUrl)
        })
        .catch(() => {
          if (!controller.signal.aborted) setSrc(url)
        })
    }
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && start(), { rootMargin: '100% 0px' })
    observer.observe(el)
    heroReady.then(start)
    return () => {
      observer.disconnect()
      controller.abort()
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [reduceMotion])

  useScrollFrame(section, (rect, viewportHeight) => {
    const p = Math.min(1, Math.max(0, -rect.top / (rect.height - viewportHeight)))
    section.current?.style.setProperty('--p', p.toFixed(4))
    section.current?.toggleAttribute('data-end', p > 0.8)
    const v = video.current
    // Nunca pide un salto nuevo mientras el anterior se decodifica (evita que se congele en móvil)
    if (!v || !v.duration || v.seeking) return
    time.current += (p * (v.duration - 0.05) - time.current) * 0.2
    if (Math.abs(v.currentTime - time.current) > 0.01) v.currentTime = time.current
  })

  // iOS no pinta un fotograma hasta que el video se reproduce una vez
  const prime = () => {
    const v = video.current
    v?.play()
      .then(() => v.pause())
      .catch(() => {})
  }

  if (reduceMotion) {
    return (
      <section className="dark bg-background text-foreground">
        <img src={poster} alt="" className="aspect-video w-full object-cover" />
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <Closing />
        </div>
      </section>
    )
  }

  return (
    <section
      ref={section}
      aria-label="Del día a la noche en Chelonia"
      className="group dark relative h-[260svh] bg-background text-foreground md:h-[300svh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <video
          ref={video}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedData={prime}
          className="absolute inset-0 size-full object-cover contrast-110 saturate-110"
        />
        {/* Viñeta suave: oscurece solo los bordes para que destaque el lounge iluminado */}
        <div className="absolute inset-0 bg-black/10 shadow-[inset_0_0_200px_rgba(0,0,0,0.45)]" />

        {moments.map(({ at, label, text }) => (
          <div
            key={label}
            className="pointer-events-none absolute inset-x-4 bottom-8 flex flex-col gap-2 rounded-2xl bg-background/70 p-6 backdrop-blur-md md:inset-x-auto md:bottom-12 md:left-12 md:max-w-sm"
            style={{
              opacity: `calc(1 - max(var(--p, 0) - ${at}, ${at} - var(--p, 0)) * 7)`,
              transform: `translateY(calc((var(--p, 0) - ${at}) * -240px))`,
            }}
          >
            <p className="text-label text-primary">{label}</p>
            <p className="text-title-3">{text}</p>
          </div>
        ))}

        <div
          className="pointer-events-none absolute inset-0 flex items-end px-4 pt-24 pb-8 md:items-center md:px-12"
          style={{ opacity: 'calc((var(--p, 0) - 0.78) * 6)', transform: 'translateY(calc((1 - var(--p, 0)) * 120px))' }}
        >
          <div className="group-data-end:pointer-events-auto">
            <Closing />
          </div>
        </div>
      </div>
    </section>
  )
}
