// Validaciones compartidas y copia del estado antes de modificarlo.
export const clone = (state, change) => {
  const next = structuredClone(state);
  change(next);
  return next;
};

export const required = (value, label) => {
  const v = String(value ?? "").trim();
  if (!v) throw Error(`${label} es obligatorio.`);
  return v;
};

export const integer = (value, label, min = 0) => {
  const n = Number(value);
  if (!Number.isInteger(n) || n < min)
    throw Error(`${label} debe ser un entero válido.`);
  return n;
};

export const get = (items, id, label) => {
  const found = items.find((item) => item.id == Number(id));
  if (!found) throw Error(`${label} no existe.`);
  return found;
};
