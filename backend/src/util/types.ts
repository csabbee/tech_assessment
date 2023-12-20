export type MovieDBResponse = {
  page: number
  results: Array<{ poster_path: string }>
  total_pages: number
  total_results: number
}
