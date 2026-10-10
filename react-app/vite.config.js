import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El resultado de "npm run build" se guarda en ../react (carpeta del sitio),
// así la página queda en react/index.html y se enlaza desde la navegación.
// base './' hace que las rutas funcionen en cualquier URL (local o GitHub Pages).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { outDir: '../react', emptyOutDir: true },
  server: { fs: { allow: ['..'] } }, // permite importar ../assets/css/estilos.css
})
