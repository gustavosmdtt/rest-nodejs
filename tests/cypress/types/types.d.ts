type httpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type httpStatus = 200 | 201 | 401 | 403 | 404 | 500;

export type APIPayload<T = any> = {
	method: httpMethods
	url: string
	failOnStatusCode?: boolean
	headers?: Record<string, string>
	body?: T
}

export type ErrorResponse = {
	message: string
}

export type ErrorOptions = {
    status: 400 | 404 | 500 | 401 | 403
    message: string
}

export type DeleteSuccessResponse = {
    message: string
}
