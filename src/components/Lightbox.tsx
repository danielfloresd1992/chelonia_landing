import { CaretLeftIcon } from '@phosphor-icons/react/dist/csr/CaretLeft'
import { CaretRightIcon } from '@phosphor-icons/react/dist/csr/CaretRight'
import { XIcon } from '@phosphor-icons/react/dist/csr/X'
import { useEffect, useRef, type TouchEvent } from 'react'
import type { GalleryItem } from '../data/gallery'
import Picture from './Picture'

interface LightboxProps {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onChange: (index: number) => void
}

const SWIPE = 50

// Visor a pantalla completa: teclado (Esc, flechas), gestos y botones de 44px
export default function Lightbox({ items, index, onClose, onChange }: LightboxProps) {
  const closeButton = useRef<HTMLButtonElement>(null)
  const touchStart = useRef(0)
  const item = items[index]
  const prev = () => onChange((index - 1 + items.length) % items.length)
  const next = () => onChange((index + 1) % items.length)

  useEffect(() => {
    closeButton.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length)
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [index, items.length, onClose, onChange])

  const onTouchEnd = (e: TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStart.current
    if (delta > SWIPE) prev()
    if (delta < -SWIPE) next()
  }

  const control =
    'flex size-11 items-center justify-center rounded-full bg-arena-50/10 text-arena-50 transition-colors duration-700 ease-fluid hover:bg-arena-50/25'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} de ${items.length}`}
      onClick={onClose}
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 z-60 flex animate-rise flex-col items-center justify-center bg-laguna-950/95 p-4 pt-20 md:p-16"
      style={{ animationDuration: '400ms' }}
    >
      <button ref={closeButton} type="button" onClick={onClose} aria-label="Cerrar" className={`${control} absolute top-4 right-4`}>
        <XIcon className="size-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
        aria-label="Foto anterior"
        className={`${control} absolute top-1/2 left-2 -translate-y-1/2 md:left-6`}
      >
        <CaretLeftIcon className="size-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
        aria-label="Foto siguiente"
        className={`${control} absolute top-1/2 right-2 -translate-y-1/2 md:right-6`}
      >
        <CaretRightIcon className="size-6" aria-hidden="true" />
      </button>

      <figure key={index} onClick={(e) => e.stopPropagation()} className="flex max-w-6xl animate-rise flex-col items-center gap-4">
        <Picture
          src={item.src}
          alt={item.alt}
          sizes="100vw"
          loading="eager"
          className="max-h-[72svh] w-auto max-w-full rounded-xl object-contain md:max-h-[78svh]"
        />
        <figcaption className="flex w-full items-center justify-between gap-6 text-sm text-arena-200">
          <span>{item.alt}</span>
          <span className="shrink-0 tabular-nums">
            {index + 1} / {items.length}
          </span>
        </figcaption>
      </figure>
    </div>
  )
}
