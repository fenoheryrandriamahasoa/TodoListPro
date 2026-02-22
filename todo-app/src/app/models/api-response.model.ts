export interface ApiError {
  message: string;
  errors?: { [key: string]: string[] };
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}