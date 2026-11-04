import { Link } from "react-router-dom";
import { SectionTitle } from "../components/Ui.jsx";
import { seedArticles } from "../data/storeActions.js";
export default function Blog() {
  return (
    <>
      <SectionTitle
        title="Blog"
        subtitle="Descubre novedades, recomendaciones y consejos del mundo de los videojuegos."
      />
      <div className="row g-3">
        {seedArticles.map((articulo) => (
          <div className="col-12 col-md-6" key={articulo.id}>
            <article className="panel">
              <span>ARTÍCULO {articulo.id}</span>
              <h2 className="h4">{articulo.title}</h2>
              <p className="text-secondary">{articulo.summary}</p>
              <Link to={`/blog/${articulo.id}`} className="btn btn-outline-primary">
                Leer artículo →
              </Link>
            </article>
          </div>
        ))}
      </div>
    </>
  );
}
