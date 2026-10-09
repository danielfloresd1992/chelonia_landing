import type { Picture } from 'vite-imagetools'

export interface CounterState {
  value: number
}

export interface NavItem {
  label: string
  to: string
}

export interface Room {
  slug: string
  name: string
  description: string
  bed: string
  guests: string
  size?: string
  extra?: string
  price: number
  photo: Picture
  alt: string
  photos: Picture[]
  highlights: string[]
  includes: string[]
}

export interface SocialLink {
  name: 'instagram' | 'tripadvisor' | 'whatsapp'
  label: string
  href: string
}
