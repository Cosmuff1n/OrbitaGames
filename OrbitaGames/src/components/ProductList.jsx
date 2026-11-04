import { useApp } from "../context/AppContext.jsx";
import { cartActions } from "../data/cart.js";
import ProductCard from "./ProductCard.jsx";

export default function ProductList({ products }) {
  const { run } = useApp();
  function add(id) { run((data) => cartActions.addToCart(data, id), "Producto añadido al carrito."); }
  if (!products.length) return <p role="status">No hay productos para mostrar.</p>;
  // Grilla sacada del bootstrap descargado
  return <div className="row flex-nowrap overflow-auto">
    {products.map((product) => <div className="col-auto mb-3" key={product.id}>
      <ProductCard product={product} onAdd={add} />
    </div>)}
  </div>;
}
