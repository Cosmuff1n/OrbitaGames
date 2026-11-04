import { useState } from "react";
import { Field, SectionTitle } from "../components/Ui.jsx";
export default function Contact() {
  /* Estado del formulario: cada campo tiene un valor controlado por React. */
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  /* Bandera que indica si el formulario de contacto mostró su confirmación. */
  const [sent, setSent] = useState(false);
  const set = (k, v) => {
    setForm((previous) => {
      // Copiamos el formulario anterior sin modificar directamente el estado.
      const updated = structuredClone(previous);
      updated[k] = v;
      return updated;
    });
    setSent(false);
  };
  /* Manejador del envío: cancela la recarga HTML, valida o ejecuta la operación y procesa el resultado. */
  function submit(e) {
    e.preventDefault();
    setSent(true);
  }
  return (
    <div className="row g-4">
      <div className="col-12 col-lg-7">
        <SectionTitle
          title="Escríbenos"
          subtitle="Formulario académico: no envía correos reales."
        />

        <form className="panel" onSubmit={submit}>
          {sent && (
            <div className="alert alert-success" role="status">
              Mensaje de prueba validado correctamente. No se envió a ningún
              servidor.
            </div>
          )}
          <div>
            <Field
              label="Nombre"
              required
              value={form.name}
              onChange={(v) => set("name", v)}
            />
          </div>
          <div>
            <Field
              label="Correo"
              required
              type="email"
              value={form.email}
              onChange={(v) => set("email", v)}
            />
          </div>
          <div>
            <Field
              label="Mensaje"
              as="textarea"
              required
              rows={5}
              value={form.message}
              onChange={(v) => set("message", v)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Validar mensaje
          </button>
        </form>
      </div>
      <div className="col-12 col-lg-5">
        <div className="panel">
          <h2 className="h4">Atención de demostración</h2>
          <p>
            Esto es solo una demo, no hay contactos de verdad
          </p>
        </div>
      </div>
    </div>
  );
}
