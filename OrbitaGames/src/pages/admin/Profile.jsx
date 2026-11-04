import { useApp } from "../../context/AppContext.jsx";
export default function Profile() {
  const { session } = useApp();
  return (
    <>
      <h1>Perfil</h1>
      <div className="panel">
        <h2 className="h4">{session?.name || "Invitado"}</h2>
        <p>Correo: {session?.email || "—"}</p>
        <p>Rol: {session?.role || "—"}</p>
        <p className="text-secondary">
          Hasta el momento no hay autenticación real.
          Pero se planea incorporar una en la siguente evaluación.
          Spoiler: Cognito.
        </p>
      </div>
    </>
  );
}
