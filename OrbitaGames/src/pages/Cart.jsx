import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import {
  actions,
  cartItems,
  cartTotal,
  discountedPrice,
  formatPrice,
} from "../data/storeActions.js";
import { SectionTitle } from "../components/Ui.jsx";
export default function Cart() {
  const { data, run } = useApp();
  /* Función de React Router para navegar cuando el usuario hace clic. */
  const nav = useNavigate();
  /* Líneas del carrito o pedido con producto y cantidad, para mostrarlas o procesarlas. */
  const lines = cartItems(data);
  return (
    <>
      <SectionTitle
        title="Carrito de compras"
        subtitle="Edita cantidades o elimina productos antes del checkout."
      />
      {!lines.length ? (
        <div className="panel">
          <div>🛒</div>
          <h2>Tu carrito está vacío</h2>
          <Link className="btn btn-primary" to="/productos">
            Ver catálogo
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="table-responsive panel">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((producto) => (
                    <tr key={producto.productId}>
                      <td>
                        <b>
                          <img src={"/" + producto.product.icon.replace(/^\/+/, "")} alt={producto.product.name} width="65" className="me-2 rounded" />
                          {producto.product.name}
                        </b>
                        <small className="text-secondary">
                          {producto.product.category}
                        </small>
                      </td>
                      <td>{formatPrice(discountedPrice(producto.product))}</td>
                      <td>
                        <input
                          type="number"
                          aria-label={`Cantidad ${producto.product.name}`}
                          min="0"
                          max={producto.product.stock}
                          value={producto.quantity}
                          className="form-control"
                          style={{
                            width: 80,
                          }}
                          onChange={(cantidad) =>
                            run(
                              (estado) =>
                                actions.changeQuantity(
                                  estado,
                                  producto.productId,
                                  cantidad.target.value,
                                ),
                              "Cantidad actualizada.",
                            )
                          }
                        />
                      </td>
                      <td>
                        {formatPrice(producto.quantity * discountedPrice(producto.product))}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            run(
                              (estado) => actions.removeFromCart(estado, producto.productId),
                              "Producto eliminado del carrito.",
                            )
                          }
                        >
                          Quitar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-link"
              onClick={() => run(actions.clearCart, "Carrito vaciado.")}
            >
              Vaciar carrito
            </button>
          </div>
          <div className="col-12 col-lg-4">
            <div className="panel">
              <span>RESUMEN</span>
              <h2 className="h4">Tu pedido</h2>
              <div className="actions">
                <span>Productos</span>
                <b>{formatPrice(cartTotal(data))}</b>
              </div>
              <div className="actions">
                <span>Total</span>
                <b>{formatPrice(cartTotal(data))}</b>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => nav("/checkout")}
              >
                Continuar al pago →
              </button>
              <p className="text-secondary">
                No hay operaciones bancarias, esto es solo una demo.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
