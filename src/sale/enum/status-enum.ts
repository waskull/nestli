export enum statusEnum{
    WAITING = "Esperando Entrega",
    INCOMPLETE = "Esperando confirmación de pago",
    COMPLETED = "Producto entregado",
    CANCELED = "Pedido cancelado por el usuario",
    CANCELED_SYSTEM = "Pedido cancelado por el sistema"
}

export enum Method{
    Cash = "Efectivo",
    Mobile = "Pago Móvil",
    Transfer = "Transferencia"
}