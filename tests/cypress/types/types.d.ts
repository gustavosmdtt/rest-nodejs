type httpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type httpStatus = 200 | 201 | 401 | 403 | 404 | 500;

export type APIPayload<T = any> = {
	method: httpMethods
	url: string
	failOnStatusCode?: boolean
	headers?: Record<string, string>
	body?: T
}

export type APIResponse<T = any> = T
