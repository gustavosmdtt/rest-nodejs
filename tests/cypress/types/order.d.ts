import { Product } from "./product"

export type Order = {
    productId: number
    orderId: number
    quantity: number
}

export type addOrderSuccessResponse = {
    message: string
    order: Order
}

export type getAllOrderSuccessResponse = {
    orders: {
        orderId: number
        quantity: number
        product: Product
    }[]
}

export type getOrderByIdSuccessResponse = {
    order: Order
}
