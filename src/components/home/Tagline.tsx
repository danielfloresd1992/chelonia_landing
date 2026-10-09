import { useRef, useState } from 'react'
import { useScrollFrame } from '../../hooks/useScrollFrame'

const DEFAULT_TEXT = 'Sumérgete en la tranquilidad de este rincón del Caribe y desconéctate del mundo exterior.'

// Cada palabra pasa de tono apagado a color pleno, en orden de lectura, al hacer scroll
export default function Tagline({ text = DEFAULT_TEXT }: { text?: string }) {
  const section = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const words = text.split(' ')

  useScrollFrame(section, (rect, viewportHeight) => {
    const p = (viewportHeight * 0.85 - rect.top) / (rect.height + viewportHeight * 0.35)
    setActive(Math.round(Math.min(1, Math.max(0, p)) * words.length))
  })

  return (
    <section ref={section} className="mx-auto max-w-7xl px-6 py-24 md:py-40">
      <h2 className="mx-auto max-w-170 text-4xl font-semibold tracking-tight md:text-5xl">
        {words.map((word, i) => (
          <span
            key={i}
            className={`transition-colors duration-700 ease-fluid ${i < active ? 'text-foreground' : 'text-foreground/30'}`}
          >
            {word}{' '}
          </span>
        ))}
      </h2>
    </section>
  )
}
