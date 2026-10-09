import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import Contacto from './pages/Contacto'
import Galeria from './pages/Galeria'
import Habitacion from './pages/Habitacion'
import Habitaciones from './pages/Habitaciones'
import Home from './pages/Home'
import Nosotros from './pages/Nosotros'
import NotFound from './pages/NotFound'
import Reservacion from './pages/Reservacion'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="habitaciones" element={<Habitaciones />} />
        <Route path="habitaciones/:slug" element={<Habitacion />} />
        <Route path="galeria" element={<Galeria />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="reservacion" element={<Reservacion />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
