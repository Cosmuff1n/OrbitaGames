import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import ProductList from "../components/ProductList.jsx";

export default function Home() {
  const { data } = useApp();
  const featured = data.products.filter(product => product.featured);

  return (
    <section className="anime-section">
      <h1 className="section-title my-3">Productos destacados</h1>
      <ProductList products={featured} />
      <p className="mt-3">
        <Link className="btn btn-warning" to="/productos">Ver catálogo completo</Link>
      </p>
    </section>
  );
}
