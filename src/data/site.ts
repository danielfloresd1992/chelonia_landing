import type { NavItem, SocialLink } from '../types'

export const contact = {
  phone: '+58 412-1266591',
  phoneHref: 'tel:+584121266591',
  email: 'reservas@chelonialosroques.com',
  hours: 'Lun a Dom · 9:00 a 18:30',
  address: 'Los Roques, Venezuela',
  // Número del botón de WhatsApp de la web original (distinto del teléfono)
  whatsapp: '584123772020',
}

// Ubicación del mapa de chelonialosroques.com/contacto (código plus de Google)
export const mapsQuery = 'W8WM+H5, Gran Roque, Dependencias Federales Venezolanas, Venezuela'

export const whatsappUrl = (text = 'Hola, necesito más información sobre las habitaciones') =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`

export const mainNav: NavItem[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Habitaciones', to: '/habitaciones' },
  { label: 'Galería', to: '/galeria' },
  { label: 'Contacto', to: '/contacto' },
]

export const footerNav: NavItem[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Habitaciones', to: '/habitaciones' },
  { label: 'Reservaciones', to: '/reservacion' },
  { label: 'Contáctenos', to: '/contacto' },
]

// Facebook no está: en la web original apunta a "#"
export const socialLinks: SocialLink[] = [
  { name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/chelonialosroques/' },
  {
    name: 'tripadvisor',
    label: 'Tripadvisor',
    href: 'https://www.tripadvisor.es/Hotel_Review-g316064-d23920603-Reviews-Chelonia_Casa_De_Mar-Isla_El_Gran_Roque_Los_Roques_National_Park_Coastal_Islands_Insu.html',
  },
  { name: 'whatsapp', label: 'WhatsApp', href: whatsappUrl() },
]
