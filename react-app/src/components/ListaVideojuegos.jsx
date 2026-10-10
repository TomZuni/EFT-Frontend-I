// Lista de videojuegos: recibe los juegos YA filtrados y dibuja una tarjeta por cada uno.
// Props: juegos (lista), onEliminar (función que se pasa a cada tarjeta).
import TarjetaVideojuego from './TarjetaVideojuego.jsx'

export default function ListaVideojuegos({ juegos, onEliminar }) {
  // Renderizado condicional: mensaje si no hay juegos para mostrar
  if (juegos.length === 0) {
    return <div className="alert alert-warning">No hay videojuegos en esta categoría.</div>
  }

  return (
    <div className="grilla-productos">
      {juegos.map((juego) => (
        <TarjetaVideojuego key={juego.id} juego={juego} onEliminar={onEliminar} />
      ))}
    </div>
  )
}
