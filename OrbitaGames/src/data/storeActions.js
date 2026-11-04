// Punto de importación: reúne los módulos, sin implementar sus reglas aquí.
import { cartActions } from "./cart.js";
import { productsActions } from "./products.js";
import { categoriesActions } from "./categories.js";
import { usersActions } from "./users.js";
import { ordersActions } from "./orders.js";
export { initialData, seedProducts, seedCategories, seedArticles, } from "./seed.js";
export { discountedPrice, cartItems, cartTotal, formatPrice, } from "./prices.js";
// Reunimos aquí los métodos para importarlos desde un solo archivo.
export const actions = {
  addToCart: cartActions.addToCart,
  changeQuantity: cartActions.changeQuantity,
  removeFromCart: cartActions.removeFromCart,
  clearCart: cartActions.clearCart,
  saveProduct: productsActions.saveProduct,
  deleteProduct: productsActions.deleteProduct,
  saveCategory: categoriesActions.saveCategory,
  deleteCategory: categoriesActions.deleteCategory,
  saveUser: usersActions.saveUser,
  deleteUser: usersActions.deleteUser,
  placeOrder: ordersActions.placeOrder,
};
