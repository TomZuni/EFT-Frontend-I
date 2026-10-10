// Componente raíz. Aquí vive el ESTADO principal de la aplicación:
//   videojuegos      -> la lista (se carga desde juegos.json y se puede agregar/eliminar)
//   categoriaActiva  -> categoría elegida en el filtro
//   cargando / error -> estado de la carga de datos
// Los componentes hijos reciben datos y funciones por PROPS.
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import FiltroCategorias from './components/FiltroCategorias.jsx'
import ListaVideojuegos from './components/ListaVideojuegos.jsx'
import FormularioVideojuego from './components/FormularioVideojuego.jsx'
import FormularioContacto from './components/FormularioContacto.jsx'

const CLAVE_GUARDADO = 'tienda-gamer-eft-catalogo'

const ENLACES = [
  { texto: 'Inicio', href: '../index.html' },
  { texto: 'Catálogo', href: '#catalogo', activo: true },
  { texto: 'Contacto', href: '#contacto' },
]

const IMAGENES = [
  { valor: 'img/portada.jpg', texto: 'Portada gamer' },
  { valor: 'img/eldenring.jpg', texto: 'Elden Ring' },
  { valor: 'img/sekiro.jpg', texto: 'Sekiro' },
  { valor: 'img/fc27.jpg', texto: 'EA Sports FC 27' },
]

export default function App() {
  const [videojuegos, setVideojuegos] = useState([])
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Lee juegos.json (archivo externo) y actualiza el estado con los datos.
  async function cargarDesdeArchivo() {
    setCargando(true)
    setError(null)
    try {
      const respuesta = await fetch(`${import.meta.env.BASE_URL}juegos.json`)
      if (!respuesta.ok) throw new Error('No se pudo leer juegos.json')
      setVideojuegos(await respuesta.json())
    } catch {
      setError('No se pudieron cargar los videojuegos. Intenta nuevamente más tarde.')
    } finally {
      setCargando(false)
    }
  }

  // useEffect #1: al abrir la página, usa el catálogo guardado en el navegador
  // (si existe) o, si no, lo carga desde juegos.json.
  useEffect(() => {
    try {
      const guardado = JSON.parse(localStorage.getItem(CLAVE_GUARDADO))
      if (Array.isArray(guardado) && guardado.length > 0) {
        setVideojuegos(guardado)
        setCargando(false)
        return
      }
    } catch {
      /* si el almacenamiento falla, se carga desde el archivo */
    }
    cargarDesdeArchivo()
  }, [])

  // useEffect #2: cada vez que cambia la lista, se guarda en el navegador
  // (así los juegos agregados o eliminados no se pierden al recargar).
  useEffect(() => {
    if (cargando || error) return
    try {
      localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(videojuegos))
    } catch {
      /* ignorar */
    }
  }, [videojuegos, cargando, error])

  // ----- Acciones que se pasan a los hijos por props -----
  const agregarVideojuego = (nuevo) => {
    const id = videojuegos.reduce((mayor, j) => Math.max(mayor, j.id), 0) + 1
    setVideojuegos([...videojuegos, { ...nuevo, id }])
    setCategoriaActiva('Todos') // para que el juego nuevo se vea de inmediato
  }

  const eliminarVideojuego = (id) => {
    const quedan = videojuegos.filter((j) => j.id !== id)
    setVideojuegos(quedan)
    // Si se eliminó el último de la categoría elegida, se vuelve a "Todos"
    if (categoriaActiva !== 'Todos' && !quedan.some((j) => j.categoria === categoriaActiva)) {
      setCategoriaActiva('Todos')
    }
  }

  const restablecerCatalogo = () => {
    try { localStorage.removeItem(CLAVE_GUARDADO) } catch { /* ignorar */ }
    setCategoriaActiva('Todos')
    cargarDesdeArchivo()
  }

  // ----- Datos derivados (se calculan en cada render, no necesitan estado) -----
  const categorias = ['Todos', ...new Set(videojuegos.map((j) => j.categoria))]
  const juegosFiltrados =
    categoriaActiva === 'Todos' ? videojuegos : videojuegos.filter((j) => j.categoria === categoriaActiva)

  // ----- Contenido del catálogo según el estado (renderizado condicional) -----
  let contenidoCatalogo
  if (cargando) {
    contenidoCatalogo = (
      <div className="text-center py-5">
        <div className="spinner-border text-warning" role="status"></div>
        <p className="mt-3 text-body-secondary">Cargando videojuegos...</p>
      </div>
    )
  } else if (error) {
    contenidoCatalogo = <div className="alert alert-warning">{error}</div>
  } else {
    contenidoCatalogo = (
      <>
        <FiltroCategorias categorias={categorias} activa={categoriaActiva} onCambiar={setCategoriaActiva} />
        <p className="text-body-secondary text-center" aria-live="polite">
          Mostrando {juegosFiltrados.length} de {videojuegos.length} videojuegos
        </p>
        <ListaVideojuegos juegos={juegosFiltrados} onEliminar={eliminarVideojuego} />
      </>
    )
  }

  return (
    <>
      <Navbar titulo="Tienda" enlaces={ENLACES} />

      <main className="container py-5">
        <section id="catalogo" aria-labelledby="tituloCatalogo">
          <div className="text-center mb-4">
            <p className="eyebrow">Panel React</p>
            <h1 id="tituloCatalogo" className="h2">Administra el catálogo</h1>
            <p className="text-body-secondary">Filtra, agrega y elimina videojuegos. Todo se actualiza con el estado de React.</p>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={restablecerCatalogo}>
              <i className="bi bi-arrow-counterclockwise"></i> Restablecer catálogo
            </button>
          </div>
          {contenidoCatalogo}
        </section>

        <div className="row g-4 mt-4">
          <section className="col-lg-6" aria-label="Agregar videojuego">
            <FormularioVideojuego categorias={categorias.filter((c) => c !== 'Todos')} imagenes={IMAGENES} onAgregar={agregarVideojuego} />
          </section>
          <section id="contacto" className="col-lg-6" aria-label="Formulario de contacto">
            <FormularioContacto />
          </section>
        </div>
      </main>

      <footer className="py-4">
        <div className="container text-center">
          <p className="mb-2">Tienda de Videojuegos Gamer - 2026</p>
          <nav aria-label="Enlaces del pie de página" className="d-flex justify-content-center gap-3">
            <a href="../index.html">Inicio</a>
            <a href="../contacto.html">Contacto</a>
          </nav>
        </div>
      </footer>
    </>
  )
}
