import { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { actions } from "../../data/storeActions.js";
import { Field } from "../../components/Ui.jsx";
/* Plantilla de campos iniciales para restablecer el formulario. */
const blank = {
  name: "",
  email: "",
  role: "cliente",
};
export default function AdminUsers() {
  const { data, run } = useApp();
  /* ID del registro en edición; null significa que estamos creando. */
  const [editing, setEditing] = useState(null);
  /* Estado del formulario: cada campo tiene un valor controlado por React. */
  const [form, setForm] = useState(blank);
  const set = (k, v) =>
    setForm((previous) => {
      // Copiamos el formulario anterior sin modificar directamente el estado.
      const updated = structuredClone(previous);
      updated[k] = v;
      return updated;
    });
  const clear = () => {
    setEditing(null);
    setForm(blank);
  };
  /* Manejador del envío: cancela la recarga HTML, valida o ejecuta la operación y procesa el resultado. */
  function submit(e) {
    e.preventDefault();
    if (run((estado) => actions.saveUser(estado, form, editing), "Usuario guardado."))
      clear();
  }
  return (
    <>
      <h1>Usuarios</h1>
      <p className="text-secondary">
        CRUD de perfiles de prueba. No son cuentas reales con contraseña.
      </p>
      <form className="panel" onSubmit={submit}>
        <h2 className="h5">{editing ? "Editar perfil" : "Crear perfil"}</h2>
        <div className="row g-3">
          <div className="col-12 col-md-5">
            <Field
              label="Nombre"
              required
              value={form.name}
              onChange={(v) => set("name", v)}
            />
          </div>
          <div className="col-12 col-md-5">
            <Field
              label="Correo"
              type="email"
              required
              value={form.email}
              onChange={(v) => set("email", v)}
            />
          </div>
          <div className="col-12 col-md-2">
            <Field
              label="Rol"
              as="select"
              options={["cliente", "admin"]}
              value={form.role}
              onChange={(v) => set("role", v)}
            />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Guardar
        </button>
        {editing && (
          <button
            className="btn btn-outline-primary"
            onClick={clear}
            type="button"
          >
            Cancelar
          </button>
        )}
      </form>
      <div className="table-responsive panel">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      setEditing(u.id);
                      setForm(structuredClone(u));
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      if (window.confirm("¿Eliminar perfil?"))
                        run((estado) => actions.deleteUser(estado, u.id));
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
