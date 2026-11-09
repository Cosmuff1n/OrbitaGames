import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Header() {
  const { data, session, logout, notice, clearNotice } = useApp();
  const navigate = useNavigate();
  const quantity = data.cart.reduce((total, item) => total + item.quantity, 0);

  function exit() {
    logout();
    navigate("/");
  }

  return (
    <div className="App">
      <nav className="cr-navbar navbar px-3">
        <div className="container-fluid gap-2">
          <Link to="/" className="navbar-brand">
            <img src="/images/logo.png" alt="" width="150" height="150" /> Orbita games
          </Link>
          <div className="d-flex flex-wrap align-items-center gap-3">
            <NavLink className="nav-link" to="/" end>Inicio</NavLink>
            <NavLink className="nav-link" to="/productos">Productos</NavLink>
            <NavLink className="nav-link" to="/categorias">Categorías</NavLink>
            <NavLink className="nav-link" to="/ofertas">Ofertas</NavLink>
            <Link className="btn btn-outline-warning btn-sm" to="/carrito">🛒 {quantity}</Link>
            {session ? (
              <>
                {session.role == "admin" && <Link className="nav-link" to="/admin">Admin</Link>}
                <button className="btn btn-outline-light btn-sm" onClick={exit}>Salir</button>
              </>
            ) : (
              <Link className="nav-link" to="/login">Ingresar</Link>
            )}
          </div>
        </div>
      </nav>

      <main className="container">
        {notice && (
          <div className={"alert alert-" + notice.type} role="alert">
            {notice.text}
            <button className="btn-close float-end" aria-label="Cerrar aviso" onClick={clearNotice} />
          </div>
        )}
        <Outlet />
      </main>

      <footer className="container py-4">
        <nav className="actions" aria-label="Información">
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
        <small>Orbita Games.</small>
      </footer>
    </div>
  );
}
