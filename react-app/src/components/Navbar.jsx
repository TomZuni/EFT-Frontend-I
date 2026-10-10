// Barra de navegación (componente reutilizable).
// Props: titulo (texto de la marca) y enlaces (lista de { texto, href, activo }).
// Estado propio: menuAbierto, para el botón hamburguesa en móviles.
import { useState } from 'react'

export default function Navbar({ titulo, enlaces }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top" aria-label="Navegación principal">
        <div className="container">
          <a className="navbar-brand" href="../index.html">
            {titulo}
            <span>Gamer</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {enlaces.map((enlace) => (
                <li className="nav-item" key={enlace.texto}>
                  <a
                    className={`nav-link ${enlace.activo ? 'active' : ''}`}
                    href={enlace.href}
                    onClick={() => setMenuAbierto(false)}
                  >
                    {enlace.texto}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
