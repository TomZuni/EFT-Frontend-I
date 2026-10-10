// Tarjeta de UN videojuego (componente reutilizable).
// Props: juego (datos) y onEliminar (función que recibe el id a borrar).
import { formatoPrecio, rutaImagen } from '../utils.js'

export default function TarjetaVideojuego({ juego, onEliminar }) {
  return (
    <article className="card card-producto h-100">
      <img src={rutaImagen(juego.imagen)} className="card-img-top producto-img" alt={`Portada de ${juego.nombre}`} />
      <div className="card-body d-flex flex-column">
        <span className="badge text-bg-secondary align-self-start mb-2">{juego.categoria}</span>
        <h3 className="h5 card-title">{juego.nombre}</h3>
        <p className="card-text text-body-secondary">{juego.descripcion}</p>
        <p className="precio mt-auto mb-3">{formatoPrecio(juego.precio)}</p>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={() => onEliminar(juego.id)}
          aria-label={`Eliminar ${juego.nombre}`}
        >
          <i className="bi bi-trash3"></i> Eliminar
        </button>
      </div>
    </article>
  )
}
