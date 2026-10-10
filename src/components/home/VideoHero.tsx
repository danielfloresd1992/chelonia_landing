import { ArrowDownIcon } from '@phosphor-icons/react/dist/csr/ArrowDown'
import { LeafIcon } from '@phosphor-icons/react/dist/csr/Leaf'
import { useEffect, useRef, type SyntheticEvent } from 'react'
import { Link } from 'react-router'
import videoHorizontalAv1 from '../../assets/video/hero-horizontal-av1.mp4'
import videoHorizontal from '../../assets/video/hero-horizontal.mp4'
import poster from '../../assets/video/hero-poster.webp'
import videoVerticalAv1 from '../../assets/video/hero-vertical-av1.mp4'
import videoVertical from '../../assets/video/hero-vertical.mp4'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useScrollFrame } from '../../hooks/useScrollFrame'
import { markHeroReady } from '../../lib/heroReady'

// AV1 pesa ~60% menos; quien no lo soporte recibe el MP4 (H.264)
const AV1 = 'video/mp4; codecs="av01.0.08M.08"'

export default function VideoHero() {
  const reduceMotion = usePrefersReducedMotion()
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  // Al bajar, el contenido sube y se desvanece; el video se queda quieto
  useScrollFrame(section, (rect) => {
    if (reduceMotion) return
    const p = Math.min(1, Math.max(0, -rect.top / rect.height))
    section.current?.style.setProperty('--hero', p.toFixed(3))
  })

  // El video está fijo en pantalla: se pausa cuando la portada sale de la vista
  useEffect(() => {
    const el = section.current
    const v = video.current
    if (!el || !v || reduceMotion) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {})
      else v.pause()
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduceMotion])

  // Avisa cuando el video está descargado entero: lo demás ya no le quita ancho de banda.
  // Si en 12 s no lo está (red muy lenta), libera igualmente las demás descargas.
  const onProgress = (e: SyntheticEvent<HTMLVideoElement>) => {
    const { buffered, duration } = e.currentTarget
    if (duration && buffered.length && buffered.end(buffered.length - 1) >= duration - 0.5) markHeroReady()
  }
  useEffect(() => {
    const timer = setTimeout(markHeroReady, 12000)
    return () => clearTimeout(timer)
  }, [])

  return (
    // clip-path recorta también al video fijo: solo se ve dentro de la portada
    <section ref={section} className="dark relative h-svh min-h-140 overflow-hidden bg-background text-foreground [clip-path:inset(0)]">
      {/* Fijo en la pantalla (lvh: no cambia de tamaño con la barra del navegador móvil) */}
      <div className="fixed inset-x-0 top-0 h-lvh" aria-hidden="true">
        <video
          ref={video}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onProgress={onProgress}
          className="size-full object-cover contrast-110 saturate-110"
        >
          <source media="(max-aspect-ratio: 3/4)" src={videoVerticalAv1} type={AV1} />
          <source media="(max-aspect-ratio: 3/4)" src={videoVertical} type="video/mp4" />
          <source src={videoHorizontalAv1} type={AV1} />
          <source src={videoHorizontal} type="video/mp4" />
        </video>
        {/* Capa oscura suave + viñeta: el video es nocturno, así que oscurece poco */}
        <div className="absolute inset-0 bg-black/30 shadow-[inset_0_0_200px_rgba(0,0,0,0.45)]" />
      </div>

      <div
        className="relative flex h-full flex-col items-center justify-center px-4 pt-24 pb-24 md:px-6"
        style={{ opacity: 'calc(1 - var(--hero, 0) * 1.6)', transform: 'translateY(calc(var(--hero, 0) * -120px))' }}
      >
        {/* Sombra difusa detrás del bloque: el texto resalta sin oscurecer todo el video */}
        <div className="relative isolate flex flex-col items-center gap-6 text-center before:absolute before:-inset-8 before:-z-10 before:rounded-full before:bg-black/30 before:blur-3xl before:content-[''] md:before:-inset-16">
          <h1 className="animate-rise">
            <img
              src="/logos/logo-web-2.png"
              alt="Chelonia Casa de Mar"
              fetchPriority="high"
              className="w-72 drop-shadow-xl sm:w-96 md:w-120"
            />
          </h1>
          <p className="max-w-170 animate-rise text-lead font-medium text-foreground text-shadow-lg" style={{ animationDelay: '150ms' }}>
            Posada de lujo ecosustentable frente a Cayo Madrisqui, en el Archipiélago de Los Roques.
          </p>
          <Link
            to="/reservacion"
            style={{ animationDelay: '300ms' }}
            className="w-full animate-rise rounded-full bg-primary px-6 py-3 text-base font-semibold text-on-primary shadow-lg shadow-black/30 transition-all duration-700 ease-fluid hover:bg-primary-hover active:scale-[0.98] sm:w-auto"
          >
            Consultar disponibilidad
          </Link>
          <p
            className="flex animate-rise items-center gap-2 text-sm font-semibold text-foreground text-shadow-lg"
            style={{ animationDelay: '450ms' }}
          >
            <LeafIcon className="size-5 shrink-0 text-primary" aria-hidden="true" />
            Primer hospedaje con certificación LEED de Venezuela
          </p>
        </div>
      </div>

      <a
        href="#recorrido"
        className="absolute inset-x-0 bottom-6 mx-auto flex w-max flex-col items-center gap-2 text-sm font-semibold text-foreground text-shadow-lg hover:text-primary"
      >
        Recorre la posada
        <ArrowDownIcon className="size-5" aria-hidden="true" />
      </a>
    </section>
  )
}
