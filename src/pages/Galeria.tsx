import { useEffect, useRef, useState } from 'react'
import Lightbox from '../components/Lightbox'
import Picture from '../components/Picture'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { categories, gallery, type GalleryCategory } from '../data/gallery'

type Filter = GalleryCategory | 'todas'

export default function Galeria() {
  const [filter, setFilter] = useState<Filter>('todas')
  const [open, setOpen] = useState<number | null>(null)
  const opener = useRef<HTMLElement | null>(null)
  const items = filter === 'todas' ? gallery : gallery.filter((item) => item.category === filter)

  useEffect(() => {
    document.title = 'Galería · Chelonia Casa de Mar'
  }, [])

  const close = () => {
    setOpen(null)
    opener.current?.focus()
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pt-32 pb-16 md:px-6 md:pt-40 md:pb-24">
      <SectionHeader label="Galería" title="Chelonia, rincón a rincón">
        <p>Habitaciones, baños, espacios comunes y el mar que rodea la posada. Toca una foto para verla en grande.</p>
      </SectionHeader>

      <Reveal className="mt-10 flex flex-wrap gap-2">
        {categories.map(({ id, label }) => {
          const count = id === 'todas' ? gallery.length : gallery.filter((item) => item.category === id).length
          const active = filter === id
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(id)}
              className={`flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors duration-700 ease-fluid ${
                active ? 'bg-primary text-on-primary' : 'bg-surface-alt text-foreground-muted hover:text-foreground'
              }`}
            >
              {label}
              <span className={`tabular-nums ${active ? 'text-on-primary/70' : 'text-foreground-muted/70'}`}>{count}</span>
            </button>
          )
        })}
      </Reveal>

      {/* Mosaico en columnas: cada foto conserva su proporción */}
      <ul key={filter} className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item, i) => (
          <li key={item.alt} className="mb-4 break-inside-avoid">
            <Reveal delay={(i % 6) * 60}>
              <button
                type="button"
                onClick={(e) => {
                  opener.current = e.currentTarget
                  setOpen(i)
                }}
                aria-label={`Ver en grande: ${item.alt}`}
                className="group relative block w-full overflow-hidden rounded-2xl bg-surface-alt transition-all duration-700 ease-fluid hover:-translate-y-1 hover:shadow-xl hover:shadow-laguna-950/10"
              >
                <Picture
                  src={item.src}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-700 ease-fluid group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-background/85 p-3 text-left text-sm font-medium backdrop-blur-md transition-transform duration-700 ease-fluid group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  {item.alt}
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {open !== null && <Lightbox items={items} index={open} onClose={close} onChange={setOpen} />}
    </section>
  )
}
