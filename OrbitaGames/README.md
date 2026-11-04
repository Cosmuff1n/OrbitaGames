# Órbita Tech — versión básica

Versión académica simplificada. Mantiene los flujos públicos y administrativos del anexo, con módulos separados, comentarios y una interfaz sencilla.

## Ejecutar

Requiere Node.js 20.19 o posterior y Chrome para las pruebas.

```bash
npm install
npm run dev
```

Comprobar compilación y pruebas:

```bash
npm run build
npm test
```

Para mostrar Chrome durante la defensa: `npm run test:browser`.
La cobertura se genera en `coverage/html/index.html`.

Administrador de prueba: `admin@orbita.demo` / `Demo1234`.

## Cambios

- Inicio breve, tres productos destacados y navegación sencilla.
- Sin grandes banners, bloques publicitarios ni menú lateral complejo.
- Bootstrap para controles y grillas; CSS propio reducido.
- Catálogo sin useMemo: filtrado directo, fácil de seguir.
- Componentes Field, ProductCard, ProductList y SectionTitle en archivos separados.
- Reglas de carrito, productos, categorías, usuarios y pedidos en módulos propios.
- Comentarios sobre los procesos; se quitaron comentarios repetidos.
- Pruebas reales incluidas: el ZIP anterior solo mencionaba sus comandos.

## Mapa para estudiar

| Archivo | Responsabilidad |
| --- | --- |
| main.jsx y App.jsx | Iniciar React |
| app/routes.jsx | Elegir la página según la URL |
| components/Field.jsx | Recibir un valor y comunicar cambios con props |
| components/ProductCard.jsx | Mostrar un producto y llamar onAdd con su ID |
| components/ProductList.jsx | Conectar tarjetas con el carrito; grilla Bootstrap |
| pages/ | Pantallas públicas, estados locales y eventos |
| pages/admin/ | Formularios y listas de administración |
| context/AppContext.jsx | Estado compartido, sesión, avisos y localStorage |
| data/seed.js | Datos iniciales |
| data/cart.js | Añadir, cambiar cantidades, quitar y vaciar |
| data/products.js | CRUD de productos |
| data/categories.js | CRUD de categorías |
| data/users.js | CRUD de perfiles |
| data/orders.js | Validación y registro de pedidos |
| data/prices.js | Descuentos y totales |
| data/validation.js | Validaciones comunes y copia del estado |
| data/storeActions.js | Reunir exportaciones, sin concentrar las reglas |
| tests/ | Casos de negocio, componentes, DOM y mocks |

Todas las rutas de archivos anteriores, excepto tests/, se encuentran dentro de src/.

## Flujo de añadir al carrito

1. Products filtra los productos y los entrega a ProductList.
2. ProductList entrega a ProductCard el producto y la función onAdd.
3. El botón ejecuta onAdd(product.id).
4. ProductList usa run para llamar a cartActions.addToCart.
5. La regla valida stock y devuelve datos nuevos; el Context actualiza React y los guarda.

## Flujo de un formulario

1. La página guarda campos con useState.
2. Field muestra value y comunica cambios mediante onChange.
3. Al enviar, preventDefault evita recargar el navegador.
4. run ejecuta la operación del módulo de datos.
5. Si pasa la validación, actualiza los datos; si falla, muestra el error.

## Evidencias para la rúbrica

| Requisito | Dónde mostrarlo |
| --- | --- |
| Arquitectura modular | components, pages, context y data |
| Props y estado | Field, ProductCard, Products y formularios |
| Bootstrap | ProductList usa col-12 col-md-6 col-lg-4; formularios con grilla |
| Navegación | app/routes.jsx |
| Fuente JS y CRUD | data y context/AppContext.jsx |
| Validación | Cantidades, stock, precios, datos obligatorios y correos |
| Jasmine y Karma | tests y karma.conf.cjs |
| Mocks y DOM | jasmine.createSpy, fireEvent y consultas por rol/etiqueta |
| Cobertura | coverage/html/index.html después de ejecutar npm test |

Las vistas de blog, ofertas, categorías, reportes y administración aparecen en el anexo. Se conservaron sencillas para no borrar evidencias pedidas. Tener muchos módulos pequeños no convierte el proyecto en una aplicación empresarial.

## Límites de la demostración

Se conserva el acceso de prueba: el administrador tiene las credenciales anteriores; el cliente ingresa con un correo válido y contraseña de prueba de al menos cuatro caracteres. El registro crea un perfil y no guarda una credencial real. La sesión se pierde al recargar; los datos permanecen en localStorage. No hay backend ni pagos reales.

El anexo pide una fuente JS simulada y también menciona una demostración integrada con backend. Esta versión implementa la fuente simulada; no afirma una integración real. El enlace público de GitHub y el ERS actualizado son entregables aparte de la pauta completa. No se publicó un repositorio externo.

El código fue simplificado con asistencia de IA. Comprende, comprueba y adapta lo que presentarás; declara la asistencia según las indicaciones de tu docente.
