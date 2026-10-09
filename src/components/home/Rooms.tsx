import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { Link } from 'react-router'
import habitacion from '../../assets/fotos/habitacion-cuadro-pez.jpg?responsive'
import { rooms } from '../../data/rooms'
import Picture from '../Picture'
import Reveal from '../Reveal'
import ScrollTilt from '../ScrollTilt'
import SectionHeader from '../SectionHeader'

export default function Rooms() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeader label="Habitaciones y suites" title="Consigue tu habitación y siente la comodidad">
          <p>Cinco formas de quedarte frente al mar, desde la habitación para dos hasta la suite para toda la familia.</p>
        </SectionHeader>

        <ScrollTilt className="-mx-4 md:mx-0 lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <Picture
            src={habitacion}
            alt="Habitación con cama king size, sillón de mimbre y cuadro de un pez azul"
            sizes="(min-width: 1024px) 50vw, 100vw"
            coverAspect={4 / 5}
            className="aspect-4/5 w-full object-cover md:rounded-2xl"
          />
        </ScrollTilt>

        <Reveal>
          <ul className="flex flex-col border-t border-border">
            {rooms.map(({ slug, name, description, bed, guests, size, extra, price }) => (
              <li key={slug} className="border-b border-border">
                <Link
                  to={`/habitaciones/${slug}`}
                  className="group flex items-start gap-4 py-6 transition-colors duration-700 ease-fluid hover:text-primary"
                >
                  <div className="flex flex-1 flex-col gap-2">
                    <span className="text-title-4">{name}</span>
                    <span className="text-foreground-muted">{description}</span>
                    <span className="text-sm font-medium text-foreground-muted">
                      {[bed, guests, size, extra].filter(Boolean).join(' · ')}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-title-4 text-accent">${price.toLocaleString('es-VE')}</span>
                    <span className="text-sm text-foreground-muted">por noche</span>
                  </div>
                  <ArrowUpRightIcon
                    className="mt-1 size-5 shrink-0 transition-transform duration-700 ease-fluid group-hover:-translate-y-1 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
