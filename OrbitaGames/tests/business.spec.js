import {
  actions,
  initialData,
  discountedPrice,
  cartTotal,
} from "../src/data/storeActions.js";

// Cada prueba obtiene datos nuevos; ninguna depende de la ejecución anterior.
describe("Reglas de la tienda", () => {
  let data;
  const customer = {
    name: "Cliente",
    lastName: "Prueba",
    email: "cliente@example.com",
    street: "Calle 1",
    city: "Santiago",
    region: "Metropolitana",
    delivery: "Retiro en tienda",
  };
  
  beforeEach(() => {
    data = initialData();
  });

  it("calcula descuentos", () => {
    expect(discountedPrice({ price: 10000, discount: 20 })).toBe(8000);
  });

  it("agrega un producto sin modificar el estado anterior", () => {
    const next = actions.addToCart(data, 1);
    expect(next.cart).toEqual([{ productId: 1, quantity: 1 }]);
    expect(data.cart).toEqual([]);
  });

  it("suma unidades del mismo producto", () => {
    const next = actions.addToCart(actions.addToCart(data, 1), 1);
    expect(next.cart.length).toBe(1);
    expect(next.cart[0].quantity).toBe(2);
  });

  it("rechaza cantidades mayores al stock", () => {
    expect(() => actions.addToCart(data, 1, 999)).toThrowError(/stock/);
  });

  it("rechaza cantidades decimales", () => {
    expect(() => actions.addToCart(data, 1, 1.5)).toThrowError(/entero/);
  });

  it("elimina la línea cuando la cantidad es cero", () => {
    expect(
      actions.changeQuantity(actions.addToCart(data, 1), 1, 0).cart,
    ).toEqual([]);
  });

  it("calcula el total con cantidad y descuento", () => {
    expect(cartTotal(actions.addToCart(data, 1, 2))).toBe(
      discountedPrice(data.products[0]) * 2,
    );
  });

  it("rechaza un precio inválido", () => {
    const product = structuredClone(data.products[0]);
    product.price = -1;
    expect(() => actions.saveProduct(data, product)).toThrowError(/Precio/);
  });

  it("crea, edita y elimina un producto", () => {
    const newProduct = structuredClone(data.products[0]);
    newProduct.name = "Producto nuevo";
    const created = actions.saveProduct(data, newProduct);
    const id = created.products.at(-1).id;
    const editedProduct = structuredClone(created.products.at(-1));
    editedProduct.name = "Nombre editado";
    const edited = actions.saveProduct(created, editedProduct, id);
    expect(edited.products.at(-1).name).toBe("Nombre editado");
    expect(actions.deleteProduct(edited, id).products.length).toBe(
      data.products.length,
    );
  });

  it("protege los productos que están en el carrito", () => {
    expect(() =>
      actions.deleteProduct(actions.addToCart(data, 1), 1),
    ).toThrowError(/carrito/);
  });

  it("renombra la categoría también en los productos", () => {
    const oldName = data.products[0].category;
    expect(
      actions.saveCategory(data, "Nueva categoría", oldName).products[0]
        .category,
    ).toBe("Nueva categoría");
  });

  it("impide categorías duplicadas", () => {
    expect(() => actions.saveCategory(data, data.categories[0])).toThrowError(
      /existe/,
    );
  });

  it("impide correos duplicados", () => {
    expect(() =>
      actions.saveUser(data, { name: "Duplicado", email: data.users[0].email }),
    ).toThrowError(/registrado/);
  });

  it("rechaza un correo inválido", () => {
    expect(() =>
      actions.saveUser(data, { name: "Cliente", email: "incorrecto" }),
    ).toThrowError(/inválido/);
  });

  it("no acepta pedidos vacíos", () => {
    expect(() => actions.placeOrder(data, customer)).toThrowError(/vacío/);
  });

  it("un pago exitoso descuenta stock y vacía el carrito", () => {
    const next = actions.placeOrder(actions.addToCart(data, 1, 2), customer);
    expect(next.orders[0].status).toBe("pagado");
    expect(next.products[0].stock).toBe(data.products[0].stock - 2);
    expect(next.cart).toEqual([]);
  });

  it("un pago rechazado conserva stock y carrito", () => {
    const next = actions.placeOrder(actions.addToCart(data, 1), customer, {
      simulateFailure: true,
    });
    expect(next.orders[0].status).toBe("rechazado");
    expect(next.products[0].stock).toBe(data.products[0].stock);
    expect(next.cart.length).toBe(1);
  });
});
