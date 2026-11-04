import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import Field from "../components/Field.jsx";
import ProductList from "../components/ProductList.jsx";

export default function Products() {
  const { data } = useApp();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const category = params.get("categoria") || "";

  // Con un catálogo pequeño basta filtrar y ordenar directamente, sin useMemo.
  const products = data.products.filter((product) => {
    const matchesText = (product.name + " " + product.description)
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesText && (!category || product.category == category);
  });
  products.sort((a, b) => {
    if (sort == "price") return a.price - b.price;
    if (sort == "stock") return b.stock - a.stock;
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      <h1>Productos</h1>
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <Field label="Buscar" value={search} onChange={setSearch} />
        </div>
        <div className="col-12 col-md-4">
          <Field
            label="Categoría"
            as="select"
            value={category}
            options={[{ value: "", label: "Todas" }].concat(data.categories)}
            onChange={(value) => setParams(value ? { categoria: value } : {})}
          />
        </div>
        <div className="col-12 col-md-4">
          <Field
            label="Ordenar"
            as="select"
            value={sort}
            onChange={setSort}
            options={[
              { value: "name", label: "Nombre" },
              { value: "price", label: "Menor precio" },
              { value: "stock", label: "Más stock" },
            ]}
          />
        </div>
      </div>
      <p>{products.length} productos encontrados</p>
      <ProductList products={products} />
    </>
  );
}
