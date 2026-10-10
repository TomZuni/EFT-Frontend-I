# Tienda Gamer – Evaluación Final Transversal (EFT)

**Curso:** Desarrollo Frontend I (PFY2201) · Duoc UC
**Alumno:** Tomás Zúñiga

Sitio web de una tienda online de videojuegos. Reúne todo lo visto en el curso: **HTML5 semántico, CSS3 (Flexbox y Grid), Bootstrap 5, JavaScript (manipulación del DOM) y React**.

## ¿Qué incluye?

| Parte | Archivos | Qué hace |
|---|---|---|
| **Inicio** | `index.html`, `assets/js/datos.js`, `assets/js/tienda.js` | Muestra los videojuegos en tarjetas (imagen, nombre, categoría, descripción y precio) generadas con JavaScript a partir de un objeto. Incluye filtro por categoría. |
| **Contacto** | `contacto.html`, `assets/js/contacto.js` | Formulario con nombre, correo y mensaje. Valida antes de enviar y muestra errores por campo. |
| **Panel React** | `react-app/` (código) y `react/` (versión compilada) | Aplicación dividida en componentes: lista de videojuegos, filtro, formulario para **agregar** juegos, botón para **eliminar**, y formulario de contacto. |
| **Estilos** | `assets/css/estilos.css` | Estilos propios sobre Bootstrap (Flexbox, CSS Grid y media queries). |

## Cómo se cumple cada requisito

- **HTML semántico:** `header`, `nav`, `main`, `section`, `article`, `footer`, además de `label` en todos los campos y `aria-*` en filtros y mensajes.
- **Flexbox y CSS Grid:** el catálogo usa `display: grid` con `auto-fill`; los filtros, la portada y el pie de página usan `display: flex`; la franja de beneficios es una grilla de 3 columnas que pasa a 1 en móvil.
- **Bootstrap 5:** barra de navegación con menú hamburguesa, tarjetas (`card`), formularios, botones, insignias (`badge`), alertas y sistema de contenedores.
- **JavaScript:** el arreglo `videojuegos` (`datos.js`) guarda nombre, categoría, precio, descripción e imagen. `tienda.js` lo recorre y crea las tarjetas con `createElement`; los botones de categoría también se generan desde los datos. `contacto.js` valida campos vacíos, largo mínimo y formato del correo.
- **React:** componentes `Navbar`, `FiltroCategorias`, `ListaVideojuegos`, `TarjetaVideojuego`, `FormularioVideojuego` y `FormularioContacto`.
  - **State (`useState`)** en `App.jsx`: lista de videojuegos, categoría activa, estado de carga y error.
  - **Props:** `App` pasa datos y funciones a los hijos (por ejemplo `onEliminar`, `onAgregar`, `onCambiar`), de modo que filtrar, agregar o eliminar en un componente actualiza la lista de otro.
  - **useEffect:** carga `juegos.json` (archivo externo) y guarda el catálogo en el navegador para que los cambios no se pierdan al recargar.

## Estructura del proyecto

```
.
├── index.html                 Página de inicio (catálogo)
├── contacto.html              Página de contacto
├── assets/
│   ├── css/estilos.css        Estilos propios
│   ├── js/datos.js            Objeto con los videojuegos
│   ├── js/tienda.js           Tarjetas dinámicas y filtro por categoría
│   ├── js/contacto.js         Validación del formulario
│   └── img/                   Imágenes de los juegos
├── react/                     Panel React ya compilado (se abre desde la navegación)
└── react-app/                 Código fuente de React (Vite)
    ├── public/juegos.json     Datos que carga React
    └── src/
        ├── App.jsx            Estado principal
        ├── utils.js           Funciones de ayuda
        └── components/        Navbar, FiltroCategorias, ListaVideojuegos,
                               TarjetaVideojuego, FormularioVideojuego, FormularioContacto
```

## Instalación y uso

### Opción A: ver el sitio (no requiere instalar nada)

Se necesita conexión a internet, porque Bootstrap se carga desde un CDN.

1. Abre la carpeta del proyecto en **Visual Studio Code**.
2. Instala la extensión **Live Server** y haz clic en **Go Live** (clic derecho sobre `index.html` → *Open with Live Server*).
3. Navega con el menú: **Inicio**, **Catálogo**, **Contacto** y **Panel React**.

> El Panel React necesita un servidor (como Live Server) porque lee `juegos.json`. Si lo abres con doble clic en el archivo, el navegador bloquea la carga. Alternativa sin Live Server: ejecutar `python -m http.server 8000` en la carpeta y abrir `http://localhost:8000`.

### Opción B: modificar la aplicación React

Requiere [Node.js](https://nodejs.org) 18 o superior.

```bash
cd react-app
npm install        # instala las dependencias
npm run dev        # modo desarrollo en http://localhost:5173
npm run build      # compila y actualiza la carpeta ../react
```

### Publicar en GitHub Pages

1. Sube el proyecto a un repositorio público (rama `main`).
2. En GitHub: **Settings → Pages → Branch: `main` / carpeta `/ (root)`** y guarda.
3. El sitio queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/` y el Panel React en `.../react/`.

## Cómo probar las funcionalidades

1. **Filtro:** en *Inicio*, pulsa **Acción**, **Deportes** o **Colecciones**; las tarjetas cambian y el contador se actualiza.
2. **Validación (JavaScript):** en *Contacto*, envía el formulario vacío (aparecen errores rojos), luego con un correo mal escrito, y por último con datos correctos (mensaje de éxito).
3. **Agregar (React):** en el *Panel React*, completa *Agregar videojuego*; la tarjeta aparece al instante y su categoría se suma al filtro.
4. **Eliminar (React):** pulsa **Eliminar** en una tarjeta. **Restablecer catálogo** vuelve a los datos originales de `juegos.json`.

## Responsividad y compatibilidad

El diseño se probó en escritorio (1280 px) y móvil (390 px) sin desplazamiento horizontal: el menú se convierte en hamburguesa, el catálogo se reacomoda con CSS Grid y la franja de beneficios pasa a una columna. Se utilizó Chromium; el sitio usa solo características estándar compatibles con las versiones actuales de Chrome, Edge y Firefox.

## Tecnologías

HTML5 · CSS3 · JavaScript (ES6) · Bootstrap 5.3 · Bootstrap Icons · React 19 · Vite
