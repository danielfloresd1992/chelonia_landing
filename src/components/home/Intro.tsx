import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { useState } from 'react'
import { Link } from 'react-router'
import pabellon from '../../assets/fotos/pabellon-palmera-cielo.jpg?responsive'
import Picture from '../Picture'
import Reveal from '../Reveal'
import ScrollTilt from '../ScrollTilt'
import SectionHeader from '../SectionHeader'
import Stats from './Stats'

const tabs = [
  {
    id: 'historia',
    label: 'Nuestra historia',
    text: 'Chelonia está justo al frente de Cayo Madrisqui, en el corazón del Archipiélago de Los Roques, con aguas serenas y cristalinas durante todo el año. Sus 12 suites están decoradas para brindar amplitud, confort y privacidad.',
  },
  {
    id: 'valores',
    label: 'Valores',
    text: 'Exclusividad, sustentabilidad, conexión con la naturaleza, calidad, respeto, innovación y hospitalidad genuina: que te sientas en casa, lejos de casa.',
  },
  {
    id: 'compromiso',
    label: 'Nuestro compromiso',
    text: 'Tenemos la certificación LEED, el sello internacional que reconoce la eficiencia en energía, agua y materiales. Nos distingue como el primer hospedaje 100% ecoamigable de Venezuela.',
  },
]

export default function Intro() {
  const [tab, setTab] = useState(tabs[0].id)

  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 md:px-6 md:pt-24 md:pb-16">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeader label="Descubre Chelonia" title="Bienvenidos a su casa lejos de casa">
            <p>
              Un refugio de lujo y exclusividad en Los Roques, Venezuela. Aquí el diseño se une a cenas exquisitas y a
              un servicio excepcional, en armonía con el medio ambiente.
            </p>
            <p>
              Nuestra promesa es simple: una experiencia íntima y personalizada, con el menor impacto ambiental y la
              mayor conexión con la naturaleza.
            </p>
          </SectionHeader>

          <Reveal className="flex flex-col gap-4">
            <div role="tablist" aria-label="Sobre Chelonia" className="flex flex-wrap gap-2">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={tab === id}
                  aria-controls={`panel-${id}`}
                  onClick={() => setTab(id)}
                  className={`rounded-full px-4 py-3 text-sm font-semibold transition-colors duration-700 ease-fluid ${
                    tab === id ? 'bg-primary text-on-primary' : 'bg-surface-alt text-foreground-muted hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {tabs.map(({ id, text }) => (
              <p key={id} role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`} hidden={tab !== id}>
                {text}
              </p>
            ))}
            <Link to="/nosotros" className="flex w-max items-center gap-2 font-semibold text-primary hover:text-primary-hover">
              Ver más sobre nosotros
              <ArrowRightIcon className="size-5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <ScrollTilt className="-mx-4 md:mx-0">
          <Picture
            src={pabellon}
            alt="Pabellón de madera con cortinas blancas junto a una palmera"
            sizes="(min-width: 1024px) 50vw, 100vw"
            coverAspect={4 / 5}
            loading="eager"
            className="aspect-4/5 w-full object-cover md:rounded-2xl lg:aspect-square"
          />
        </ScrollTilt>
      </div>

      <Stats />
    </section>
  )
}
