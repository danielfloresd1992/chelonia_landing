import { useRef, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useScrollFrame } from '../hooks/useScrollFrame'

interface ScrollTiltProps {
  children: ReactNode
  className?: string
}

// Inclinación 3D que se endereza mientras el elemento sube por la pantalla
export default function ScrollTilt({ children, className = '' }: ScrollTiltProps) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const reduceMotion = usePrefersReducedMotion()

  useScrollFrame(outer, (rect, viewportHeight) => {
    const el = inner.current
    if (!el || reduceMotion) return
    // Termina de enderezarse cuando su borde superior llega a la mitad de la pantalla
    const p = Math.min(1, Math.max(0, (viewportHeight - rect.top) / (viewportHeight * 0.5)))
    // En reposo, sin transformación: el navegador la pinta nítida en lugar de reescalar una capa 3D
    const rest = p >= 0.999
    el.style.transform = rest ? 'none' : `rotateX(${((1 - p) * 20).toFixed(2)}deg) scale(${(0.88 + p * 0.12).toFixed(4)})`
    el.style.opacity = rest ? '' : (0.3 + p * 0.7).toFixed(3)
  })

  return (
    <div ref={outer} className={`perspective-distant ${className}`}>
      <div ref={inner} className="origin-bottom">
        {children}
      </div>
    </div>
  )
}
