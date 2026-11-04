import { createContext, useContext, useEffect, useState } from "react";
import { actions, initialData } from "../data/storeActions.js";
/*clave fija con la que identificamos estos datos en localStorage*/
export const STORE_KEY = "orbita-tech-ep2-v1";
/*creamos el Context para compartir información rapido y no andar en todas las panrallas con el prop*/
const StoreContext = createContext(null);
/*comienza leyendo localStorage y comprobar que haya colecciones válidas. Si falla, los recupera*/
function restore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      if (d && Array.isArray(d.products) && Array.isArray(d.cart) && Array.isArray(d.orders) && Array.isArray(d.users))
        return d;
    }
  } catch {
    /*si no hay almacenamiento, se utiliza los datos de la seed*/
  }
  return initialData();
}
/*Almacena datos, sesión y avisos; expone las funciones compartidas mediante StoreContext.Provider*/
export function AppProvider({ children }) {
  /*Fuente compartida de productos, carrito, pedidos, usuarios y categorías*/
  const [data, setData] = useState(restore);
  /*Sesión temporal usada para mostrar nombre y rol; se pierde al refrescar*/
  const [session, setSession] = useState(null);
  /*Mensaje de éxito o error que se muestra después de una acción*/
  const [notice, setNotice] = useState(null);
  /*Efecto: cada vez que cambia data, guarda una copia JSON en localStorage. Si el navegador lo impide, la app sigue funcionando*/
  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
    } catch {
      /*aqui deberia ir el almacenamiento, coming soon*/
    }
  }, [data]);
  /*Ejecuta una acción que devuelve un nuevo estado. Si tiene éxito lo guarda; si falla muestra un mensaje*/
  function run(operation, message = "Cambio guardado en el navegador.") {
    try {
      const next = operation(data);
      setData(next);
      setNotice({
        type: "success",
        text: message,
      });
      return next;
    } catch (error) {
      setNotice({
        type: "danger",
        text: error.message || "No se pudo completar la acción.",
      });
      return null;
    }
  }
  /*Comprueba credenciales SOLO de demostración y crea una sesión en memoria. No existe autenticación real*/
  function login(email, password) {
    if (!email.trim() || password.length < 4)
      return {
        ok: false,
        message: "Ingresa correo y contraseña de al menos 4 caracteres",
      };
    const admin =
      email.trim().toLowerCase() == "admin@orbita.demo" &&
      password == "Demo1234";
    setSession({
      name: admin ? "Administrador Demo" : "Cliente Demo",
      email: email.trim(),
      role: admin ? "admin" : "cliente",
    });
    return {
      ok: true,
      role: admin ? "admin" : "cliente",
    };
  }
  /*Crea un perfil cliente mediante saveUser y abre una sesión temporal si el registro resulta válido*/
  function register(form) {
    const next = run(
      (estado) =>
        actions.saveUser(estado, {
          name: form.name,
          email: form.email,
          role: "cliente",
        }),
      "Cuenta demostrativa creada.",
    );
    if (!next) return false;
    setSession({
      name: form.name,
      email: form.email,
      role: "cliente",
    });
    return true;
  }
  /*cierra la sesióny limpia el estado de la sesion*/
  function logout() {
    setSession(null);
  }
  return (
    <StoreContext.Provider
      value={{
        data,
        session,
        login,
        register,
        logout,
        run,
        notice,
        clearNotice: () => setNotice(null),
        resetDemo: () => setData(initialData()),
      }}>
      {children}
    </StoreContext.Provider>
  );
}
/*Hook personalizado que accede al contexto y detecta si se intenta usar fuera de AppProvider*/
export function useApp() {
  const contexto = useContext(StoreContext);
  if (!contexto) throw Error("useApp debe usarse dentro de AppProvider");
  return contexto;
}
