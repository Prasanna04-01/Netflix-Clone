export interface APIResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface APIError {
  status_code: number;
  status_message: string;
  success: boolean;
}

export type SearchResponse<T> = APIResponse<T>;
