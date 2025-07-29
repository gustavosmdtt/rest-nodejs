export type UserPayload = {
    email: string
    password: string
}

export type userResponse = {
    message: string
    token?: string
    userCreated?: {
        userId: number,
        email: string
    }
}