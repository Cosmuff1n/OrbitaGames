/**
 * vite.config.js
 * Configuración de Vite: habilita el plugin de React para compilar y servir componentes JSX.
 *
 * GUÍA DE LECTURA: los comentarios explican intención y flujo, no sustituyen las validaciones.
 * NOTA: inicio de sesión, pagos y datos son demostrativos, sin backend real.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
/* Define el plugin que permite a Vite procesar los componentes React (JSX). */
export default defineConfig({
  plugins: [react()]
});
