import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { Field, SectionTitle } from "../components/Ui.jsx";
export default function Login() {
  const { login } = useApp();
  /* Función de React Router para enviar al usuario a otra ruta. */
  const navigate = useNavigate();
  /* Estado local email: useState guarda el valor y su setter provoca una actualización de la interfaz. */
  const [email, setEmail] = useState("");
  /* Estado local password: useState guarda el valor y su setter provoca una actualización de la interfaz. */
  const [password, setPassword] = useState("");
  /* Mensaje de validación que se presenta cerca del formulario. */
  const [error, setError] = useState("");
  /* Controla si la contraseña se muestra como texto o está oculta. */
  const [show, setShow] = useState(false);
  /* Manejador del envío: cancela la recarga HTML, valida o ejecuta la operación y procesa el resultado. */
  function submit(event) {
    event.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate(result.role == "admin" ? "/admin" : "/");
  }
  return (
    <div className="row">
      <div className="col-12 col-md-8 col-lg-5">
        <SectionTitle
          title="Iniciar sesión"
          subtitle="Acceso demostrativo para la evaluación; no hay autenticación real."
        />

        <form className="panel" onSubmit={submit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div>
            <Field
              label="Correo"
              type="email"
              required
              value={email}
              onChange={setEmail}
              placeholder="nombre@correo.cl"
            />
          </div>
          <div>
            <Field
              label="Contraseña"
              type={show ? "text" : "password"}
              required
              minLength={4}
              value={password}
              onChange={setPassword}
            />
          </div>
          <label className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={show}
              onChange={(campoSeleccionado) => setShow(campoSeleccionado.target.checked)}
            />
            <span className="form-check-label">Mostrar contraseña</span>
          </label>
          <button className="btn btn-primary" type="submit">
            Ingresar
          </button>
          <p className="text-secondary">
            Administrador de prueba: <code>admin@orbita.demo</code> /{" "}
            <code>Demo1234</code>. Para cliente, cualquier correo válido y
            contraseña de al menos 4 caracteres. No uses una contraseña real.
          </p>
          <p>
            ¿Sin cuenta?{" "}
            <Link to="/registro">Crear cuenta de testeo</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
