import { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import {
  actions,
  discountedPrice,
  formatPrice,
} from "../../data/storeActions.js";
import { Field } from "../../components/Ui.jsx";
/* Modelo de datos vacío para crear un producto nuevo. */
const empty = {
  name: "",
  category: "Automatización",
  description: "",
  price: "",
  stock: "",
  discount: 0,
  icon: "📦",
  featured: false,
};
export default function AdminProducts() {
  const { data, run } = useApp();
  /* ID del registro en edición; null significa que estamos creando. */
  const [editing, setEditing] = useState(null);
  /* Estado del formulario: cada campo tiene un valor controlado por React. */
  const [form, setForm] = useState(() => {
    const initial = structuredClone(empty);
    initial.category = data.categories[0] || "";
    return initial;
  });
  /* Texto escrito en el buscador; al cambiar activa el filtrado. */
  const [search, setSearch] = useState("");
  const set = (k, v) =>
    setForm((previous) => {
      // Copiamos el formulario anterior sin modificar directamente el estado.
      const updated = structuredClone(previous);
      updated[k] = v;
      return updated;
    });
  const reset = () => {
    setEditing(null);
    const initial = structuredClone(empty);
    initial.category = data.categories[0] || "";
    setForm(initial);
  };
  /* Carga valores existentes en el formulario y activa el modo edición. */
  function edit(p) {
    setEditing(p.id);
    setForm(structuredClone(p));
  }
  /* Manejador del envío: cancela la recarga HTML, valida o ejecuta la operación y procesa el resultado. */
  function submit(e) {
    e.preventDefault();
    const result = run(
      (estado) => actions.saveProduct(estado, form, editing),
      "Producto guardado.",
    );
    if (result) reset();
  }
  return (
    <>
      <h1>Productos</h1>
      <p className="text-secondary">
        Alta, edición, listado y eliminación mediante fuente de datos
        JavaScript.
      </p>
      <form className="panel" onSubmit={submit}>
        <h2 className="h5">{editing ? "Editar producto" : "Nuevo producto"}</h2>
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
              label="Categoría"
              as="select"
              required
              options={data.categories}
              value={form.category}
              onChange={(v) => set("category", v)}
            />
          </div>
          <div className="col-12">
            <Field
              label="Descripción"
              required
              as="textarea"
              rows={2}
              value={form.description}
              onChange={(v) => set("description", v)}
            />
          </div>
          <div className="col-6 col-md-3">
            <Field
              label="Precio CLP"
              type="number"
              min="1"
              required
              value={form.price}
              onChange={(v) => set("price", v)}
            />
          </div>
          <div className="col-6 col-md-3">
            <Field
              label="Stock"
              type="number"
              min="0"
              required
              value={form.stock}
              onChange={(v) => set("stock", v)}
            />
          </div>
          <div className="col-6 col-md-3">
            <Field
              label="Descuento %"
              type="number"
              min="0"
              max="99"
              value={form.discount}
              onChange={(v) => set("discount", v)}
            />
          </div>
          <div className="col-6 col-md-3">
            <Field
              label="Icono (emoji)"
              value={form.icon}
              onChange={(v) => set("icon", v)}
            />
          </div>
        </div>
        <label className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={!!form.featured}
            onChange={(e) => set("featured", e.target.checked)}
          />
          <span className="form-check-label">Destacar en inicio</span>
        </label>
        <button className="btn btn-primary" type="submit">
          {editing ? "Guardar cambios" : "Agregar producto"}
        </button>
        {editing && (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={reset}
          >
            Cancelar
          </button>
        )}
      </form>
      <div className="actions">
        <h2 className="h5">Inventario ({data.products.length})</h2>
        <input
          className="form-control"
          aria-label="Filtrar productos"
          placeholder="Buscar..."
          style={{
            maxWidth: 260,
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="table-responsive panel">
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.products
              .filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.icon} <b>{p.name}</b>
                    <small className="text-secondary">{p.category}</small>
                  </td>
                  <td>{formatPrice(discountedPrice(p))}</td>
                  <td>
                    <span className={p.stock < 10 ? "text-warning" : ""}>
                      {p.stock}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => edit(p)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          if (window.confirm("¿Eliminar producto?"))
                            run(
                              (estado) => actions.deleteProduct(estado, p.id),
                              "Producto eliminado.",
                            );
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
