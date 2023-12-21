import { Movie } from '@types'

type QueryMoviesProps = {
  keyword: string
  page: number
}

type QueryResponse = {
  results: Array<Movie>
  total_pages: number
  total_results: number
  fromCache: boolean
}

type MappedResponse = {
  movies: Array<Movie>
  totalPages: number
  totalResults: number
  fromCache: boolean
}

const queryMovies = async (props: QueryMoviesProps): Promise<MappedResponse> => {
  return fetch('/search', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  })
    .then((response) => response.json())
    .then((data: QueryResponse) => {
      const mappedResponse: MappedResponse = {
        movies: data.results,
        totalPages: data.total_pages,
        totalResults: data.total_results,
        fromCache: data.fromCache,
      }
      return mappedResponse
    })
}

export default queryMovies
