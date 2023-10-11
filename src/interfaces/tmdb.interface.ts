export interface TMDBPaginatedInterface<T> {
  results: T[];
  page: number;
  total_results: number;
  total_pages: number;
}
