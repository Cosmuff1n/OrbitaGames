// Operaciones de orders: reciben datos y devuelven una copia actualizada.
import { clone, required, integer, get } from "./validation.js";
import { cartItems, discountedPrice } from "./prices.js";
export const ordersActions = {
  /* Valida datos, genera líneas y total; registra pago simulado. En éxito descuenta stock y vacía carrito*/ placeOrder(
  state,
  form,
  { simulateFailure = false } = {},
) {
    return clone(state, (estado) => {
      if (!estado.cart.length) throw Error("El carrito está vacío.");
      /* Valida y reúne los datos obligatorios del cliente antes de registrar el pedido*/
      const customer = {
        name: required(form.name, "Nombre"),
        lastName: required(form.lastName, "Apellido"),
        email: required(form.email, "Correo"),
        street: required(form.street, "Calle"),
        city: required(form.city, "Comuna"),
        region: required(form.region, "Región"),
        delivery: required(form.delivery, "Entrega"),
        notes: String(form.notes || "").trim(),
      };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email))
        throw Error("Correo electrónico inválido.");
      /* Líneas del carrito o pedido con producto y cantidad, para mostrarlas o procesarlas*/
      const lines = cartItems(estado).map((producto) => ({
        productId: producto.productId,
        name: producto.product.name,
        quantity: producto.quantity,
        unitPrice: discountedPrice(producto.product),
      }));
      if (
        lines.some(
          (producto) => get(estado.products, producto.productId, "Producto").stock < producto.quantity,
        )
      )
        throw Error("Stock insuficiente en el carrito.");
      const result = simulateFailure ? "rechazado" : "pagado";
      /* Crea el comprobante con código, fecha, cliente, total y estado simulado*/
      const order = {
        id: estado.next.order++,
        reference: `ORB-${String(estado.next.order - 1).padStart(5, "0")}`,
        createdAt: new Date().toISOString(),
        customer,
        lines,
        total: lines.reduce((sum, producto) => sum + producto.unitPrice * producto.quantity, 0),
        status: result,
      };
      estado.orders.unshift(order);
      if (!simulateFailure) {
        for (const line of lines)
          get(estado.products, line.productId, "Producto").stock -= line.quantity;
        estado.cart = [];
      }
      estado.lastOrderId = order.id;
    });
  },
};
