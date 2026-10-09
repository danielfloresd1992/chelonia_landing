import { BedIcon } from '@phosphor-icons/react/dist/csr/Bed'
import { BoatIcon } from '@phosphor-icons/react/dist/csr/Boat'
import { ForkKnifeIcon } from '@phosphor-icons/react/dist/csr/ForkKnife'
import { WifiHighIcon } from '@phosphor-icons/react/dist/csr/WifiHigh'
import camaPez from '../../assets/fotos/cama-cojin-pez.jpg?responsive'
import desayuno from '../../assets/fotos/desayuno-chelonia.jpg?responsive'
import lounge from '../../assets/fotos/lounge-rayas.jpg?responsive'
import playa from '../../assets/fotos/playa-aerea-pulpos.jpg?responsive'
import Picture from '../Picture'
import Reveal from '../Reveal'
import SectionHeader from '../SectionHeader'

// "Servicios y amenidades" de chelonialosroques.com
const services = [
  {
    Icon: ForkKnifeIcon,
    title: 'Gastronomía',
    items: ['Desayuno incluido', 'Lunch box en la playa', 'Cenas en la terraza'],
    photo: desayuno,
    alt: 'Desayuno servido en la terraza: panquecas, empanadas, sandía y jugo',
  },
  {
    Icon: BoatIcon,
    title: 'Traslados y paseos',
    items: ['Traslado del aeropuerto a la posada', 'Paseos a diferentes playas', 'Taxi boat'],
    photo: playa,
    alt: 'Vista aérea de una playa con carpas junto al mar turquesa',
  },
  {
    Icon: WifiHighIcon,
    title: 'En la posada',
    items: ['Aire acondicionado', 'WiFi', 'TV por streaming'],
    photo: lounge,
    alt: 'Lounge de madera con sillones de mimbre y cojines de rayas',
  },
  {
    Icon: BedIcon,
    title: 'En tu habitación',
    items: ['Baño privado y agua caliente', 'Caja de seguridad', 'Snacks de cortesía'],
    photo: camaPez,
    alt: 'Cama king size con cabecero de madera y un cojín con forma de pez',
  },
]

export default function Services() {
  return (
    <section className="bg-surface-alt">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <SectionHeader label="Servicios y amenidades" title="Todo resuelto desde que aterrizas" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ Icon, title, items, photo, alt }, index) => (
            <li key={title}>
              <Reveal delay={index * 100} className="h-full">
                {/* Radio interior 8px = 16px de la tarjeta menos 8px de margen */}
                <article className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-2 transition-all duration-700 ease-fluid hover:-translate-y-1 hover:shadow-xl hover:shadow-laguna-950/5">
                  <div className="overflow-hidden rounded-lg">
                    <Picture
                      src={photo}
                      alt={alt}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      coverAspect={4 / 3}
                      className="aspect-4/3 w-full object-cover transition-transform duration-700 ease-fluid group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-4 p-4">
                    <Icon className="size-8 text-primary" aria-hidden="true" />
                    <h3 className="text-title-4">{title}</h3>
                    <ul className="flex flex-col gap-2 text-foreground-muted">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
