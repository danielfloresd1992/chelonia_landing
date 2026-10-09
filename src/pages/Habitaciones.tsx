import { BedIcon } from '@phosphor-icons/react/dist/csr/Bed'
import { RulerIcon } from '@phosphor-icons/react/dist/csr/Ruler'
import { UsersIcon } from '@phosphor-icons/react/dist/csr/Users'
import { useEffect } from 'react'
import { Link } from 'react-router'
import Picture from '../components/Picture'
import Reveal from '../components/Reveal'
import ScrollMedia from '../components/ScrollMedia'
import SectionHeader from '../components/SectionHeader'
import { rooms } from '../data/rooms'

const button =
  'rounded-full px-6 py-3 text-center text-base font-semibold transition-all duration-700 ease-fluid active:scale-[0.98]'

export default function Habitaciones() {
  useEffect(() => {
    document.title = 'Habitaciones · Chelonia Casa de Mar'
  }, [])

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-32 pb-8 md:px-6 md:pt-40">
        <SectionHeader label="Habitaciones" title="Consigue tu habitación y siente la comodidad">
          <p>Cinco tipos de habitación, todas con cama king size y desayuno incluido.</p>
        </SectionHeader>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-8 md:gap-24 md:px-6 md:py-16">
        {rooms.map((room, index) => (
          <article key={room.slug} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <ScrollMedia className={`-mx-4 md:mx-0 ${index % 2 ? 'lg:order-2' : ''}`}>
              <Picture
                src={room.photo}
                alt={room.alt}
                sizes="(min-width: 1024px) 50vw, 100vw"
                coverAspect={4 / 3}
                className="aspect-4/3 w-full object-cover"
              />
            </ScrollMedia>
            <Reveal className="flex flex-col gap-6">
              <p className="text-label text-primary">
                {String(index + 1).padStart(2, '0')} · {room.guests}
              </p>
              <h2 className="text-title-2">{room.name}</h2>
              <p className="text-lead text-foreground-muted">{room.description}</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-foreground-muted">
                <li className="flex items-center gap-2">
                  <BedIcon className="size-5 text-primary" aria-hidden="true" />
                  {room.bed}
                </li>
                <li className="flex items-center gap-2">
                  <UsersIcon className="size-5 text-primary" aria-hidden="true" />
                  {room.guests}
                </li>
                {room.size && (
                  <li className="flex items-center gap-2">
                    <RulerIcon className="size-5 text-primary" aria-hidden="true" />
                    {room.size}
                  </li>
                )}
              </ul>
              {room.highlights.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {room.highlights.map((highlight) => (
                    <li key={highlight} className="rounded-full bg-accent-soft px-3 py-1 text-label text-accent">
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-title-1 text-accent">${room.price.toLocaleString('es-VE')}</span>
                <span className="text-foreground-muted">por noche · sin IVA · desayuno incluido</span>
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/reservacion" className={`${button} bg-primary text-on-primary hover:bg-primary-hover`}>
                  Consultar disponibilidad
                </Link>
                <Link
                  to={`/habitaciones/${room.slug}`}
                  className={`${button} border border-border hover:bg-surface-alt hover:text-primary`}
                >
                  Ver detalles
                </Link>
              </div>
            </Reveal>
          </article>
        ))}
      </section>
    </>
  )
}
