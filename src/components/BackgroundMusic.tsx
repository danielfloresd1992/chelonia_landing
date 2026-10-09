import { SpeakerHighIcon } from '@phosphor-icons/react/dist/csr/SpeakerHigh'
import { SpeakerSlashIcon } from '@phosphor-icons/react/dist/csr/SpeakerSlash'
import { useEffect, useRef, useState } from 'react'
import musica from '../assets/audio/musica.m4a'

const STORAGE_KEY = 'chelonia:musica'
// Interacciones con las que el navegador permite reproducir audio
const GESTURES = ['pointerdown', 'keydown', 'touchend'] as const

function musicaApagada() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'off'
  } catch {
    return false
  }
}

function recordar(on: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off')
  } catch {
    // sin almacenamiento (modo privado): solo se pierde la preferencia
  }
}

// Música del video de chelonialosroques.com, en bucle. Los navegadores bloquean el audio
// automático hasta que el visitante interactúa: si el intento falla, empieza con el primer
// clic, toque o tecla. El botón la pausa y la elección se recuerda en la próxima visita.
export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || musicaApagada()) return
    const start = (e: Event) => {
      // el clic en el botón lo gestiona toggle
      if (!buttonRef.current?.contains(e.target as Node)) audio.play().catch(() => {})
    }
    const stop = () => GESTURES.forEach((type) => window.removeEventListener(type, start, true))
    GESTURES.forEach((type) => window.addEventListener(type, start, true))
    audio.addEventListener('play', stop)
    audio.play().catch(() => {})
    return () => {
      stop()
      audio.removeEventListener('play', stop)
    }
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    const on = audio.paused
    if (on) audio.play().catch(() => {})
    else audio.pause()
    recordar(on)
  }

  const Icon = playing ? SpeakerHighIcon : SpeakerSlashIcon

  return (
    <>
      <audio
        ref={audioRef}
        src={musica}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-label="Música de fondo"
        aria-pressed={playing}
        title={playing ? 'Pausar música' : 'Reproducir música'}
        className="fixed bottom-4 left-4 z-30 flex size-12 items-center justify-center rounded-full border border-border bg-surface/70 text-foreground shadow-lg shadow-laguna-950/5 backdrop-blur-xl transition-all duration-700 ease-fluid hover:text-primary active:scale-[0.98] md:bottom-6 md:left-6"
      >
        <Icon className="size-6" aria-hidden="true" />
      </button>
    </>
  )
}
