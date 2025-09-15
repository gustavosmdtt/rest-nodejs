export type UserPayload = {
    email: string
    password: string
}

export type UserSuccessResponse = {
    message: string
    token: string
    userCreated: {
        userId: number,
        email: string
    }
}