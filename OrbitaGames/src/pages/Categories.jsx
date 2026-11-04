import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

// Abre el catálogo filtrado usando la categoría en la URL.
export default function Categories() {
  const { data } = useApp();
  return (
    <>
      <h1>Categorías</h1>
      <ul>
        {data.categories.map(category => (
          <li key={category}>
            <Link to={'/productos?categoria=' + encodeURIComponent(category)}>{category}</Link>
            {' — '}{data.products.filter(product => product.category == category).length} productos
          </li>
        ))}
      </ul>
    </>
  );
}
