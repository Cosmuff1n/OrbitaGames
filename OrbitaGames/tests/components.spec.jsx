import React, { useState } from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Field from "../src/components/Field.jsx";
import ProductCard from "../src/components/ProductCard.jsx";
import SectionTitle from "../src/components/SectionTitle.jsx";
import Products from "../src/pages/Products.jsx";
import { AppProvider, STORE_KEY } from "../src/context/AppContext.jsx";
import { initialData } from "../src/data/seed.js";

// El spy sustituye la acción real y permite comprobar qué dato entrega el componente.
describe("Componentes React", () => {
  afterEach(() => {
    cleanup();
    localStorage.removeItem(STORE_KEY);
  });

  it("Field muestra el valor recibido por props", () => {
    render(<Field label="Nombre" value="Prueba" onChange={() => { }} />);
    expect(screen.getByLabelText("Nombre").value).toBe("Prueba");
  });

  it("Field avisa al padre del nuevo texto", () => {
    const change = jasmine.createSpy("change");
    render(<Field label="Nombre" value="" onChange={change} />);
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Nuevo" },
    });
    expect(change).toHaveBeenCalledWith("Nuevo");
  });

  it("un formulario controlado actualiza su estado", () => {
    function Form() {
      const [name, setName] = useState("");
      return (
        <>
          <Field label="Nombre" value={name} onChange={setName} />
          <output>{name}</output>
        </>
      );
    }
    render(<Form />);
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Cliente" },
    });
    expect(screen.getByRole("status").textContent).toBe("Cliente");
  });

  it("Field muestra las opciones del selector", () => {
    render(
      <Field
        label="Categoría"
        as="select"
        value="Redes"
        options={["Redes", "Energía"]}
        onChange={() => { }}
      />,
    );
    expect(screen.getAllByRole("option").length).toBe(2);
  });

  it("SectionTitle omite un subtítulo ausente", () => {
    const { container } = render(<SectionTitle title="Productos" />);
    expect(screen.getByRole("heading").textContent).toBe("Productos");
    expect(container.querySelector("p")).toBeNull();
  });

  it("SectionTitle muestra un subtítulo recibido", () => {
    render(<SectionTitle title="Productos" subtitle="Catálogo" />);
    expect(screen.getByText("Catálogo")).toBeTruthy();
  });

  it("ProductCard muestra el producto recibido", () => {
    const product = initialData().products[0];
    render(
      <MemoryRouter>
        <ProductCard product={product} onAdd={() => { }} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link").textContent).toBe(product.name);
  });

  it("ProductCard llama al mock con el ID al pulsar añadir", () => {
    const add = jasmine.createSpy("add");
    render(
      <MemoryRouter>
        <ProductCard product={initialData().products[0]} onAdd={add} />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(add).toHaveBeenCalledWith(1);
  });

  it("ProductCard deshabilita la compra sin stock", () => {
    const product = structuredClone(initialData().products[0]);
    product.stock = 0;
    render(
      <MemoryRouter>
        <ProductCard product={product} onAdd={() => { }} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("button").disabled).toBeTrue();
  });

  it("el buscador actualiza la lista y muestra el estado vacío", () => {
    localStorage.removeItem(STORE_KEY);
    render(
      <MemoryRouter>
        <AppProvider>
          <Products />
        </AppProvider>
      </MemoryRouter>,
    );
    expect(screen.getAllByRole("article").length).toBe(
      initialData().products.length,
    );
    fireEvent.change(screen.getByLabelText("Buscar"), {
      target: { value: "NoExiste123" },
    });
    expect(screen.queryAllByRole("article").length).toBe(0);
    expect(screen.getByRole("status").textContent).toBe(
      "No hay productos para mostrar.",
    );
  });
});
