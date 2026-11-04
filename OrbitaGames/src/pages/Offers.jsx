import { useApp } from "../context/AppContext.jsx";
import ProductList from "../components/ProductList.jsx";

// Reutiliza la lista del catálogo y filtra únicamente los productos con descuento.
export default function Offers() {
  const { data } = useApp();
  return (
    <>
      <h1>Ofertas</h1>
      <ProductList
        products={data.products.filter((product) => product.discount > 0)}
      />
    </>
  );
}
