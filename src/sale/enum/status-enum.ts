export enum statusEnum{
    WAITING = "Esperando Entrega",
    INCOMPLETE = "Esperando confirmacion de pago",
    COMPLETED = "Producto entregado",
    CANCELED = "Pedido cancelado por el usuario",
    CANCELED_SYSTEM = "Pedido cancelado por el sistema"
}

export enum Method{
    Cash = "Efectivo",
    Mobile = "Pago Movil",
    Transfer = "Transferencia"
}