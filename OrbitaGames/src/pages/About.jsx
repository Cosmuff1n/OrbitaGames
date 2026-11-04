import { Link } from "react-router-dom";
import { SectionTitle } from "../components/Ui.jsx";
export default function About() {
  return (
    <>
      <SectionTitle
        title="Vendemos juegos y consolas"
        subtitle="Orbita Games es una marca ficticia creada para un trabajo de la u, no vendemos juegos enserio xd."
      />
      <div className="row g-4">
        <div className="col-12 col-md-7">
          <div className="panel">
            <h2 className="h4">Nuestra propuesta</h2>
            <p>
              Nos apasionan los videojuegos y queremos que encontrar tu próxima
              aventura sea fácil. Explora nuestro catálogo, descubre los últimos lanzamientos,
              revisa nuestras ofertas y encuentra ese juego que llevas tiempo buscando.
            </p>
            <p className="text-secondary">
              Desde grandes aventuras hasta títulos para disfrutar con amigos,
              tenemos opciones para cada tipo de jugador.
            </p>
            <Link to="/productos" className="btn btn-primary">
              Explorar catálogo
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-5">
          <div className="panel">
            <h2 className="h4">¿Por qué elegirnos?</h2>
            <ul>
              <li>Variedad de videojuegos y géneros</li>
              <li>Últimos lanzamientos y clásicos</li>
              <li>Ofertas y descuentos especiales</li>
              <li>Información detallada de cada juego</li>
              <li>Compra fácil y rápida</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
