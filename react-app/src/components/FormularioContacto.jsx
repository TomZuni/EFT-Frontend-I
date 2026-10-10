// Formulario de contacto en React, con validación antes de enviar.
// Los campos son "controlados": su valor vive en el estado (useState).
import { useState } from 'react'
import { REGEX_CORREO } from '../utils.js'

const VACIO = { nombre: '', correo: '', mensaje: '' }

export default function FormularioContacto() {
  const [datos, setDatos] = useState(VACIO)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(null) // nombre de quien envió, o null

  const cambiar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: undefined }) // quita el error al corregir
  }

  const validar = () => {
    const e = {}
    if (datos.nombre.trim().length < 3) e.nombre = 'El nombre debe tener al menos 3 caracteres.'
    if (!REGEX_CORREO.test(datos.correo.trim())) e.correo = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.'
    if (datos.mensaje.trim().length < 10) e.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
    return e
  }

  const enviar = (evento) => {
    evento.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) {
      setEnviado(null)
      return
    }
    setEnviado(datos.nombre.trim())
    setDatos(VACIO)
  }

  const hayErrores = Object.values(errores).some(Boolean)
  const clase = (campo) => `form-control ${errores[campo] ? 'is-invalid' : ''}`

  return (
    <form onSubmit={enviar} noValidate className="card contact-card">
      <div className="card-body p-4">
        <h2 className="h5 mb-3">Contacta al administrador</h2>

        <div className="mb-3">
          <label htmlFor="contactoNombre" className="form-label">Nombre</label>
          <input id="contactoNombre" name="nombre" className={clase('nombre')} value={datos.nombre} onChange={cambiar} />
          <div className="invalid-feedback">{errores.nombre}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="contactoCorreo" className="form-label">Correo electrónico</label>
          <input id="contactoCorreo" name="correo" type="email" className={clase('correo')} value={datos.correo} onChange={cambiar} />
          <div className="invalid-feedback">{errores.correo}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="contactoMensaje" className="form-label">Mensaje</label>
          <textarea id="contactoMensaje" name="mensaje" rows="4" className={clase('mensaje')} value={datos.mensaje} onChange={cambiar} />
          <div className="invalid-feedback">{errores.mensaje}</div>
        </div>

        <button className="btn btn-gamer" type="submit">Enviar mensaje</button>

        {/* Renderizado condicional: alertas según el resultado de la validación */}
        <div className="mt-3" role="status" aria-live="polite">
          {hayErrores && <div className="alert alert-danger mb-0">Revisa los campos marcados en rojo antes de enviar.</div>}
          {enviado && <div className="alert alert-success mb-0">Gracias, {enviado}. Tu mensaje fue enviado correctamente.</div>}
        </div>
      </div>
    </form>
  )
}
