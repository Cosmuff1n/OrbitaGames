import { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { actions } from "../../data/storeActions.js";
export default function AdminCategories() {
  const { data, run } = useApp();
  /* Estado local name: useState guarda el valor y su setter provoca una actualización de la interfaz. */
  const [name, setName] = useState("");
  /* ID del registro en edición; null significa que estamos creando. */
  const [editing, setEditing] = useState(null);
  /* Manejador del envío: cancela la recarga HTML, valida o ejecuta la operación y procesa el resultado. */
  function submit(e) {
    e.preventDefault();
    const ok = run(
      (estado) => actions.saveCategory(estado, name, editing),
      "Categoría guardada.",
    );
    if (ok) {
      setName("");
      setEditing(null);
    }
  }
  return (
    <>
      <h1>Categorías</h1>
      <p className="text-secondary">
        Clasifica productos y evita categorías duplicadas.
      </p>
      <form onSubmit={submit} className="panel">
        <label className="form-label">
          {editing ? "Editar categoría" : "Nueva categoría"}
          <input
            className="form-control"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button className="btn btn-primary" type="submit">
          {editing ? "Guardar" : "Agregar"}
        </button>
        {editing && (
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={() => {
              setEditing(null);
              setName("");
            }}
          >
            Cancelar
          </button>
        )}
      </form>
      <div className="row g-3">
        {data.categories.map((categoria) => (
          <div key={categoria} className="col-12 col-md-6">
            <div className="actions panel">
              <div>
                <b>{categoria}</b>
                <small className="text-secondary">
                  {data.products.filter((p) => p.category == categoria).length}{" "}
                  productos
                </small>
              </div>
              <div className="actions">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => {
                    setEditing(categoria);
                    setName(categoria);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    if (window.confirm("Eliminar categoría?"))
                      run((estado) => actions.deleteCategory(estado, categoria));
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
