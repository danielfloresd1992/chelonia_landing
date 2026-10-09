import { BedIcon } from '@phosphor-icons/react/dist/csr/Bed'
import { HeartIcon } from '@phosphor-icons/react/dist/csr/Heart'
import { LeafIcon } from '@phosphor-icons/react/dist/csr/Leaf'
import { UsersThreeIcon } from '@phosphor-icons/react/dist/csr/UsersThree'
import { useEffect, useRef, useState, type ComponentType } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface Stat {
  Icon: ComponentType<{ className?: string }>
  label: string
  value?: number
  prefix?: string
  text?: string
}

// Cifras de chelonialosroques.com
const stats: Stat[] = [
  { Icon: UsersThreeIcon, value: 2860, prefix: '+', label: 'Visitantes' },
  { Icon: HeartIcon, value: 3500, prefix: '+', label: 'Clientes satisfechos' },
  { Icon: BedIcon, value: 12, label: 'Habitaciones' },
  { Icon: LeafIcon, text: 'LEED', label: 'Certificación' },
]

const DURATION = 2000
const STAGGER = 150
// Arranca rápido y frena al final, como algo con masa
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t))

// Progreso 0 a 1 de la animación de una tarjeta, con su retardo escalonado
function useProgress(active: boolean, delay: number) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!active) return
    let frame = 0
    const start = performance.now() + delay
    const tick = (now: number) => {
      const t = Math.max(0, Math.min(1, (now - start) / DURATION))
      setProgress(easeOutExpo(t))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, delay])

  return progress
}

function StatCard({ stat, index, visible }: { stat: Stat; index: number; visible: boolean }) {
  const reduceMotion = usePrefersReducedMotion()
  const animated = useProgress(visible && !reduceMotion, index * STAGGER + 200)
  const p = reduceMotion ? 1 : animated
  const { Icon, label, value, prefix, text } = stat

  return (
    // Entrada con animación (no transición) para que su retardo no frene el hover
    <div
      style={{ animationDelay: `${index * STAGGER}ms` }}
      className={`group flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-4 transition-all duration-700 ease-fluid hover:-translate-y-1 hover:shadow-xl hover:shadow-laguna-950/5 md:p-6 ${
        visible ? 'animate-rise' : 'opacity-0'
      }`}
    >
      <dt className="text-sm font-medium text-foreground-muted">{label}</dt>
      <dd className="order-first flex flex-col gap-6">
        <span className="flex size-12 items-center justify-center rounded-xl bg-surface-alt text-primary transition-colors duration-700 ease-fluid group-hover:bg-primary group-hover:text-on-primary">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span className="flex items-baseline gap-1 text-display tabular-nums">
          {prefix && <span className="text-title-3 text-primary">{prefix}</span>}
          {value !== undefined ? (
            <>
              <span aria-hidden="true">{Math.round(value * p).toLocaleString('es-VE')}</span>
              <span className="sr-only">{value.toLocaleString('es-VE')}</span>
            </>
          ) : (
            <span>
              <span className="sr-only">{text}</span>
              {text?.split('').map((letter, i, letters) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={`inline-block transition-all duration-700 ease-fluid ${
                    p > (i + 1) / (letters.length + 1) ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-4 opacity-0 blur-sm'
                  }`}
                >
                  {letter}
                </span>
              ))}
            </span>
          )}
        </span>
        <span className="h-0.5 w-full overflow-hidden rounded-full bg-border" aria-hidden="true">
          <span className="block h-full origin-left rounded-full bg-primary" style={{ transform: `scaleX(${p})` }} />
        </span>
      </dd>
    </div>
  )
}

export default function Stats() {
  const ref = useRef<HTMLDListElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <dl ref={ref} className="mt-12 grid grid-cols-2 gap-4 md:mt-16 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} visible={visible} />
      ))}
    </dl>
  )
}
