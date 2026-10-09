import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools({
      // `foto.jpg?texture` / `?texture-hd` -> one WebP URL for 3D textures (mobile / desktop)
      // `foto.jpg?responsive` -> AVIF + WebP + fallback in 4 widths, as <picture> data
      defaultDirectives: (url) => {
        if (url.searchParams.has('texture')) {
          return new URLSearchParams({ w: '1024', format: 'webp', quality: '75' })
        }
        if (url.searchParams.has('texture-hd')) {
          return new URLSearchParams({ w: '2048', format: 'webp', quality: '75' })
        }
        if (!url.searchParams.has('responsive')) return new URLSearchParams()
        const fallback = url.pathname.endsWith('.png') ? 'png' : 'jpg'
        return new URLSearchParams({
          w: '640;1024;1600;2000',
          format: `avif;webp;${fallback}`,
          quality: '72', // AVIF usa 50 por defecto y se nota en fotos grandes
          as: 'picture',
        })
      },
    }),
  ],
})
