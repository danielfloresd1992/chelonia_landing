import camaCojinesYutePez from '../assets/fotos/cama-cojines-yute-pez-hd.jpg?responsive'
import habitacionCabeceroMadera from '../assets/fotos/habitacion-cabecero-madera-hd.jpg?responsive'
import habitacionLiterasCama from '../assets/fotos/habitacion-literas-cama-hd.jpg?responsive'
import habitacionTvCuadroPez from '../assets/fotos/habitacion-tv-cuadro-pez-hd.jpg?responsive'
import loungeEstanteriaNoche from '../assets/fotos/lounge-estanteria-noche-hd.jpg?responsive'
import type { Room } from '../types'

// Contenido limitado a chelonialosroques.com: /habitaciones y la ficha de cada habitación.
// Precio en USD por noche, sin IVA. Fotos: solo la indicada por el cliente para cada habitación.
export const CHECK_IN = '3:00 p. m.'
export const CHECK_OUT = '1:00 p. m.'

export const rooms: Room[] = [
  {
    slug: 'habitacion-estandar',
    name: 'Habitación Estándar',
    description: 'Confort y calidad con cama king size y terraza integrada con vista a nuestro jardín interior.',
    bed: 'Cama king size',
    guests: '1 a 2 huéspedes',
    price: 1300,
    photo: habitacionCabeceroMadera,
    alt: 'Cama king size con pared de madera tallada, cojín de pez y cortinas claras',
    photos: [habitacionCabeceroMadera],
    highlights: ['Terraza integrada'],
    includes: ['Cama king size', 'Terraza integrada con vista al jardín interior', 'TV por cable', 'Aire acondicionado'],
  },
  {
    slug: 'habitacion-suite-premium',
    name: 'Suite Premium',
    description: 'Cama king size y terraza privada con comedor, para tomar tus comidas con total privacidad.',
    bed: 'Cama king size',
    guests: '1 a 2 huéspedes',
    size: '67 m²',
    price: 1600,
    photo: habitacionTvCuadroPez,
    alt: 'Suite con televisor, cuadro del pez azul y mueble de madera',
    photos: [habitacionTvCuadroPez],
    highlights: ['Terraza privada con comedor'],
    includes: ['Cama king size', 'Terraza privada con comedor', 'TV por cable', 'Aire acondicionado'],
  },
  {
    slug: 'habitacion-estandar-xl',
    name: 'Habitación Estándar XL',
    description: 'Para familias o grupos de amigos de hasta 4 personas, con asistencia personalizada.',
    bed: 'Cama king size y 1 litera',
    guests: 'Hasta 4 huéspedes',
    price: 1900,
    photo: habitacionLiterasCama,
    alt: 'Habitación con litera de madera, cama king size y mesa auxiliar',
    photos: [habitacionLiterasCama],
    highlights: ['Asistencia personalizada'],
    includes: ['Cama king size', 'Litera', 'Asistencia personalizada', 'TV por cable', 'Aire acondicionado'],
  },
  {
    // La ficha original de esta habitación está vacía: solo hay datos del listado
    slug: 'habitacion-estandar-familiar',
    name: 'Habitación Estándar Familiar',
    description: 'Para familias de 4 a 6 personas, con cama king size y dos literas.',
    bed: 'Cama king size y 2 literas',
    guests: '4 a 6 huéspedes',
    size: '62 m²',
    price: 1900,
    photo: camaCojinesYutePez,
    alt: 'Cama king size con cojines de yute, cojín de pez y pared tejida',
    photos: [camaCojinesYutePez],
    highlights: [],
    includes: ['Cama king size', 'Dos literas'],
  },
  {
    slug: 'habitacion-suite-casa-de-mar',
    name: 'Suite Casa de Mar',
    description: 'Para disfrutar en familia: sala de estar, una habitación matrimonial y otra con dos literas.',
    bed: 'Cama king size y 2 literas',
    guests: '4 a 6 huéspedes',
    size: '62 m²',
    extra: 'Sala de estar',
    price: 2900,
    // Foto indicada por el cliente: es el lounge común de la posada, no la sala de la suite
    photo: loungeEstanteriaNoche,
    alt: 'Lounge de la posada de noche, con estantería iluminada, sofá y cojines de rayas',
    photos: [loungeEstanteriaNoche],
    highlights: ['Sala de estar'],
    includes: [
      'Sala de estar',
      'Habitación matrimonial con cama king size y baño privado',
      'Habitación con dos literas',
      'TV por cable',
      'Aire acondicionado',
    ],
  },
]
