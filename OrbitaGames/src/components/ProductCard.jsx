import { Link } from "react-router-dom";
import { discountedPrice, formatPrice } from "../data/prices.js";

// Tarjeta basada en el css del bootstrap descargado
export default function ProductCard({ product, onAdd }) {
  return (
    <article className="anime-card">
      <div className="cover-container">
        <img src={product.icon} alt={product.name} />
        <button className="play-button btn btn-warning btn-sm" disabled={product.stock == 0}
          onClick={() => onAdd(product.id)}>{product.stock == 0 ? "Agotado" : "🛒 Añadir"}</button>
      </div>
      <div className="anime-info">
        <h3><Link to={"/productos/" + product.id}>{product.name}</Link></h3>
        <div className="genres">{product.category}</div>
        <div className="stats"><b>Precio:</b> {formatPrice(discountedPrice(product))}</div>
        {product.discount > 0 && <div className="stats">Oferta: {product.discount}%</div>}
        <div className="desc">{product.description}</div>
      </div>
    </article>
  );
}
