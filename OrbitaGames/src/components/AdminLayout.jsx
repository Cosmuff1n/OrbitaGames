import { NavLink, Outlet } from "react-router-dom";
const links = [
  ["/admin", "Resumen"],
  ["/admin/productos", "Productos"],
  ["/admin/categorias", "Categorías"],
  ["/admin/usuarios", "Usuarios"],
  ["/admin/pedidos", "Pedidos"],
  ["/admin/reportes", "Reportes"],
  ["/admin/perfil", "Perfil"],
];

// Menú, Outlet pone la sección administrativa de la URL.
export default function AdminLayout() {
  return (
    <>
      <nav className="admin-menu" aria-label="Administración">
        {links.map(([url, label]) => (
          <NavLink key={url} to={url} end={url == "/admin"}>
            {label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </>
  );
}
