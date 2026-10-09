import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-24">
      <h1 className="text-title-1">Página no encontrada</h1>
      <Link to="/" className="font-semibold text-primary hover:text-primary-hover">
        Volver al inicio
      </Link>
    </section>
  )
}
