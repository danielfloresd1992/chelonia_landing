import { useEffect, useRef, type RefObject } from 'react'

type OnFrame = (rect: DOMRect, viewportHeight: number) => void

// Llama a onFrame en cada frame solo mientras el elemento está en pantalla.
// Sin listener de scroll: requestAnimationFrame + IntersectionObserver.
export function useScrollFrame(ref: RefObject<HTMLElement | null>, onFrame: OnFrame) {
  const callback = useRef(onFrame)

  useEffect(() => {
    callback.current = onFrame
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const tick = () => {
      callback.current(el.getBoundingClientRect(), window.innerHeight)
      frame = requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame)
      if (entry.isIntersecting) frame = requestAnimationFrame(tick)
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [ref])
}
