import { THEMOVIEDB_URL } from '@config'
import mockResponse from '@mock/mock-response'

type MatchArray = [string, number, string]

export default [
  {
    pattern: THEMOVIEDB_URL,
    fixtures: function (match: MatchArray) {
      const [url] = match

      if (url === THEMOVIEDB_URL) {
        return {
          results: [mockResponse],
          page: 1,
          total_pages: 1,
          total_results: 1,
        }
      }

      return {}
    },
    get: function (_, data) {
      return {
        body: data,
      }
    },
    post: function (_, data) {
      return {
        body: data,
      }
    },
  },
]
