import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import { MapPinIcon } from '@phosphor-icons/react/dist/csr/MapPin'
import { PhoneIcon } from '@phosphor-icons/react/dist/csr/Phone'
import { useEffect, type FormEvent } from 'react'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { contact, mapsQuery } from '../data/site'

// Mismos campos (y obligatorios) que el formulario de chelonialosroques.com/contacto
const fields = [
  { name: 'nombre', label: 'Nombre y apellido', type: 'text', autoComplete: 'name', required: false },
  { name: 'telefono', label: 'Nro. Teléfono', type: 'tel', autoComplete: 'tel', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  { name: 'asunto', label: 'Asunto', type: 'text', autoComplete: 'off', required: true },
]

const info = [
  { Icon: MapPinIcon, label: 'Dirección', value: contact.address },
  { Icon: PhoneIcon, label: 'Teléfono', value: contact.phone, href: contact.phoneHref },
  { Icon: EnvelopeSimpleIcon, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
]

const input = 'rounded-xl border border-border bg-surface-alt px-4 text-base text-foreground'

// Sin servidor: abre el correo del visitante con el mensaje ya escrito
function enviarMensaje(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const data = new FormData(e.currentTarget)
  const body = [
    `Nombre: ${data.get('nombre') || 'No indicado'}`,
    `Teléfono: ${data.get('telefono')}`,
    `Email: ${data.get('email')}`,
    '',
    String(data.get('mensaje') || ''),
  ].join('\n')
  const subject = String(data.get('asunto'))
  window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function Contacto() {
  useEffect(() => {
    document.title = 'Contacto · Chelonia Casa de Mar'
  }, [])

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-32 pb-16 md:px-6 md:pt-40 md:pb-24">
        <SectionHeader label="Contáctenos" title="No dude en contactarnos" />

        <div className="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-12">
          <Reveal className="lg:col-span-3">
            <form onSubmit={enviarMensaje} className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map(({ label, ...field }) => (
                  <label key={field.name} className="flex flex-col gap-2 text-sm font-medium">
                    <span>
                      {label}
                      {field.required && <span className="text-accent"> *</span>}
                    </span>
                    <input {...field} className={`h-12 ${input}`} />
                  </label>
                ))}
              </div>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Mensaje
                <textarea name="mensaje" rows={5} className={`py-3 ${input}`} />
              </label>
              <button
                type="submit"
                className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-on-primary transition-all duration-700 ease-fluid hover:bg-primary-hover active:scale-[0.98] sm:self-start"
              >
                Enviar mensaje
              </button>
              <p className="text-sm text-foreground-muted">
                Los campos con <span className="text-accent">*</span> son obligatorios. Se abrirá tu correo con el
                mensaje listo para enviar.
              </p>
            </form>
          </Reveal>

          <ul className="flex flex-col gap-4 lg:col-span-2">
            {info.map(({ Icon, label, value, href }, index) => (
              <li key={label}>
                <Reveal delay={index * 100}>
                  <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-6">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface-alt text-primary">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-sm text-foreground-muted">{label}</span>
                      {href ? (
                        <a href={href} className="font-semibold break-all hover:text-primary">
                          {value}
                        </a>
                      ) : (
                        <span className="font-semibold">{value}</span>
                      )}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 md:pb-24">
        <SectionHeader label="Ubícanos" title="Gran Roque, Los Roques" />
        <Reveal className="mt-8 flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface-alt">
            <iframe
              title="Mapa: ubicación de Chelonia Casa de Mar en Gran Roque, Los Roques"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&t=m&z=16&output=embed&iwloc=near`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-80 w-full md:h-120"
            />
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`}
            target="_blank"
            rel="noreferrer"
            className="flex w-max items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover"
          >
            Abrir en Google Maps
            <ArrowUpRightIcon className="size-4" aria-hidden="true" />
          </a>
        </Reveal>
      </section>
    </>
  )
}
