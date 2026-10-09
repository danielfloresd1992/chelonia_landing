import { QuotesIcon } from '@phosphor-icons/react/dist/csr/Quotes'
import { StarIcon } from '@phosphor-icons/react/dist/csr/Star'
import { useEffect, useRef, useState } from 'react'
import aronDiaz from '../../assets/avatares/aron-diaz.webp'
import diegoDominguez from '../../assets/avatares/diego-dominguez.webp'
import vanessaAmaral from '../../assets/avatares/vanessa-amaral.webp'
import SectionHeader from '../SectionHeader'

// Testimonios de chelonialosroques.com (solo se corrigió la ortografía).
// Los avatares son fotos de banco de imágenes, como en la web original.
const testimonials = [
  {
    name: 'Vanessa Amaral',
    avatar: vanessaAmaral,
    quote:
      'Súper recomendado, comida divina, atención espectacular, habitaciones súper cómodas, buena comida, buena atención y buena cama. Todo lo que necesitas para disfrutar de una estadía tranquila en Los Roques. Lo único que deben tener en cuenta es que está fuera del pueblo de Los Roques.',
  },
  {
    name: 'Diego Dominguez',
    avatar: diegoDominguez,
    quote:
      'La arquitectura impactante, el uso de la madera, la caña y el concreto crean espacios ventilados, con sombras y juegos de luces únicos. Es una posada 5 estrellas. Una experiencia única visitar estos espacios llenos de detalles y concepto frente al mar turquesa del archipiélago de Los Roques.',
  },
  {
    name: 'Aron Diaz',
    avatar: aronDiaz,
    quote: 'Exclusivo proyecto turístico, buen desarrollo arquitectónico autosustentable. Buena atención en el restaurante.',
  },
]

const STAGGER = 150

// Cinco estrellas: aparecen una a una al entrar en pantalla y destellan de forma continua
function Stars({ visible, delay }: { visible: boolean; delay: number }) {
  return (
    <span role="img" aria-label="5 de 5 estrellas" className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={visible ? 'animate-star-in' : 'opacity-0'} style={{ animationDelay: `${delay + i * 90}ms` }}>
          <StarIcon
            weight="fill"
            aria-hidden="true"
            className="size-5 animate-twinkle text-rating"
            style={{ animationDelay: `${i * 220}ms` }}
          />
        </span>
      ))}
    </span>
  )
}

export default function Testimonials() {
  const grid = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = grid.current
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
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeader label="Testimonios" title="Lo que dicen nuestros huéspedes" center />
      <div ref={grid} className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map(({ name, avatar, quote }, index) => (
          <figure
            key={name}
            style={{ animationDelay: `${index * STAGGER}ms` }}
            className={`flex h-full flex-col gap-6 rounded-2xl border border-border bg-surface p-8 ${visible ? 'animate-rise' : 'opacity-0'}`}
          >
            <div className="flex items-center justify-between">
              <QuotesIcon className="size-8 text-primary" aria-hidden="true" />
              <Stars visible={visible} delay={index * STAGGER + 500} />
            </div>
            <blockquote className="text-foreground">{quote}</blockquote>
            {/* mt-auto: el autor queda abajo aunque la opinión sea corta */}
            <figcaption className="mt-auto flex items-center gap-3">
              <img src={avatar} alt="" width={48} height={48} loading="lazy" className="size-12 rounded-full object-cover" />
              <span className="flex flex-col">
                <span className="font-semibold">{name}</span>
                <span className="text-sm text-foreground-muted">Huésped</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
