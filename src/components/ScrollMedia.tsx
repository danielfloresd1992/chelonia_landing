import { useRef, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useScrollFrame } from '../hooks/useScrollFrame'

interface ScrollMediaProps {
  children: ReactNode
  className?: string
}

const clamp = (value: number) => Math.min(1, Math.max(0, value))

// Entrada en cortina con leve giro 3D + parallax interno, con inercia
export default function ScrollMedia({ children, className = '' }: ScrollMediaProps) {
  const outer = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const motion = useRef({ enter: 0, travel: 0.5 })
  const reduceMotion = usePrefersReducedMotion()

  useScrollFrame(outer, (rect, viewportHeight) => {
    if (reduceMotion || !frame.current || !media.current) return
    // enter: 0 al asomar por abajo, 1 cuando su borde superior llega a la mitad de la pantalla
    // travel: 0 entrando por abajo, 1 saliendo por arriba (parallax continuo)
    const enter = clamp((viewportHeight - rect.top) / (viewportHeight * 0.5))
    const travel = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height))
    const m = motion.current
    m.enter += (enter - m.enter) * 0.12
    m.travel += (travel - m.travel) * 0.12
    const hidden = m.enter > 0.995 ? 0 : 1 - m.enter

    // En reposo, sin recorte ni giro 3D: se pinta nítida
    frame.current.style.clipPath = hidden
      ? `inset(${(hidden * 16).toFixed(2)}% ${(hidden * 8).toFixed(2)}% 0 round var(--radius))`
      : 'none'
    frame.current.style.transform = hidden ? `rotateX(${(hidden * 10).toFixed(2)}deg)` : 'none'
    // Parallax suave: ±4 % dentro del marco (la escala 1.08 lo cubre) y un leve acercamiento al entrar
    media.current.style.transform = `translateY(${((m.travel - 0.5) * -8).toFixed(2)}%) scale(${(1.08 + hidden * 0.1).toFixed(4)})`
  })

  return (
    <div ref={outer} className={`perspective-distant [--radius:0px] md:[--radius:16px] ${className}`}>
      <div ref={frame} className="origin-bottom overflow-hidden md:rounded-2xl">
        <div ref={media}>{children}</div>
      </div>
    </div>
  )
}
