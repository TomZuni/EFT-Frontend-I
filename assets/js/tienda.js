// =====================================================
// Catálogo dinámico: manipulación del DOM
//  - Genera las tarjetas recorriendo el objeto `videojuegos`
//  - Genera los botones de categoría
//  - Filtra por categoría y actualiza la pantalla
// Requiere que datos.js se cargue antes.
// =====================================================

const contenedorTarjetas = document.getElementById("listaVideojuegos");
const contenedorFiltros = document.getElementById("filtrosCategoria");
const contador = document.getElementById("contadorResultados");

let categoriaActiva = "Todos";

// Da formato de peso chileno: 39990 -> "$39.990"
function formatearPrecio(numero) {
  return "$" + numero.toLocaleString("es-CL");
}

// Crea (sin innerHTML) la tarjeta de Bootstrap de un videojuego
function crearTarjeta(juego) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "card card-producto h-100";

  const imagen = document.createElement("img");
  imagen.className = "card-img-top producto-img";
  imagen.src = juego.imagen;
  imagen.alt = "Portada de " + juego.nombre;
  imagen.loading = "lazy";

  const cuerpo = document.createElement("div");
  cuerpo.className = "card-body d-flex flex-column";

  const etiqueta = document.createElement("span");
  etiqueta.className = "badge text-bg-secondary align-self-start mb-2";
  etiqueta.textContent = juego.categoria;

  const titulo = document.createElement("h3");
  titulo.className = "h5 card-title";
  titulo.textContent = juego.nombre;

  const descripcion = document.createElement("p");
  descripcion.className = "card-text text-body-secondary";
  descripcion.textContent = juego.descripcion;

  const precio = document.createElement("p");
  precio.className = "precio mt-auto mb-0";
  precio.textContent = formatearPrecio(juego.precio);

  cuerpo.append(etiqueta, titulo, descripcion, precio);
  tarjeta.append(imagen, cuerpo);
  return tarjeta;
}

// Dibuja en pantalla la lista de juegos recibida
function mostrarVideojuegos(lista) {
  contenedorTarjetas.innerHTML = ""; // limpia lo anterior

  if (lista.length === 0) {
    const aviso = document.createElement("div");
    aviso.className = "alert alert-warning";
    aviso.style.gridColumn = "1 / -1";
    aviso.textContent = "No hay videojuegos en esta categoría.";
    contenedorTarjetas.appendChild(aviso);
  } else {
    lista.forEach(function (juego) {
      contenedorTarjetas.appendChild(crearTarjeta(juego));
    });
  }

  contador.textContent = "Mostrando " + lista.length + " de " + videojuegos.length + " videojuegos";
}

// Filtra por categoría y actualiza tarjetas y botones
function filtrarPorCategoria(categoria) {
  categoriaActiva = categoria;
  const filtrados = categoria === "Todos"
    ? videojuegos
    : videojuegos.filter(function (juego) { return juego.categoria === categoria; });

  mostrarVideojuegos(filtrados);
  marcarBotonActivo();
}

// Resalta el botón de la categoría seleccionada
function marcarBotonActivo() {
  contenedorFiltros.querySelectorAll("button").forEach(function (boton) {
    const activo = boton.dataset.categoria === categoriaActiva;
    boton.classList.toggle("active", activo);
    boton.setAttribute("aria-pressed", activo);
  });
}

// Crea un botón por cada categoría distinta del objeto + "Todos"
function crearFiltros() {
  const categorias = ["Todos"];
  videojuegos.forEach(function (juego) {
    if (!categorias.includes(juego.categoria)) categorias.push(juego.categoria);
  });

  categorias.forEach(function (categoria) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn btn-outline-gamer";
    boton.textContent = categoria;
    boton.dataset.categoria = categoria;
    boton.addEventListener("click", function () { filtrarPorCategoria(categoria); });
    contenedorFiltros.appendChild(boton);
  });
}

// Inicio: se ejecuta cuando el HTML ya está cargado
document.addEventListener("DOMContentLoaded", function () {
  crearFiltros();
  filtrarPorCategoria("Todos");
});
