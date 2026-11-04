import { Link, useParams } from "react-router-dom";
import { seedArticles } from "../data/storeActions.js";
export default function Article() {
  const { id } = useParams();
  const articulo = seedArticles.find((item) => item.id == Number(id));
  if (!articulo)
    return (
      <div className="panel">
        Artículo no encontrado. <Link to="/blog">Volver al blog</Link>
      </div>
    );
  return (
    <div className="row">
      <article className="col-12 col-lg-9">
        <Link to="/blog" className="text-secondary">
          ← Volver al blog
        </Link>
        <div className="panel">
          <span>BLOG - ÓRBITA GAMES</span>
          <h1>{articulo.title}</h1>
          <p>{articulo.summary}</p>
          <p>{articulo.text}</p>
        </div>
      </article>
    </div>
  );
}
