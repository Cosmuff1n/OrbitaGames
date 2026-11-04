import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { Field, SectionTitle } from "../components/Ui.jsx";
export default function Register() {
  const { register } = useApp();
  /* Función de React Router para enviar al usuario a otra ruta. */
  const navigate = useNavigate();
  /* Estado del formulario: cada campo tiene un valor controlado por React. */
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  /* Mensaje de validación que se presenta cerca del formulario. */
  const [error, setError] = useState("");
  const set = (key, value) =>
    setForm((previous) => {
      // Copiamos el formulario anterior sin modificar directamente el estado.
      const updated = structuredClone(previous);
      updated[key] = value;
      return updated;
    });
  /* Manejador del envío: cancela la recarga HTML, valida o ejecuta la operación y procesa el resultado. */
  function submit(event) {
    event.preventDefault();
    setError("");
    if (form.password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }
    if (register(form)) navigate("/");
    else
      setError(
        "No se pudo crear la cuenta. Revisa los datos o si el correo ya existe.",
      );
  }
  return (
    <div className="row">
      <div className="col-12 col-md-8 col-lg-5">
        <SectionTitle
          title="Crear cuenta"
          subtitle="Registro de prueba almacenado solo en este navegador."
        />

        <form className="panel" onSubmit={submit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div>
            <Field
              label="Nombre completo"
              required
              value={form.name}
              onChange={(v) => set("name", v)}
            />
          </div>
          <div>
            <Field
              label="Correo electrónico"
              type="email"
              required
              value={form.email}
              onChange={(v) => set("email", v)}
            />
          </div>
          <div>
            <Field
              label="Contraseña de prueba"
              type="password"
              required
              minLength={4}
              value={form.password}
              onChange={(v) => set("password", v)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Registrarme
          </button>
          <p className="text-secondary">
            Aún no se guardan datos, a futuro quizá si.
          </p>
          <Link to="/login">Ya tengo una cuenta</Link>
        </form>
      </div>
    </div>
  );
}
