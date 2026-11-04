import { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { formatPrice } from "../../data/storeActions.js";
export default function AdminOrders() {
  const { data } = useApp();
  /* Estado del filtro que permite mostrar todos los pedidos o solo un tipo. */
  const [filter, setFilter] = useState("todos");
  const list = data.orders.filter(
    (o) => filter == "todos" || o.status == filter,
  );
  return (
    <>
      <h1>Pedidos / boletas</h1>
      <p className="text-secondary">
        Historial de compras simuladas realizadas en esta tienda.
      </p>
      <label className="form-label">
        Estado
        <select
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="pagado">Pagados</option>
          <option value="rechazado">Rechazados</option>
        </select>
      </label>
      <div className="table-responsive panel">
        <table className="table">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {list.map((o) => (
              <tr key={o.id}>
                <td>
                  <strong>{o.reference}</strong>
                </td>
                <td>
                  {o.customer.name} {o.customer.lastName}
                </td>
                <td>{new Date(o.createdAt).toLocaleDateString("es-CL")}</td>
                <td>
                  <span
                    className={`badge ${o.status == "pagado" ? "text-bg-success" : "text-bg-danger"}`}
                  >
                    {o.status}
                  </span>
                </td>
                <td>{formatPrice(o.total)}</td>
              </tr>
            ))}
            {!list.length && (
              <tr>
                <td colSpan="5">Todavía no hay pedidos de ese estado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
