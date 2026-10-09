import { HandHeartIcon } from '@phosphor-icons/react/dist/csr/HandHeart'
import { HandshakeIcon } from '@phosphor-icons/react/dist/csr/Handshake'
import { LeafIcon } from '@phosphor-icons/react/dist/csr/Leaf'
import { LightbulbIcon } from '@phosphor-icons/react/dist/csr/Lightbulb'
import { MedalIcon } from '@phosphor-icons/react/dist/csr/Medal'
import { PlantIcon } from '@phosphor-icons/react/dist/csr/Plant'
import { SparkleIcon } from '@phosphor-icons/react/dist/csr/Sparkle'
import { useEffect } from 'react'
import { Link } from 'react-router'
import loungeAzul from '../assets/fotos/lounge-estanteria-azul.jpg?responsive'
import loungeJardin from '../assets/fotos/lounge-exterior-jardin.jpg?responsive'
import terraza from '../assets/fotos/terraza-mesa-conchas.jpg?responsive'
import Tagline from '../components/home/Tagline'
import Picture from '../components/Picture'
import Reveal from '../components/Reveal'
import ScrollMedia from '../components/ScrollMedia'
import ScrollTilt from '../components/ScrollTilt'
import SectionHeader from '../components/SectionHeader'

// Textos de chelonialosroques.com/nosotros, resumidos y corregidos
const facts = [
  { value: '12', label: 'suites frente al mar' },
  { value: 'LEED', label: 'certificación ambiental' },
  { value: '24 h', label: 'equipo a tu servicio' },
]

const values = [
  {
    Icon: SparkleIcon,
    title: 'Exclusividad',
    text: 'Pocas habitaciones y servicios personalizados: cada huésped recibe una atención detallada.',
  },
  {
    Icon: LeafIcon,
    title: 'Sustentabilidad',
    text: 'Prácticas ecológicas en toda la operación, desde la construcción hasta las experiencias.',
  },
  {
    Icon: PlantIcon,
    title: 'Conexión con la naturaleza',
    text: 'Actividades que acercan al entorno único de Los Roques, en armonía con él.',
  },
  { Icon: MedalIcon, title: 'Calidad', text: 'Los más altos estándares en infraestructura, servicio y gastronomía.' },
  { Icon: HandshakeIcon, title: 'Respeto', text: 'Hacia los huéspedes, la comunidad local, sus tradiciones y el medio ambiente.' },
  { Icon: LightbulbIcon, title: 'Innovación', text: 'Nuevas formas de mejorar la estadía y reducir el impacto ambiental.' },
  { Icon: HandHeartIcon, title: 'Hospitalidad genuina', text: 'Una atmósfera cálida donde te sientes en casa, lejos de casa.' },
]

// Las cuatro normas que cita la web original (ficha de cada habitación)
const leed = [
  { title: 'Energía', text: 'Manejo del consumo eléctrico a través de sistemas solares.' },
  { title: 'Agua', text: 'Uso y reciclaje de aguas blancas y grises.' },
  { title: 'Materiales', text: 'Materiales de construcción de bajo impacto.' },
  { title: 'Desechos', text: 'Cuidado en el desecho de los materiales.' },
]

const button =
  'rounded-full px-6 py-3 text-base font-semibold transition-all duration-700 ease-fluid active:scale-[0.98]'

export default function Nosotros() {
  useEffect(() => {
    document.title = 'Nosotros · Chelonia Casa de Mar'
  }, [])

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-32 pb-16 md:px-6 md:pt-40">
        <SectionHeader label="Nosotros" title="Una casa frente al mar, en el corazón de Los Roques">
          <p>
            Chelonia Casa de Mar está justo frente a Cayo Madrisqui, con aguas serenas y cristalinas durante todo el
            año y una atención pensada para cada huésped.
          </p>
        </SectionHeader>
        <ScrollMedia className="-mx-4 mt-12 md:mx-0">
          <Picture
            src={terraza}
            alt="Terraza de madera con mesa, conchas y sillones de mimbre frente al mar turquesa"
            sizes="(min-width: 1280px) 1280px, 100vw"
            coverAspect={4 / 5}
            loading="eager"
            className="aspect-4/5 w-full object-cover md:aspect-video"
          />
        </ScrollMedia>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollTilt className="-mx-4 md:mx-0">
            <Picture
              src={loungeAzul}
              alt="Lounge con estantería azul, sofás blancos y cojines de rayas"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-square w-full object-cover md:rounded-2xl"
            />
          </ScrollTilt>
          <div className="flex flex-col gap-8">
            <SectionHeader label="Nuestra historia" title="Doce suites, una terraza y el mar">
              <p>
                Cada suite está decorada para dar amplitud, confort y privacidad, con baño privado, aire acondicionado,
                TV, agua caliente y caja de seguridad.
              </p>
              <p>
                Las áreas sociales invitan a relajarse al sol o compartir con amigos, y la terraza es el escenario para
                cenar bajo las estrellas con una cocina que une los sabores latinos y los del mar.
              </p>
              <p>
                Para los aventureros, Los Roques ofrece vela, kayak, windsurf, kitesurf, buceo, snorkel y pesca
                deportiva, además del Seabob y nuestra lancha transparente. Y para celebrar, planes a medida para lunas
                de miel, bodas, aniversarios y cumpleaños.
              </p>
            </SectionHeader>
            <Reveal>
              <dl className="grid grid-cols-3 gap-6 border-t border-border pt-6">
                {facts.map(({ value, label }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <dt className="order-last text-sm text-foreground-muted">{label}</dt>
                    <dd className="text-title-3 text-primary">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <Tagline text="Cada detalle está pensado para el máximo descanso, diversión y conexión con la naturaleza." />

      <section className="bg-surface-alt">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <SectionHeader label="Valores" title="Lo que guía cada decisión" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }, index) => (
              <li key={title}>
                <Reveal delay={(index % 4) * 100} className="h-full">
                  <article className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-700 ease-fluid hover:-translate-y-1 hover:shadow-xl hover:shadow-laguna-950/5">
                    <Icon className="size-8 text-primary" aria-hidden="true" />
                    <h3 className="text-title-4">{title}</h3>
                    <p className="text-foreground-muted">{text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="dark bg-background text-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeader label="Nuestro compromiso" title="El primer hospedaje LEED de Venezuela">
              <p>
                La certificación LEED (Leadership in Energy and Environmental Design) es el sello internacional que
                reconoce a los edificios con los más altos estándares en eficiencia energética, uso del agua, calidad
                del aire interior y materiales.
              </p>
              <p>
                Nos distingue como el primer hospedaje 100% ecoamigable del país y confirma que el lujo y la
                sostenibilidad pueden ir de la mano.
              </p>
            </SectionHeader>
            <ul className="grid gap-4 sm:grid-cols-2">
              {leed.map(({ title, text }, index) => (
                <li key={title}>
                  <Reveal delay={index * 100} className="h-full">
                    <div className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-surface p-6">
                      <h3 className="font-semibold">{title}</h3>
                      <p className="text-sm text-foreground-muted">{text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <ScrollMedia className="-mx-4 md:mx-0">
            <Picture
              src={loungeJardin}
              alt="Pabellón de madera con jardín de palmeras frente a la playa"
              sizes="(min-width: 1024px) 50vw, 100vw"
              coverAspect={4 / 5}
              className="aspect-4/5 w-full object-cover"
            />
          </ScrollMedia>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-170 text-title-1">Bienvenidos a su casa lejos de casa</h2>
          <p className="max-w-170 text-lead text-foreground-muted">
            Ven a conocer Chelonia. Te esperamos frente a Cayo Madrisqui.
          </p>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link to="/reservacion" className={`${button} bg-primary text-center text-on-primary hover:bg-primary-hover`}>
              Consultar disponibilidad
            </Link>
            <Link
              to="/habitaciones"
              className={`${button} border border-border text-center hover:bg-surface-alt hover:text-primary`}
            >
              Ver habitaciones
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
