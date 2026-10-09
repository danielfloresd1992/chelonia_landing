declare module '*?responsive' {
  import type { Picture } from 'vite-imagetools'
  const picture: Picture
  export default picture
}

declare module '*?texture' {
  const src: string
  export default src
}

declare module '*?texture-hd' {
  const src: string
  export default src
}
