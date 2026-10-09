import type { Picture } from 'vite-imagetools'
import atardecerPalmera from '../assets/fotos/atardecer-palmera.jpg?responsive'
import atardecerSiluetaMar from '../assets/fotos/atardecer-silueta-mar.jpg?responsive'
import banoDuchaPiedra from '../assets/fotos/bano-ducha-piedra.jpg?responsive'
import banoEspejoRedondo from '../assets/fotos/bano-espejo-redondo.jpg?responsive'
import banoLavamanosEstrella from '../assets/fotos/bano-lavamanos-estrella.jpg?responsive'
import banoLavamanosMadera from '../assets/fotos/bano-lavamanos-madera.jpg?responsive'
import banoPuertaMadera from '../assets/fotos/bano-puerta-madera.jpg?responsive'
import batasBano from '../assets/fotos/batas-bano.jpg?responsive'
import camaAlmohadasVentana from '../assets/fotos/cama-almohadas-ventana.jpg?responsive'
import camaDetalleCojines from '../assets/fotos/cama-detalle-cojines.jpg?responsive'
import cenaPlatos from '../assets/fotos/cena-platos.jpg?responsive'
import champanaHielo from '../assets/fotos/champana-hielo.jpg?responsive'
import estanteriaLoungeMar from '../assets/fotos/estanteria-lounge-mar.jpg?responsive'
import habitacionCamaTv from '../assets/fotos/habitacion-cama-tv.jpg?responsive'
import habitacionLiteras from '../assets/fotos/habitacion-literas.jpg?responsive'
import habitacionPezFrontal from '../assets/fotos/habitacion-pez-frontal.jpg?responsive'
import habitacionVistaCenital from '../assets/fotos/habitacion-vista-cenital.jpg?responsive'
import loungeCortinasPuffs from '../assets/fotos/lounge-cortinas-puffs.jpg?responsive'
import loungeDetalleEstanteria from '../assets/fotos/lounge-detalle-estanteria.jpg?responsive'
import loungeExteriorJardin from '../assets/fotos/lounge-exterior-jardin.jpg?responsive'
import loungePuffsMar from '../assets/fotos/lounge-puffs-mar.jpg?responsive'
import pabellonSobreAgua from '../assets/fotos/pabellon-sobre-agua.jpg?responsive'
import picnicPlaya from '../assets/fotos/picnic-playa.jpg?responsive'
import playaTumbonasPalmeras from '../assets/fotos/playa-tumbonas-palmeras.jpg?responsive'
import recepcionCuadroPez from '../assets/fotos/recepcion-cuadro-pez.jpg?responsive'
import restaurantePergola from '../assets/fotos/restaurante-pergola.jpg?responsive'
import suiteSencilla from '../assets/fotos/suite-sencilla.jpg?responsive'
import terrazaCortinasAlfombras from '../assets/fotos/terraza-cortinas-alfombras.jpg?responsive'
import terrazaHabitacion from '../assets/fotos/terraza-habitacion.jpg?responsive'
import terrazaNoche from '../assets/fotos/terraza-noche.jpg?responsive'
import terrazaPalmerasPlaya from '../assets/fotos/terraza-palmeras-playa.jpg?responsive'
import terrazaVistaLancha from '../assets/fotos/terraza-vista-lancha.jpg?responsive'
import vistaAereaArchipielago from '../assets/fotos/vista-aerea-archipielago.jpg?responsive'
import vistaAereaPosada from '../assets/fotos/vista-aerea-posada.jpg?responsive'
import vistaBahiaTerraza from '../assets/fotos/vista-bahia-terraza.jpg?responsive'

export type GalleryCategory = 'habitaciones' | 'banos' | 'espacios' | 'gastronomia' | 'mar'

export interface GalleryItem {
  src: Picture
  alt: string
  category: GalleryCategory
}

export const categories: { id: GalleryCategory | 'todas'; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'habitaciones', label: 'Habitaciones' },
  { id: 'banos', label: 'Baños' },
  { id: 'espacios', label: 'Espacios comunes' },
  { id: 'gastronomia', label: 'Gastronomía' },
  { id: 'mar', label: 'Mar y playa' },
]

// Fotos que no aparecen en el inicio (las del recorrido 3D se ven solo de paso).
// El orden alterna categorías y formatos para que el mosaico quede equilibrado.
export const gallery: GalleryItem[] = [
  { src: vistaAereaArchipielago, alt: 'Vista aérea del archipiélago de Los Roques', category: 'mar' },
  { src: suiteSencilla, alt: 'Suite con cama king size y cortinas claras', category: 'habitaciones' },
  { src: loungeExteriorJardin, alt: 'Pabellón de madera con jardín de palmeras frente a la playa', category: 'espacios' },
  { src: cenaPlatos, alt: 'Cena servida a la luz de las velas: carne y vegetales', category: 'gastronomia' },
  { src: banoLavamanosMadera, alt: 'Lavamanos sobre mesada de madera con espejo redondo', category: 'banos' },
  { src: terrazaCortinasAlfombras, alt: 'Terraza con cortinas blancas, sofá de mimbre y alfombras de yute', category: 'espacios' },
  { src: habitacionLiteras, alt: 'Habitación familiar con dos literas de madera', category: 'habitaciones' },
  { src: vistaAereaPosada, alt: 'Vista aérea de la posada y su playa', category: 'mar' },
  { src: picnicPlaya, alt: 'Picnic en la playa con champaña y silla azul', category: 'gastronomia' },
  { src: terrazaPalmerasPlaya, alt: 'Terraza con sillones de mimbre, palmeras y playa', category: 'espacios' },
  { src: banoDuchaPiedra, alt: 'Baño con ducha de piedra y lavamanos de madera', category: 'banos' },
  { src: atardecerSiluetaMar, alt: 'Silueta de una persona en el mar al atardecer', category: 'mar' },
  { src: recepcionCuadroPez, alt: 'Recepción con el cuadro del pez, lámparas de fibra y corales', category: 'espacios' },
  { src: camaDetalleCojines, alt: 'Detalle de los cojines de yute sobre la cama', category: 'habitaciones' },
  { src: estanteriaLoungeMar, alt: 'Estantería del lounge con botellas y vasijas, y el mar al fondo', category: 'espacios' },
  { src: restaurantePergola, alt: 'Restaurante bajo la pérgola con vista al mar', category: 'espacios' },
  { src: champanaHielo, alt: 'Botellas de champaña en una cubeta con hielo', category: 'gastronomia' },
  { src: atardecerPalmera, alt: 'Palmera recortada contra el cielo del atardecer', category: 'mar' },
  { src: habitacionPezFrontal, alt: 'Habitación con el cuadro del pez azul sobre la cama', category: 'habitaciones' },
  { src: banoEspejoRedondo, alt: 'Baño con espejo redondo y lavamanos de piedra', category: 'banos' },
  { src: terrazaNoche, alt: 'Terraza de noche con sillones de mimbre y el mar al fondo', category: 'espacios' },
  { src: terrazaVistaLancha, alt: 'Vista al mar desde la terraza, con una lancha en la orilla', category: 'espacios' },
  { src: playaTumbonasPalmeras, alt: 'Tumbonas y palmeras en la playa de la posada', category: 'mar' },
  { src: terrazaHabitacion, alt: 'Terraza privada de una habitación con sillones de mimbre', category: 'habitaciones' },
  { src: batasBano, alt: 'Batas de baño blancas colgadas en la pared de piedra', category: 'banos' },
  { src: loungeDetalleEstanteria, alt: 'Rincón del lounge con estantería, sofá y cojines de rayas', category: 'espacios' },
  { src: loungePuffsMar, alt: 'Puffs frente al mar junto al pabellón', category: 'espacios' },
  { src: camaAlmohadasVentana, alt: 'Cama con almohadas junto a la ventana con cortinas', category: 'habitaciones' },
  { src: vistaBahiaTerraza, alt: 'Vista de la bahía desde la terraza', category: 'mar' },
  { src: pabellonSobreAgua, alt: 'Pabellón con cortinas sobre el agua', category: 'espacios' },
  { src: banoLavamanosEstrella, alt: 'Lavamanos de piedra con estrella de mar y cestas', category: 'banos' },
  { src: habitacionVistaCenital, alt: 'Habitación vista desde arriba con el cuadro del pez', category: 'habitaciones' },
  { src: loungeCortinasPuffs, alt: 'Lounge con cortinas blancas y puffs sobre la arena', category: 'espacios' },
  { src: banoPuertaMadera, alt: 'Baño con puerta corrediza de madera', category: 'banos' },
  { src: habitacionCamaTv, alt: 'Habitación con cama king size y televisor', category: 'habitaciones' },
]
