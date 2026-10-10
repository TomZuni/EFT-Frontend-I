// Funciones de ayuda compartidas por varios componentes.

// Da formato de peso chileno: 39990 -> "$39.990"
export const formatoPrecio = (numero) => `$${Number(numero).toLocaleString('es-CL')}`

// Las imágenes locales se guardan como "img/archivo.jpg" (carpeta public).
export const rutaImagen = (ruta) => (ruta.startsWith('http') ? ruta : `${import.meta.env.BASE_URL}${ruta}`)

// Expresión regular simple para validar correos: algo@dominio.ext
export const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
