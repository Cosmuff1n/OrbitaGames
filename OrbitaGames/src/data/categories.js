// Operaciones de categories: reciben datos y devuelven una copia actualizada.
import { clone, required, integer, get } from "./validation.js";
export const categoriesActions = {
  /* Crea o renombra categorías; al renombrar actualiza también los productos asociados. */ saveCategory(
  state,
  name,
  previous = null,
) {
    return clone(state, (estado) => {
      const value = required(name, "Categoría");
      if (
        estado.categories.some(
          (categoria) => categoria.toLowerCase() == value.toLowerCase() && categoria != previous,
        )
      )
        throw Error("La categoría ya existe.");
      if (previous) {
        if (!estado.categories.includes(previous))
          throw Error("Categoría no existe.");
        estado.categories = estado.categories.map((categoria) => (categoria == previous ? value : categoria));
        estado.products.forEach((p) => {
          if (p.category == previous) p.category = value;
        });
      } else estado.categories.push(value);
    });
  },
  /* Evita borrar categorías que aún contienen productos. */ deleteCategory(
    state,
    name,
  ) {
    return clone(state, (estado) => {
      if (estado.products.some((p) => p.category == name))
        throw Error("No puedes eliminar una categoría que tiene productos.");
      estado.categories = estado.categories.filter((categoria) => categoria != name);
    });
  },
};
