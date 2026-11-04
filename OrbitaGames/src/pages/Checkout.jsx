import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import {
  actions,
  cartItems,
  cartTotal,
  formatPrice,
} from "../data/storeActions.js";
import { Field, SectionTitle } from "../components/Ui.jsx";
/* Plantilla de campos iniciales para restablecer el formulario. */
const blank = {
  name: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  region: "Metropolitana",
  delivery: "Envío a domicilio",
  notes: "",
};
/* Formulario de compra controlado: reúne datos del cliente y registra una compra simulada. */
export default function Checkout() {
  const { data, run, session } = useApp();
  /* Función de React Router para enviar al usuario a otra ruta. */
  const navigate = useNavigate();
  /* Estado del formulario: cada campo tiene un valor controlado por React. */
  const [form, setForm] = useState(() => {
    // Partimos de los campos vacíos y completamos los datos disponibles.
    const initial = structuredClone(blank);
    initial.name = session?.name || "";
    initial.email = session?.email || "";
    return initial;
  });
  /* Permite simular un pago rechazado para probar ambas rutas del checkout. */
  const [failure, setFailure] = useState(false);
  const set = (k, v) =>
    setForm((previous) => {
      // Copiamos el formulario anterior sin modificar directamente el estado.
      const updated = structuredClone(previous);
      updated[k] = v;
      return updated;
    });
  /* Manejador del envío: cancela la recarga HTML, valida o ejecuta la operación y procesa el resultado. */
  function submit(e) {
    e.preventDefault();
    const next = run(
      (estado) =>
        actions.placeOrder(estado, form, {
          simulateFailure: failure,
        }),
      "Pedido de demostración registrado.",
    );
    if (next) navigate(`/pedido/${next.lastOrderId}`);
  }
  if (!data.cart.length)
    return (
      <div className="panel">
        Carrito vacío. <Link to="/productos">Ir a productos</Link>
      </div>
    );
  return (
    <>
      <SectionTitle
        title="Checkout"
        subtitle="Confirma tus datos para simular un pedido. No uses información real ni de tarjetas."
      />
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <form className="panel" onSubmit={submit}>
            <h2 className="h5">Datos del cliente</h2>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <Field
                  label="Nombre"
                  required
                  value={form.name}
                  onChange={(v) => set("name", v)}
                />
              </div>
              <div className="col-12 col-md-6">
                <Field
                  label="Apellido"
                  required
                  value={form.lastName}
                  onChange={(v) => set("lastName", v)}
                />
              </div>
              <div className="col-12">
                <Field
                  label="Correo electrónico"
                  type="email"
                  required
                  value={form.email}
                  onChange={(v) => set("email", v)}
                />
              </div>
            </div>
            <h2 className="h5">Dirección y entrega</h2>
            <div className="row g-3">
              <div className="col-12">
                <Field
                  label="Calle y número"
                  required
                  value={form.street}
                  onChange={(v) => set("street", v)}
                />
              </div>
              <div className="col-12 col-md-6">
                <Field
                  label="Región"
                  required
                  as="select"
                  options={["Metropolitana", "Valparaíso", "Biobío", "Otras"]}
                  value={form.region}
                  onChange={(v) => set("region", v)}
                />
              </div>
              <div className="col-12 col-md-6">
                <Field
                  label="Comuna"
                  required
                  value={form.city}
                  onChange={(v) => set("city", v)}
                />
              </div>
              <div className="col-12">
                <Field
                  label="Entrega"
                  required
                  as="select"
                  options={["Envío a domicilio", "Retiro en tienda"]}
                  value={form.delivery}
                  onChange={(v) => set("delivery", v)}
                />
              </div>
              <div className="col-12">
                <Field
                  label="Indicaciones (opcional)"
                  as="textarea"
                  rows="2"
                  value={form.notes}
                  onChange={(v) => set("notes", v)}
                />
              </div>
            </div>
            <label className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={failure}
                onChange={(e) => setFailure(e.target.checked)}
              />
              <span className="form-check-label">
                Simulación de pago rechazado
              </span>
            </label>
            <button className="btn btn-primary btn-lg" type="submit">
              Simular pago de {formatPrice(cartTotal(data))}
            </button>
            <p className="text-secondary">
              No hay operaciones bancarias, esto es solo una demo.
            </p>
          </form>
        </div>
        <div className="col-12 col-lg-4">
          <div className="panel">
            <h2 className="h5">Resumen del pedido</h2>
            {cartItems(data).map((itemListado) => (
              <div className="actions" key={itemListado.productId}>
                <span>
                  {itemListado.product.name} × {itemListado.quantity}
                </span>
                <b>
                  {formatPrice(
                    ((itemListado.product.price * (100 - itemListado.product.discount)) / 100) *
                      itemListado.quantity,
                  )}
                </b>
              </div>
            ))}
            <div className="actions">
              <b>Total</b>
              <b>{formatPrice(cartTotal(data))}</b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
