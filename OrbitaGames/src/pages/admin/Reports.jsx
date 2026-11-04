import { useApp } from "../../context/AppContext.jsx";
import { formatPrice } from "../../data/storeActions.js";
export default function Reports() {
  const { data } = useApp();
  /* Pedidos exitosos utilizados en los reportes. */
  const success = data.orders.filter((o) => o.status == "pagado");
  /* Pedidos rechazados utilizados en los reportes. */
  const failed = data.orders.filter((o) => o.status == "rechazado");
  /* Productos cuyo stock está por debajo del umbral mostrado en reportes. */
  const low = data.products.filter((p) => p.stock < 10);
  return (
    <>
      <h1>Reportes</h1>
      <p className="text-secondary">
        Indicadores calculados desde la fuente de datos JavaScript.
      </p>
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="panel">
            <span>Ventas simuladas</span>
            <div className="h3">
              {formatPrice(success.reduce((total, pedido) => total + pedido.total, 0))}
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4">
          <div className="panel">
            <span>Pedidos pagados</span>
            <div className="h3">{success.length}</div>
          </div>
        </div>
        <div className="col-6 col-md-4">
          <div className="panel">
            <span>Pagos rechazados</span>
            <div className="h3">{failed.length}</div>
          </div>
        </div>
      </div>
      <div className="panel">
        <h2 className="h5">Productos con stock crítico (menos de 10)</h2>
        {!low.length ? (
          <p>No existen productos críticos.</p>
        ) : (
          <ul>
            {low.map((p) => (
              <li key={p.id}>
                {p.name}: {p.stock} unidades
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
