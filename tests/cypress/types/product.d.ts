export type Product = {
    productId: number
    title: string
    price: number
}

export type addProductSuccessResponse = {
    message: string
    product: Product
}

export type getAllProductSuccessResponse = {
    quantity: number
    products: Product[]
}

export type getProductByIdSuccessResponse = {
    product: Product
}

export type updateProductSuccessResponse = {
    message: string
    product: Product
}

export type ProductDB = {
    title: string
    price: number
}
