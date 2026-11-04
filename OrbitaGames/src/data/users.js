// Operaciones de users: reciben datos y devuelven una copia actualizada.
import { clone, required, integer, get } from "./validation.js";
export const usersActions = {
  saveUser(      //Crea o modifica un perfil local validando nombre, formato de correo y duplicados*/
    state,
    form,
    id = null,
  ) {
    return clone(state, (estado) => {
      const name = required(form.name, "Nombre");
      const email = required(form.email, "Correo").toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        throw Error("Correo electrónico inválido.");
      if (estado.users.some((usuario) => usuario.email == email && usuario.id != id))
        throw Error("Correo ya registrado.");

      /* Restringe el rol a cliente o administrador para conservar datos coherentes*/
      const role = ["cliente", "admin"].includes(form.role)
        ? form.role
        : "cliente";
      if (id != null)
        Object.assign(get(estado.users, id, "Usuario"), {
          name,
          email,
          role,
        });
      else
        estado.users.push({
          id: estado.next.user++,
          name,
          email,
          role,
        });
    });
  },
  deleteUser(state, id) {       //Elimina un perfil local identificado por su ID.
    return clone(state, (estado) => {
      get(estado.users, id, "Usuario");
      estado.users = estado.users.filter((usuario) => usuario.id != Number(id));
    });
  },
};
