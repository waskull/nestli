export const Rol = Object.freeze({
    admin: "Administrador",
    manager: "Gerente",
    salesman: "Vendedor",
    delivery_man: "Repartidor"
});


export const Role: {
    MANAGER: 'Gerente'
    ADMIN: 'Administrador'
    SALESMAN: "Vendedor",
    DELIVERY_MAN: "Repartidor"
  } = {
    MANAGER: 'Gerente',
    ADMIN: 'Administrador',
    SALESMAN: "Vendedor",
    DELIVERY_MAN: "Repartidor"
  }
  
  export type Role = typeof Role[keyof typeof Role]