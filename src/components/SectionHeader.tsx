import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface SectionHeaderProps {
  label: string
  title: string
  children?: ReactNode
  center?: boolean
}

export default function SectionHeader({ label, title, children, center = false }: SectionHeaderProps) {
  return (
    <Reveal className={`flex max-w-170 flex-col gap-4 ${center ? 'mx-auto items-center text-center' : ''}`}>
      <p className="text-label text-primary">{label}</p>
      <h2 className="text-title-1">{title}</h2>
      {children && <div className="flex flex-col gap-4 text-lead text-foreground-muted">{children}</div>}
    </Reveal>
  )
}
