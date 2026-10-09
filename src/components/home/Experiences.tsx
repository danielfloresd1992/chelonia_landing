import { InstagramLogoIcon } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import lancha from '../../assets/fotos/lancha-transparente.jpg?responsive'
import mesa from '../../assets/fotos/mesa-imperial-atardecer.jpg?responsive'
import paddle from '../../assets/fotos/paddle-mar-turquesa.jpg?responsive'
import playaAerea from '../../assets/fotos/playa-aerea-cayo.jpg?responsive'
import { socialLinks } from '../../data/site'
import Picture from '../Picture'
import Reveal from '../Reveal'
import ScrollMedia from '../ScrollMedia'
import SectionHeader from '../SectionHeader'

// Textos basados en chelonialosroques.com (servicios, nosotros)
const experiences = [
  {
    src: playaAerea,
    alt: 'Vista aérea de un cayo de arena blanca rodeado de agua turquesa',
    tag: 'Taxi boat y lunch box',
    title: 'Paseos a los cayos',
    text: 'Te llevamos a las playas de arena blanca del archipiélago, con lunch box para pasar el día entero.',
  },
  {
    src: lancha,
    alt: 'Lancha de fondo transparente en el muelle al atardecer',
    tag: 'Exclusiva de Chelonia',
    title: 'Lancha transparente',
    text: 'Una lancha transparente que te hará ver el océano en todo su esplendor.',
  },
  {
    src: paddle,
    alt: 'Persona en paddle sobre el mar turquesa con veleros al fondo',
    tag: 'Todo el año',
    title: 'Deportes acuáticos',
    text: 'Vela, kayak, windsurf, kitesurf, buceo, snorkel y pesca deportiva en aguas serenas y cristalinas. Y para algo distinto, el Seabob.',
  },
  {
    src: mesa,
    alt: 'Mesa larga decorada para una cena al aire libre al atardecer',
    tag: 'A tu medida',
    title: 'Celebraciones',
    text: 'Lunas de miel, bodas, aniversarios y cumpleaños con un plan diseñado para ti, frente al mar.',
  },
]

const instagram = socialLinks.find(({ name }) => name === 'instagram')

export default function Experiences() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeader label="Experiencias" title="Un archipiélago entero frente a tu habitación">
        <p>
          Organizamos tus días en el agua: paseos a otros cayos, deportes acuáticos y celebraciones a tu medida. Solo
          tienes que elegir.
        </p>
      </SectionHeader>

      <div className="mt-12 grid gap-16 md:mt-16 md:grid-cols-2 md:gap-x-8">
        {experiences.map(({ src, alt, tag, title, text }) => (
          <article key={title} className="flex flex-col gap-6 md:even:mt-24">
            <ScrollMedia className="-mx-4 md:mx-0">
              {/* sizes ×1,08 por el parallax; coverAspect compensa el recorte 4:5 de cada foto */}
              <Picture
                src={src}
                alt={alt}
                sizes="(min-width: 768px) 54vw, 108vw"
                coverAspect={4 / 5}
                className="aspect-4/5 w-full object-cover"
              />
            </ScrollMedia>
            <div className="flex flex-col gap-2">
              <Reveal>
                <p className="text-label text-primary">{tag}</p>
                <h3 className="mt-2 text-title-3">{title}</h3>
              </Reveal>
              <Reveal delay={150}>
                <p className="max-w-md text-foreground-muted">{text}</p>
              </Reveal>
            </div>
          </article>
        ))}
      </div>

      {instagram && (
        <Reveal className="mt-16 flex justify-center">
          <a
            href={instagram.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold transition-colors duration-700 ease-fluid hover:bg-surface-alt hover:text-primary"
          >
            <InstagramLogoIcon className="size-5" aria-hidden="true" />
            Mira más en Instagram
          </a>
        </Reveal>
      )}
    </section>
  )
}
