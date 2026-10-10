import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { MathUtils, PlaneGeometry, TextureLoader, type Mesh, type MeshBasicMaterial } from 'three'
// En el orden del recorrido: llegada, posada, mesa, mar, atardecer
const names = [
  'playa-aerea-cayo',
  'pabellon-palmera-cielo',
  'habitacion-cuadro-pez',
  'terraza-cortinas-mar',
  'mesa-imperial-atardecer',
  'lancha-transparente',
  'bano-lavamanos-madera',
  'paddle-mar-turquesa',
  'recepcion-cuadro-pez',
  'atardecer-palmera',
]
const sd = import.meta.glob<string>(
  '../../assets/fotos/{playa-aerea-cayo,pabellon-palmera-cielo,habitacion-cuadro-pez,terraza-cortinas-mar,mesa-imperial-atardecer,lancha-transparente,bano-lavamanos-madera,paddle-mar-turquesa,recepcion-cuadro-pez,atardecer-palmera}.jpg',
  { query: '?texture', import: 'default', eager: true },
)
const hd = import.meta.glob<string>(
  '../../assets/fotos/{playa-aerea-cayo,pabellon-palmera-cielo,habitacion-cuadro-pez,terraza-cortinas-mar,mesa-imperial-atardecer,lancha-transparente,bano-lavamanos-madera,paddle-mar-turquesa,recepcion-cuadro-pez,atardecer-palmera}.jpg',
  { query: '?texture-hd', import: 'default', eager: true },
)
const toUrls = (set: Record<string, string>) => names.map((name) => set[`../../assets/fotos/${name}.jpg`])
const photosMobile = toUrls(sd).slice(0, 7)
const photosDesktop = toUrls(hd)

// Recorta la foto al centro para llenar el marco sin deformarla (como object-fit: cover)
function coverPlane(width: number, height: number, imageAspect: number) {
  const geometry = new PlaneGeometry(width, height)
  const planeAspect = width / height
  const sx = imageAspect > planeAspect ? planeAspect / imageAspect : 1
  const sy = imageAspect > planeAspect ? 1 : imageAspect / planeAspect
  const uv = geometry.attributes.uv
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, 0.5 + (uv.getX(i) - 0.5) * sx, 0.5 + (uv.getY(i) - 0.5) * sy)
  }
  return geometry
}

interface JourneySceneProps {
  progress: RefObject<number>
  eventSource: RefObject<HTMLElement | null>
}

export default function JourneyScene({ progress, eventSource }: JourneySceneProps) {
  const [visible, setVisible] = useState(true)
  const fog = useMemo(
    () => getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim() || '#faf8f4',
    [],
  )

  // Pausa el render cuando el recorrido no está en pantalla
  useEffect(() => {
    const el = eventSource.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [eventSource])

  return (
    <Canvas
      eventSource={eventSource as RefObject<HTMLElement>}
      frameloop={visible ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
    >
      <fog attach="fog" args={[fog, 4, 24]} />
      <Suspense fallback={null}>
        <Gallery progress={progress} />
      </Suspense>
    </Canvas>
  )
}

interface Slot {
  x: number
  y: number
  z: number
  rx: number
  ry: number
}

interface PhotoProps {
  url: string
  index: number
  slot: Slot
  frameW: number
  frameH: number
  onReady: (index: number) => void
}

// Cada foto carga por su cuenta y aparece en cuanto llega, sin esperar a las demás
function Photo({ url, index, slot, frameW, frameH, onReady }: PhotoProps) {
  const source = useLoader(TextureLoader, url)
  const gl = useThree((state) => state.gl)
  const mesh = useRef<Mesh>(null)
  const fade = useRef(0)

  // Se monta cuando la textura ya llegó: avisa para que empiece la siguiente
  useEffect(() => onReady(index), [onReady, index])

  const { texture, geometry } = useMemo(() => {
    const { width, height } = source.image as HTMLImageElement
    // Copia con filtrado anisotrópico: nítida aunque la foto esté girada
    const texture = source.clone()
    texture.anisotropy = gl.capabilities.getMaxAnisotropy()
    return { texture, geometry: coverPlane(frameW, frameH, width / height) }
  }, [source, frameW, frameH, gl])

  useEffect(
    () => () => {
      texture.dispose()
      geometry.dispose()
    },
    [texture, geometry],
  )

  useFrame(({ camera, clock }, delta) => {
    const m = mesh.current
    if (!m) return
    m.position.y = slot.y + Math.sin(clock.elapsedTime * 0.6 + index) * 0.06
    // Entra con un fundido al cargar y se desvanece al pasar junto a la cámara
    fade.current = Math.min(1, fade.current + delta * 1.5)
    const ahead = camera.position.z - m.position.z
    ;(m.material as MeshBasicMaterial).opacity = fade.current * MathUtils.clamp((ahead - 0.6) / 2.4, 0, 1)
  })

  return (
    <mesh ref={mesh} geometry={geometry} position={[slot.x, slot.y, slot.z]} rotation={[slot.rx, slot.ry, 0]}>
      <meshBasicMaterial map={texture} toneMapped={false} transparent opacity={0} />
    </mesh>
  )
}

function Gallery({ progress }: { progress: RefObject<number> }) {
  const size = useThree((state) => state.size)
  const portrait = size.width < size.height
  // Móvil: 7 texturas de 1024px. Escritorio: 10 de 2048px.
  const urls = size.width < 768 ? photosMobile : photosDesktop
  // Todas las fotos con el mismo marco. Horizontal: 3:2 a los lados del camino. Vertical: 4:5.
  const frame = portrait ? { w: 2.6, h: 3.25 } : { w: 5, h: 3.4 }
  // Las fotos se piden de dos en dos y en el orden del recorrido: las primeras llegan antes
  const [ready, setReady] = useState(0)
  const onReady = useCallback((index: number) => setReady((n) => Math.max(n, index + 1)), [])

  const slots = useMemo<Slot[]>(
    () =>
      urls.map((_, i) => {
        const side = i % 2 === 0 ? -1 : 1
        return {
          // Bordes interiores casi en el eje: las fotos llenan el centro sin dejar hueco
          x: portrait ? 0 : side * 2.5,
          y: portrait ? side * 1.75 : (((i * 7) % 3) - 1) * 0.3,
          // La primera foto empieza lejos: el título arranca con espacio libre
          z: -6 - i * (portrait ? 3.8 : 4.8),
          rx: portrait ? side * 0.15 : 0,
          ry: portrait ? 0 : -side * 0.32,
        }
      }),
    [urls, portrait],
  )

  const endZ = slots[slots.length - 1].z + 2.5

  useFrame(({ camera, pointer }, delta) => {
    const p = progress.current ?? 0
    camera.position.z = MathUtils.damp(camera.position.z, MathUtils.lerp(6, endZ, p), 4, delta)
    camera.position.x = MathUtils.damp(camera.position.x, portrait ? 0 : pointer.x * 0.4, 2, delta)
    camera.position.y = MathUtils.damp(camera.position.y, portrait ? 0 : pointer.y * 0.25, 2, delta)
    camera.lookAt(camera.position.x * 0.5, camera.position.y * 0.5, camera.position.z - 8)
  })

  return (
    <group>
      {urls.map(
        (url, i) =>
          i < ready + 2 && (
            <Suspense key={url} fallback={null}>
              <Photo url={url} index={i} slot={slots[i]} frameW={frame.w} frameH={frame.h} onReady={onReady} />
            </Suspense>
          ),
      )}
    </group>
  )
}
