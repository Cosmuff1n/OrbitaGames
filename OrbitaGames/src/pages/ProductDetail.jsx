import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { actions, discountedPrice, formatPrice } from "../data/storeActions.js";
export default function ProductDetail() {
  const { id } = useParams();
  const { data, run } = useApp();
  const p = data.products.find((producto) => producto.id == Number(id));
  /* Cantidad seleccionada por el cliente antes de añadir al carrito. */
  const [qty, setQty] = useState(1);
  if (!p)
    return (
      <div className="panel">
        Producto no encontrado. <Link to="/productos">Volver al catálogo</Link>
      </div>
    );
  return (
    <>
      <Link to="/productos" className="text-secondary">
        ← Volver a productos
      </Link>
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <img
            key={p.id}
            src={p.icon.startsWith("/") ? p.icon : "/" + p.icon} alt={p.name}
            className="img-fluid rounded"
            style={{ width: "100%", maxHeight: "420px", objectFit: "contain" }}
            onError={(evento) => {
              evento.currentTarget.style.display = "none";
              evento.currentTarget.insertAdjacentText("afterend", "Imagen no encontrada: " + p.icon);
            }}
          />
        </div>
        <div className="col-12 col-md-6">
          <span>{p.category}</span>
          <h1>{p.name}</h1>
          <p className="text-secondary">{p.description}</p>
          <div>{formatPrice(discountedPrice(p))}</div>
          {p.discount > 0 && (
            <p className="text-secondary">
              Precio original <del>{formatPrice(p.price)}</del> · {p.discount}%
              descuento
            </p>
          )}
          <p>
            Disponibles: <b>{p.stock}</b>
          </p>
          <div className="actions">
            <label className="form-label">
              Cantidad
              <input
                aria-label="Cantidad"
                type="number"
                min="1"
                max={p.stock}
                className="form-control"
                style={{
                  maxWidth: 100,
                }}
                value={qty}
                onChange={(itemCambiado) => setQty(itemCambiado.target.value)}
              />
            </label>
            <button
              className="btn btn-primary"
              disabled={!p.stock}
              onClick={() =>
                run(
                  (estado) => actions.addToCart(estado, p.id, qty),
                  "Producto agregado al carrito.",
                )
              }
            >
              Añadir al carrito
            </button>
          </div>
          <small className="text-secondary">
            Compra de demostración para un trabajo de la u, no es de a deveras xD.
          </small>
        </div>
      </div>
    </>
  );
}
