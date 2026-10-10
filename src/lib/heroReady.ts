// El video de portada es lo primero que debe descargarse. Lo que no se ve al abrir la página
// (el video día/noche) espera a esta promesa para no quitarle ancho de banda.
let resolve: () => void

export const heroReady = new Promise<void>((r) => {
  resolve = r
})

export const markHeroReady = () => resolve()
