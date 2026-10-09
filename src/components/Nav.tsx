import { ClockIcon } from '@phosphor-icons/react/dist/csr/Clock'
import { EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import { PhoneIcon } from '@phosphor-icons/react/dist/csr/Phone'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { contact, mainNav } from '../data/site'
import SocialLinks from './SocialLinks'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div className="hidden border-b border-border lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 text-sm text-foreground-muted">
          <ul className="flex items-center gap-6">
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-2 hover:text-foreground">
                <PhoneIcon className="size-4" aria-hidden="true" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-foreground">
                <EnvelopeSimpleIcon className="size-4" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <ClockIcon className="size-4" aria-hidden="true" />
              {contact.hours}
            </li>
          </ul>
          <SocialLinks />
        </div>
      </div>

      <nav
        aria-label="Principal"
        className="fixed inset-x-0 top-6 z-50 mx-auto flex w-max items-center gap-2 rounded-full border border-border bg-surface/70 p-2 shadow-lg shadow-laguna-950/5 backdrop-blur-xl lg:top-16"
      >
        <Link to="/" onClick={close} aria-label="Chelonia Casa de Mar, inicio" className="flex items-center gap-2 rounded-full pr-3">
          <img src="/logos/favchedonia-150x150.png" alt="" className="size-10 rounded-full" />
          <span className="text-sm font-bold tracking-tight">Chelonia</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `block rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-700 ease-fluid ${
                    isActive ? 'bg-surface-alt text-primary' : 'text-foreground-muted hover:text-foreground'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/reservacion"
          className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors duration-700 ease-fluid hover:bg-primary-hover lg:block"
        >
          Reservación
        </Link>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="relative size-11 rounded-full lg:hidden"
        >
          <span
            className={`absolute inset-x-0 top-1/2 mx-auto -mt-px h-0.5 w-5 rounded-full bg-foreground transition-all duration-700 ease-fluid ${
              open ? 'rotate-45' : '-translate-y-1'
            }`}
          />
          <span
            className={`absolute inset-x-0 top-1/2 mx-auto -mt-px h-0.5 w-5 rounded-full bg-foreground transition-all duration-700 ease-fluid ${
              open ? '-rotate-45' : 'translate-y-1'
            }`}
          />
        </button>
      </nav>

      <div
        id="menu-movil"
        className={`fixed inset-0 z-40 flex flex-col justify-between gap-12 bg-background/80 px-6 pt-32 pb-12 backdrop-blur-3xl transition-all duration-700 ease-fluid lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-2">
          {mainNav.map(({ label, to }, i) => (
            <li key={to} className="overflow-hidden">
              <NavLink
                to={to}
                end={to === '/'}
                onClick={close}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : '0ms' }}
                className={({ isActive }) =>
                  `block py-2 text-title-2 transition-all duration-700 ease-fluid ${
                    open ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  } ${isActive ? 'text-primary' : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-6">
          <Link
            to="/reservacion"
            onClick={close}
            className="rounded-full bg-primary px-6 py-3 text-center text-base font-semibold text-on-primary transition-colors duration-700 ease-fluid hover:bg-primary-hover"
          >
            Reservación
          </Link>
          <div className="flex flex-col gap-2 text-sm text-foreground-muted">
            <a href={contact.phoneHref}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <SocialLinks />
        </div>
      </div>
    </>
  )
}
