import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AppProvider, useApp } from "../context/AppContext.jsx";
import Header from "../components/Header.jsx";
import AdminLayout from "../components/AdminLayout.jsx";
import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Categories from "../pages/Categories.jsx";
import Offers from "../pages/Offers.jsx";
import Cart from "../pages/Cart.jsx";
import Checkout from "../pages/Checkout.jsx";
import OrderResult from "../pages/OrderResult.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import About from "../pages/About.jsx";
import Blog from "../pages/Blog.jsx";
import Article from "../pages/Article.jsx";
import Contact from "../pages/Contact.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import AdminOrders from "../pages/admin/AdminOrders.jsx";
import AdminProducts from "../pages/admin/AdminProducts.jsx";
import AdminCategories from "../pages/admin/AdminCategories.jsx";
import AdminUsers from "../pages/admin/AdminUsers.jsx";
import Reports from "../pages/admin/Reports.jsx";
import Profile from "../pages/admin/Profile.jsx";
/* Comprueba si el usuario ficticio tiene rol admin. Si no, lo lleva al login; no reemplaza autorización de servidor. */
function AdminGuard() {
  const { session } = useApp();
  return session?.role == "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}
/* Vista de respaldo para rutas inexistentes. */
function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <a href="/">Regresar a la tienda</a>
    </div>
  );
}
/* El Provider deja los datos accesibles a todas las rutas; BrowserRouter sincroniza URL y vista. */
export default function AppRoutes() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Header />}>
            <Route index element={<Home />} />
            <Route path="productos" element={<Products />} />
            <Route path="productos/:id" element={<ProductDetail />} />
            <Route path="categorias" element={<Categories />} />
            <Route path="ofertas" element={<Offers />} />
            <Route path="carrito" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="pedido/:id" element={<OrderResult />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
            <Route path="nosotros" element={<About />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<Article />} />
            <Route path="contacto" element={<Contact />} />
            <Route element={<AdminGuard />}>
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="pedidos" element={<AdminOrders />} />
                <Route path="productos" element={<AdminProducts />} />
                <Route path="categorias" element={<AdminCategories />} />
                <Route path="usuarios" element={<AdminUsers />} />
                <Route path="reportes" element={<Reports />} />
                <Route path="perfil" element={<Profile />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
