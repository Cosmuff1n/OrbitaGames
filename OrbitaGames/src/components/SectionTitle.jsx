// Recibe el titulo por props, cada página lo modifica
export default function SectionTitle({ title, subtitle, action }) {
  return (
    <header className="page-heading">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {action}
    </header>
  );
}
