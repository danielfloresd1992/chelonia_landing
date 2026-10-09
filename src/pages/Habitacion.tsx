import { ArrowLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowLeft'
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check'
import { ImagesIcon } from '@phosphor-icons/react/dist/csr/Images'
import { WhatsappLogoIcon } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import Lightbox from '../components/Lightbox'
import Picture from '../components/Picture'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import type { GalleryItem } from '../data/gallery'
import { CHECK_IN, CHECK_OUT, rooms } from '../data/rooms'
import { whatsappUrl } from '../data/site'
import NotFound from './NotFound'

const button =
  'flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-all duration-700 ease-fluid active:scale-[0.98]'
const thumb =
  'group block w-full overflow-hidden rounded-2xl bg-surface-alt transition-all duration-700 ease-fluid hover:-translate-y-1 hover:shadow-xl hover:shadow-laguna-950/10'
const zoom = 'w-full object-cover transition-transform duration-700 ease-fluid group-hover:scale-105'

// Ficha de una habitación: /habitaciones/:slug
export default function Habitacion() {
  const { slug } = useParams()
  const room = rooms.find((r) => r.slug === slug)
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (room) document.title = `${room.name} · Chelonia Casa de Mar`
  }, [room])

  if (!room) return <NotFound />

  const photos: GalleryItem[] = room.photos.map((src, i) => ({
    src,
    alt: i === 0 ? room.alt : `${room.name}, foto ${i + 1}`,
    category: 'habitaciones',
  }))
  const others = rooms.filter((r) => r.slug !== room.slug)
  const facts = [
    ['Cama', room.bed],
    ['Huéspedes', room.guests],
    ...(room.size ? [['Tamaño', room.size]] : []),
    ['Check-in', CHECK_IN],
    ['Check-out', CHECK_OUT],
  ]

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-32 pb-10 md:px-6 md:pt-40">
        <Link
          to="/habitaciones"
          className="flex w-max items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover"
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          Todas las habitaciones
        </Link>
        <div className="mt-6">
          <SectionHeader label={room.guests} title={room.name}>
            <p>{room.description}</p>
          </SectionHeader>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Una foto: ancha. Varias: mosaico con la primera grande */}
        <div className={`grid gap-4 ${photos.length > 1 ? 'lg:grid-cols-3' : ''}`}>
          <button
            type="button"
            onClick={() => setOpen(0)}
            aria-label={`Ver en grande: ${room.alt}`}
            className={`${thumb} ${photos.length > 1 ? 'lg:col-span-2' : ''}`}
          >
            <Picture
              src={room.photo}
              alt={room.alt}
              sizes={photos.length > 1 ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1280px) 1280px, 100vw'}
              coverAspect={photos.length > 1 ? 4 / 3 : 16 / 9}
              loading="eager"
              className={`${photos.length > 1 ? 'aspect-4/3' : 'aspect-4/3 md:aspect-video'} ${zoom}`}
            />
          </button>
          {photos.length > 1 && (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              {photos.slice(1, 3).map((photo, i) => (
                <button
                  key={photo.alt}
                  type="button"
                  onClick={() => setOpen(i + 1)}
                  aria-label={`Ver en grande: ${photo.alt}`}
                  className={thumb}
                >
                  <Picture
                    src={photo.src}
                    alt={photo.alt}
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    coverAspect={4 / 3}
                    className={`aspect-4/3 ${zoom}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        {photos.length > 1 && (
          <button
            type="button"
            onClick={() => setOpen(0)}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover"
          >
            <ImagesIcon className="size-5" aria-hidden="true" />
            Ver las {photos.length} fotos
          </button>
        )}
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-3 lg:gap-16">
        <div className="flex flex-col gap-12 lg:col-span-2">
          <Reveal>
            <dl className="grid grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-3">
              {facts.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1">
                  <dt className="text-sm text-foreground-muted">{label}</dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="flex flex-col gap-6">
            <h2 className="text-title-3">La habitación</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {room.includes.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckIcon weight="bold" className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <aside className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 md:p-8">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-title-1 text-accent">${room.price.toLocaleString('es-VE')}</span>
              <span className="text-foreground-muted">por noche</span>
            </p>
            <p className="text-sm text-foreground-muted">Precio en dólares, sin IVA. Desayuno incluido.</p>
            <Link to="/reservacion" className={`${button} bg-primary text-on-primary hover:bg-primary-hover`}>
              Consultar disponibilidad
            </Link>
            <a
              href={whatsappUrl(`Hola, quiero consultar disponibilidad de la ${room.name}`)}
              target="_blank"
              rel="noreferrer"
              className={`${button} border border-border hover:bg-surface-alt hover:text-primary`}
            >
              <WhatsappLogoIcon className="size-5" aria-hidden="true" />
              Escribir por WhatsApp
            </a>
          </aside>
        </Reveal>
      </section>

      <section className="bg-surface-alt">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <SectionHeader label="Habitaciones disponibles" title="Otras habitaciones" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other, index) => (
              <li key={other.slug}>
                <Reveal delay={(index % 4) * 80} className="h-full">
                  <Link
                    to={`/habitaciones/${other.slug}`}
                    className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-2 transition-all duration-700 ease-fluid hover:-translate-y-1 hover:shadow-xl hover:shadow-laguna-950/5"
                  >
                    <div className="overflow-hidden rounded-lg">
                      <Picture
                        src={other.photo}
                        alt={other.alt}
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        coverAspect={4 / 3}
                        className={`aspect-4/3 ${zoom}`}
                      />
                    </div>
                    <div className="flex flex-col gap-1 p-4">
                      <span className="text-title-4">{other.name}</span>
                      <span className="text-sm text-foreground-muted">{other.guests}</span>
                      <span className="mt-2 font-semibold text-accent">${other.price.toLocaleString('es-VE')} / noche</span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {open !== null && <Lightbox items={photos} index={open} onClose={() => setOpen(null)} onChange={setOpen} />}
    </>
  )
}
