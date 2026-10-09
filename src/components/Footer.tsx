import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { ArrowUpIcon } from '@phosphor-icons/react/dist/csr/ArrowUp'
import { EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import { MapPinIcon } from '@phosphor-icons/react/dist/csr/MapPin'
import { PhoneIcon } from '@phosphor-icons/react/dist/csr/Phone'
import type { FormEvent } from 'react'
import { Link } from 'react-router'
import { contact, footerNav, whatsappUrl } from '../data/site'
import SocialLinks from './SocialLinks'

const fields = [
  { name: 'checkin', label: 'Check in', type: 'date', required: true },
  { name: 'checkout', label: 'Check out', type: 'date', required: true },
  { name: 'adultos', label: 'Adultos', type: 'number', min: 1, defaultValue: 2, required: true },
  { name: 'ninos', label: 'Niños', type: 'number', min: 0, defaultValue: 0 },
  { name: 'telefono', label: 'Teléfono', type: 'tel', autoComplete: 'tel' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
]

const year = new Date().getFullYear()

// Sin backend: la consulta se envía por WhatsApp con los datos ya escritos
function consultarDisponibilidad(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const data = new FormData(e.currentTarget)
  const lines = fields.map(({ name, label }) => `${label}: ${data.get(name) || 'No indicado'}`)
  window.open(whatsappUrl(['Hola, quiero consultar disponibilidad.', ...lines].join('\n')), '_blank', 'noopener')
}

export default function Footer() {
  return (
    <footer className="dark bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h2 className="text-title-1">Disfruta de una experiencia de lujo</h2>
          <p className="text-lead text-foreground-muted">
            La posada te ofrece un hospedaje extraordinario, exclusivo y ecológico en el Archipiélago de Los Roques,
            Venezuela, que fusiona de manera armónica la sencillez de la vida frente al mar con un moderno diseño
            arquitectónico.
          </p>
          <p className="text-foreground-muted">
            Impecables habitaciones, la mejor gastronomía y un equipo a tu servicio 24 horas, en una de las playas más
            hermosas de Latinoamérica.
          </p>
          <div className="flex flex-wrap items-end gap-8">
            <a href={contact.phoneHref} className="flex flex-col gap-1">
              <span className="text-label text-primary">Más información</span>
              <span className="text-title-3">{contact.phone}</span>
            </a>
            <Link to="/habitaciones" className="flex items-center gap-2 font-semibold text-primary hover:text-primary-hover">
              Habitaciones y suites
              <ArrowRightIcon className="size-5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <form
          onSubmit={consultarDisponibilidad}
          className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-8"
        >
          <h3 className="text-title-3">Consultar disponibilidad</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(({ label, ...input }) => (
              <label key={input.name} className="flex flex-col gap-2 text-sm font-medium">
                {label}
                <input
                  {...input}
                  className="h-12 rounded-xl border border-border bg-surface-alt px-4 text-base text-foreground"
                />
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-on-primary transition-colors duration-700 ease-fluid hover:bg-primary-hover"
          >
            Recibir disponibilidad
          </button>
          <p className="text-sm text-foreground-muted">Se abrirá WhatsApp con tu consulta lista para enviar.</p>
        </form>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
          <div className="flex flex-col gap-6">
            <Link to="/" aria-label="Chelonia Casa de Mar, inicio">
              <img src="/logos/logo-web-2.png" alt="" className="h-12 w-auto" />
            </Link>
            <p className="text-foreground-muted">Insuperable turismo en las islas paradisíacas de Los Roques.</p>
            <SocialLinks />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-title-4">Enlaces de interés</h2>
            <ul className="flex flex-col gap-3 text-foreground-muted">
              {footerNav.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-title-4">Ubícanos</h2>
            <address className="flex flex-col gap-3 text-foreground-muted not-italic">
              <span className="flex items-center gap-3">
                <MapPinIcon className="size-5 shrink-0" aria-hidden="true" />
                {contact.address}
              </span>
              <a href={contact.phoneHref} className="flex items-center gap-3 hover:text-foreground">
                <PhoneIcon className="size-5 shrink-0" aria-hidden="true" />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-foreground">
                <EnvelopeSimpleIcon className="size-5 shrink-0" aria-hidden="true" />
                {contact.email}
              </a>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm text-foreground-muted">
          <p>© {year} Chelonia Casa de Mar. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{' '}
            <a
              href="https://amazonas365.com/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-foreground transition-colors duration-700 ease-fluid hover:text-primary"
            >
              Amazonas365
            </a>
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver arriba"
            className="flex size-11 items-center justify-center rounded-full border border-border transition-colors duration-700 ease-fluid hover:bg-surface-alt hover:text-primary"
          >
            <ArrowUpIcon className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
