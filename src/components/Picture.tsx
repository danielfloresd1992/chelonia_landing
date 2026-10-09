import type { Picture as PictureData } from 'vite-imagetools'

interface PictureProps {
  src: PictureData
  alt: string
  sizes?: string
  // Proporción (ancho/alto) del marco cuando la foto va con object-fit: cover
  coverAspect?: number
  className?: string
  loading?: 'lazy' | 'eager'
}

// Un marco más alto que la foto la amplía hasta llenar la altura: el `sizes` debe
// crecer en la misma proporción o el navegador elige una versión pequeña y se ve borrosa.
const coverSizes = (sizes: string, factor: number) =>
  sizes.replace(/(\d+(?:\.\d+)?)(vw|px)/g, (_, n: string, unit: string) => `${Math.ceil(Number(n) * factor)}${unit}`)

export default function Picture({ src, alt, sizes = '100vw', coverAspect, className, loading = 'lazy' }: PictureProps) {
  const factor = coverAspect ? Math.max(1, src.img.w / src.img.h / coverAspect) : 1
  const effectiveSizes = factor > 1 ? coverSizes(sizes, factor) : sizes

  return (
    <picture>
      {Object.entries(src.sources).map(([format, srcSet]) => (
        <source
          key={format}
          type={`image/${format === 'jpg' ? 'jpeg' : format}`}
          srcSet={srcSet}
          sizes={effectiveSizes}
        />
      ))}
      <img
        src={src.img.src}
        width={src.img.w}
        height={src.img.h}
        alt={alt}
        loading={loading}
        decoding="async"
        className={className}
      />
    </picture>
  )
}
