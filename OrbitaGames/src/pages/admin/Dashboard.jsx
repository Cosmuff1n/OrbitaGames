import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext.jsx";

// Resumen mínimo. Los cálculos de ventas se consultan en Reportes.
export default function Dashboard() {
  const { data } = useApp();
  return (
    <>
      <h1>Administración</h1>
      <p>Desde aquí puedes mantener los datos de la tienda.</p>
      <ul>
        <li>
          <Link to="/admin/productos">Productos: {data.products.length}</Link>
        </li>
        <li>
          <Link to="/admin/categorias">
            Categorías: {data.categories.length}
          </Link>
        </li>
        <li>
          <Link to="/admin/usuarios">Usuarios: {data.users.length}</Link>
        </li>
        <li>
          <Link to="/admin/pedidos">Pedidos: {data.orders.length}</Link>
        </li>
      </ul>
    </>
  );
}
