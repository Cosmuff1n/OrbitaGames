// Operaciones de cart: reciben datos y devuelven una copia actualizada.
import { clone, required, integer, get } from "./validation.js";
export const cartActions = {
  /* Añade unidades al carrito validando existencia, cantidad entera y stock disponible. */ 
  addToCart(
  state,
  id,
  quantity = 1,
) {
    return clone(state, (estado) => {
      const p = get(estado.products, id, "Producto");
      /* Cantidad seleccionada por el cliente antes de añadir al carrito. */
      const qty = integer(quantity, "Cantidad", 1);
      /* Comprueba si este producto ya estaba agregado en el carrito. */
      const existing = estado.cart.find((producto) => producto.productId == p.id);
      /* Calcula la cantidad final que se desea comprar y la compara con el stock. */
      const requested = (existing?.quantity || 0) + qty;
      if (requested > p.stock)
        throw Error("No hay stock suficiente para esa cantidad.");
      if (existing) existing.quantity = requested;
      else
        estado.cart.push({
          productId: p.id,
          quantity: qty,
        });
    });
  },
  /* Actualiza cantidad; cero elimina la línea y nunca permite superar el stock. */ 
  changeQuantity(
    state,
    id,
    quantity,
  ) {
    return clone(state, (estado) => {
      const line = estado.cart.find((producto) => producto.productId == Number(id));
      if (!line) throw Error("Producto no está en el carrito.");
      const n = integer(quantity, "Cantidad", 0);
      if (n > get(estado.products, id, "Producto").stock)
        throw Error("No hay stock suficiente.");
      if (n == 0) estado.cart = estado.cart.filter((producto) => producto.productId != Number(id));
      else line.quantity = n;
    });
  },
  /* Elimina una línea de carrito correspondiente al ID indicado. */ 
  removeFromCart(
    state,
    id,
  ) {
    return clone(state, (estado) => {
      estado.cart = estado.cart.filter((producto) => producto.productId != Number(id));
    });
  },
  /* Deja vacío el carrito conservando el resto de la información. */ 
  clearCart(
    state,
  ) {
    return clone(state, (estado) => {
      estado.cart = [];
    });
  },
};
