import { useEffect, useRef } from 'react'

const FRAME_COUNT = 120

const frameUrl = (index) => `/frames/frame_${String(index).padStart(4, '0')}.webp`

const clampFrame = (progress) =>
  Math.min(FRAME_COUNT, Math.max(1, Math.round(progress * (FRAME_COUNT - 1)) + 1))

export default function BackgroundFrames() {
  const imageRef = useRef(null)
  const frameRef = useRef(1)

  useEffect(() => {
    const cache = new Map()
    for (let index = 1; index <= FRAME_COUNT; index += 1) {
      const image = new Image()
      image.decoding = 'async'
      image.src = frameUrl(index)
      cache.set(index, image)
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let pending = 1

    const paint = () => {
      raf = 0
      if (pending === frameRef.current || !imageRef.current) return
      frameRef.current = pending
      const cached = cache.get(pending)
      imageRef.current.src = cached?.src || frameUrl(pending)
    }

    const requestFrame = (index) => {
      pending = index
      if (!raf) raf = window.requestAnimationFrame(paint)
    }

    const onPointerMove = (event) => {
      if (reducedMotion.matches) return
      const progress = event.clientX / Math.max(1, window.innerWidth)
      requestFrame(clampFrame(progress))
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <>
      <img
        ref={imageRef}
        id="backgroundImage"
        className="portfolio-background"
        src={frameUrl(1)}
        alt=""
        draggable="false"
        fetchPriority="high"
      />
      <div className="portfolio-veil" aria-hidden="true" />
    </>
  )
}
