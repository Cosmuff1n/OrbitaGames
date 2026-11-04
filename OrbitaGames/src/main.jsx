import React from "react";
import { createRoot } from "react-dom/client";
/* Primero cargamos los estilos de Bootstrap para disponer de su grilla y controles*/
import "bootstrap/dist/css/bootstrap.min.css";
/* Después cargamos estilos propios; pueden personalizar las clases visuales anteriores*/
import "./styles.css";
import "./AnimeRoll.css";
import "./anime-adaptacion.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
