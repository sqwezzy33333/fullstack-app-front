export interface ApiError {
  type: 'client_error' | 'validation_error' | 'server_error';
  errors: ApiErrorDetails[];
}

export interface ApiErrorDetails {
  attr: string;
  detail: string;
  code: string;
}
