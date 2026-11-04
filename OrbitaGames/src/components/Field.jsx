// Este componente crea inputs, selects y textareas reutilizables.
// Los props son los datos que recibe desde cada formulario.
export default function Field({
  label,
  value,
  onChange,
  as = "input",
  options = [],
  type = "text",
  required = false,
  rows = 3,
  min,
  max,
  minLength,
  placeholder = "",
}) {
  // Si value es null o undefined, ponemos string vacio.
  const text = value ?? "";

  return (
    <label className="field">
      <span>{label}{required ? " *" : ""}</span>

      {/*En un select ponemos una lista de opciones*/}
      {as == "select" ? (
        <select
          className="form-select"
          value={text}
          required={required}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option) => (
            <option
              key={option.value ?? option}
              value={option.value ?? option}
            >
              {option.label ?? option}
            </option>
          ))}
        </select>
      ) : as == "textarea" ? (
        //Para textos largos usamos textarea
        <textarea
          className="form-control"
          value={text}
          required={required}
          rows={rows}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        // Para nombre, correo, números, etc usamos un input normal
        <input
          className="form-control"
          type={type}
          value={text}
          required={required}
          min={min}
          max={max}
          minLength={minLength}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}
