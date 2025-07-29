export type UserPayload = {
    email: string
    password: string
}

export type UserResponse = {
    message: string
    token?: string
    userCreated?: {
        userId: number,
        email: string
    }
}