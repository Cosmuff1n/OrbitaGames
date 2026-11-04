// Operaciones de products: reciben datos y devuelven una copia actualizada.
import { clone, required, integer, get } from "./validation.js";
export const productsActions = {
  /* Crea o modifica un producto después de validar sus campos, su categoría y su descuento. */ saveProduct(
  state,
  form,
  id = null,
) {
    return clone(state, (estado) => {       //Normaliza y valida los valores antes de crear o editar el registro. */

      const fields = {
        name: required(form.name, "Nombre"),
        category: required(form.category, "Categoría"),
        description: required(form.description, "Descripción"),
        price: integer(form.price, "Precio", 1),
        stock: integer(form.stock, "Stock"),
        discount: integer(form.discount ?? 0, "Descuento"),
        featured: Boolean(form.featured),
        icon: String(form.icon || "📦"),
      };
      if (fields.discount > 99)
        throw Error("Descuento debe estar entre 0 y 99%.");
      if (!estado.categories.includes(fields.category))
        throw Error("Categoría inválida.");
      if (id != null) Object.assign(get(estado.products, id, "Producto"), fields);
      else
        estado.products.push({
          id: estado.next.product++,
          name: fields.name,
          category: fields.category,
          description: fields.description,
          price: fields.price,
          stock: fields.stock,
          discount: fields.discount,
          featured: fields.featured,
          icon: fields.icon,
        });
    });
  },
  /* Elimina un producto solo si existe y no está actualmente en el carrito. */ deleteProduct(
    state,
    id,
  ) {
    return clone(state, (estado) => {
      get(estado.products, id, "Producto");
      if (estado.cart.some((producto) => producto.productId == Number(id)))
        throw Error("Retira el producto del carrito antes de eliminarlo.");
      estado.products = estado.products.filter((p) => p.id != Number(id));
    });
  },
};
