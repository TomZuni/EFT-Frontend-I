// Botones para filtrar por categoría.
// Props: categorias (lista de textos), activa (categoría elegida)
//        y onCambiar (función que avisa al padre qué categoría se eligió).
export default function FiltroCategorias({ categorias, activa, onCambiar }) {
  return (
    <div className="filtros mb-4" role="group" aria-label="Filtrar por categoría">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          type="button"
          className={`btn btn-outline-gamer ${categoria === activa ? 'active' : ''}`}
          aria-pressed={categoria === activa}
          onClick={() => onCambiar(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  )
}
