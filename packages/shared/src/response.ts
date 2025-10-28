export type SuccessResponse<T = void> = {
  success: true
  data: T
}

export type ErrorResponse<E> = {
  success: false
  error: E
}

export type ApiResponse<T = void, E = unknown> = SuccessResponse<T> | ErrorResponse<E>

export type PaginatedSuccessResponse<T> = SuccessResponse<T> & {
  pagination: {
    page: number
    totalPages: number
    totalItems: number
  }
}

export const response = <T = void>(value?: T): SuccessResponse<T> => ({
  success: true,
  data: value as T,
})

export const error = <E>(error: E): ErrorResponse<E> => ({
  success: false,
  error,
})
