import { ApiError } from './api-error';

export interface ApiResponse<T> {
  result: T;
  error: ApiError | null;
}
