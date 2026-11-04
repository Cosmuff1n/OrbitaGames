// Consultas y cálculos del carrito; estas funciones no modifican los datos.
export const discountedPrice = (p) =>
  Math.round((p.price * (100 - (p.discount || 0))) / 100);

export const cartItems = (data) =>
  data.cart
    .map((line) => ({
      productId: line.productId,
      quantity: line.quantity,
      product: data.products.find((p) => p.id == line.productId),
    }))
    .filter((producto) => producto.product);

export const cartTotal = (data) =>
  cartItems(data).reduce(
    (sum, producto) => sum + producto.quantity * discountedPrice(producto.product),
    0,
  );
  
export const formatPrice = (price) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(price);
