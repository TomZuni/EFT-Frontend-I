// =====================================================
// Formulario de contacto: validación con JavaScript
// Se valida ANTES de enviar. Si hay errores se marcan los
// campos y se muestra un mensaje; si todo está bien, se
// muestra la confirmación.
// =====================================================

const formulario = document.getElementById("formContacto");
const campoNombre = document.getElementById("nombre");
const campoCorreo = document.getElementById("correo");
const campoMensaje = document.getElementById("mensaje");
const respuesta = document.getElementById("respuestaFormulario");

// Expresión regular simple para correos: algo@dominio.ext
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Cada función devuelve un texto de error, o "" si el campo es válido
function validarNombre(valor) {
  if (valor === "") return "El nombre es obligatorio.";
  if (valor.length < 3) return "El nombre debe tener al menos 3 caracteres.";
  return "";
}

function validarCorreo(valor) {
  if (valor === "") return "El correo es obligatorio.";
  if (!REGEX_CORREO.test(valor)) return "Ingresa un correo válido, por ejemplo nombre@correo.cl.";
  return "";
}

function validarMensaje(valor) {
  if (valor === "") return "El mensaje es obligatorio.";
  if (valor.length < 10) return "El mensaje debe tener al menos 10 caracteres.";
  return "";
}

// Marca el campo en rojo (o lo deja normal) y escribe el error debajo
function mostrarError(campo, textoError) {
  const caja = document.getElementById("error" + campo.id.charAt(0).toUpperCase() + campo.id.slice(1));
  caja.textContent = textoError;
  campo.classList.toggle("is-invalid", textoError !== "");
  return textoError === "";
}

function mostrarMensaje(texto, tipo) {
  respuesta.innerHTML = "";
  const alerta = document.createElement("div");
  alerta.className = "alert alert-" + tipo + " mb-0";
  alerta.textContent = texto;
  respuesta.appendChild(alerta);
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que la página se recargue

  // Se validan todos los campos (sin cortar al primer error)
  const nombreOk = mostrarError(campoNombre, validarNombre(campoNombre.value.trim()));
  const correoOk = mostrarError(campoCorreo, validarCorreo(campoCorreo.value.trim()));
  const mensajeOk = mostrarError(campoMensaje, validarMensaje(campoMensaje.value.trim()));

  if (!nombreOk || !correoOk || !mensajeOk) {
    mostrarMensaje("Revisa los campos marcados en rojo antes de enviar.", "danger");
    return;
  }

  mostrarMensaje("Gracias, " + campoNombre.value.trim() + ". Tu mensaje fue enviado correctamente.", "success");
  formulario.reset();
});

// Mientras el usuario corrige un campo, se quita el error de ese campo
[campoNombre, campoCorreo, campoMensaje].forEach(function (campo) {
  campo.addEventListener("input", function () {
    if (campo.classList.contains("is-invalid")) {
      campo.classList.remove("is-invalid");
    }
  });
});
