// Formulario para AGREGAR un videojuego a la lista.
// Props: categorias (para sugerir), imagenes (opciones de portada) y onAgregar (función del padre).
// Estado propio: datos (campos escritos) y errores (mensaje por campo).
import { useState } from 'react'

const VACIO = { nombre: '', categoria: '', precio: '', descripcion: '', imagen: '' }

export default function FormularioVideojuego({ categorias, imagenes, onAgregar }) {
  const [datos, setDatos] = useState({ ...VACIO, imagen: imagenes[0].valor })
  const [errores, setErrores] = useState({})

  // Un solo manejador para todos los campos: usa el atributo "name" de cada input.
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value })

  // Devuelve un objeto con los errores encontrados ({} si todo está bien).
  const validar = () => {
    const e = {}
    if (datos.nombre.trim().length < 3) e.nombre = 'El nombre debe tener al menos 3 caracteres.'
    if (datos.categoria.trim() === '') e.categoria = 'Indica una categoría.'
    if (datos.precio === '' || Number(datos.precio) <= 0) e.precio = 'Ingresa un precio mayor a 0.'
    if (datos.descripcion.trim().length < 10) e.descripcion = 'La descripción debe tener al menos 10 caracteres.'
    return e
  }

  const enviar = (evento) => {
    evento.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    // Se avisa al componente padre (App), que es quien guarda la lista.
    onAgregar({
      nombre: datos.nombre.trim(),
      categoria: datos.categoria.trim(),
      precio: Number(datos.precio),
      descripcion: datos.descripcion.trim(),
      imagen: datos.imagen,
    })
    setDatos({ ...VACIO, imagen: imagenes[0].valor })
  }

  // Ayuda para no repetir el código de cada campo con su mensaje de error
  const clase = (campo) => `form-control ${errores[campo] ? 'is-invalid' : ''}`

  return (
    <form onSubmit={enviar} noValidate className="card contact-card">
      <div className="card-body p-4">
        <h2 className="h5 mb-3">Agregar videojuego</h2>

        <div className="mb-3">
          <label htmlFor="nuevoNombre" className="form-label">Nombre</label>
          <input id="nuevoNombre" name="nombre" className={clase('nombre')} value={datos.nombre} onChange={cambiar} />
          <div className="invalid-feedback">{errores.nombre}</div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-sm-6">
            <label htmlFor="nuevaCategoria" className="form-label">Categoría</label>
            <input
              id="nuevaCategoria"
              name="categoria"
              className={clase('categoria')}
              list="listaCategorias"
              placeholder="Ej: Acción"
              value={datos.categoria}
              onChange={cambiar}
            />
            <datalist id="listaCategorias">
              {categorias.map((c) => <option key={c} value={c} />)}
            </datalist>
            <div className="invalid-feedback">{errores.categoria}</div>
          </div>
          <div className="col-sm-6">
            <label htmlFor="nuevoPrecio" className="form-label">Precio (CLP)</label>
            <input id="nuevoPrecio" name="precio" type="number" min="1" className={clase('precio')} value={datos.precio} onChange={cambiar} />
            <div className="invalid-feedback">{errores.precio}</div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="nuevaDescripcion" className="form-label">Descripción</label>
          <textarea id="nuevaDescripcion" name="descripcion" rows="3" className={clase('descripcion')} value={datos.descripcion} onChange={cambiar} />
          <div className="invalid-feedback">{errores.descripcion}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="nuevaImagen" className="form-label">Portada</label>
          <select id="nuevaImagen" name="imagen" className="form-select" value={datos.imagen} onChange={cambiar}>
            {imagenes.map((img) => <option key={img.valor} value={img.valor}>{img.texto}</option>)}
          </select>
        </div>

        <button className="btn btn-gamer" type="submit"><i className="bi bi-plus-circle"></i> Agregar al catálogo</button>
      </div>
    </form>
  )
}
