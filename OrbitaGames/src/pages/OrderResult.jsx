import { Link, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { formatPrice } from "../data/storeActions.js";
export default function OrderResult() {
  const { id } = useParams();
  const { data } = useApp();
  /* Crea el comprobante con código, fecha, cliente, total y estado simulado. */
  const order = data.orders.find((pedido) => pedido.id == Number(id));
  if (!order)
    return (
      <div className="panel">
        Pedido no encontrado. <Link to="/">Inicio</Link>
      </div>
    );
  const ok = order.status == "pagado";
  return (
    <div className="row">
      <div className="col-12 col-lg-8">
        <div className="panel">
          <span>{ok ? "✅" : "⚠️"}</span>
          <h1>{ok ? "¡Compra realizada!" : "No se pudo realizar el pago"}</h1>
          <p className="text-secondary">
            {ok
              ? "Pedido de prueba registrado correctamente."
              : "La simulación rechazó el pago. Puedes volver a intentarlo."}
          </p>
          <p>REFERENCIA {order.reference}</p>
          <h2 className="h5">Cliente y entrega</h2>
          <p>
            {order.customer.name} {order.customer.lastName} ·{" "}
            {order.customer.email}
            <br />
            {order.customer.street}, {order.customer.city},{" "}
            {order.customer.region}
            <br />
            Modalidad: {order.customer.delivery}
          </p>
          <h2 className="h5">Productos</h2>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.lines.map((itemListado) => (
                  <tr key={itemListado.productId}>
                    <td>{itemListado.name}</td>
                    <td>{itemListado.quantity}</td>
                    <td>{formatPrice(itemListado.quantity * itemListado.unitPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="actions">
            <span>Total</span>
            <b>{formatPrice(order.total)}</b>
          </div>
          <div className="actions">
            {ok ? (
              <Link to="/productos" className="btn btn-primary">
                Continuar comprando
              </Link>
            ) : (
              <Link to="/checkout" className="btn btn-primary">
                Volver a intentar
              </Link>
            )}
            <button
              className="btn btn-outline-primary"
              onClick={() => window.print()}
            >
              Imprimir resumen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
