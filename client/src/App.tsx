import CacheNotification from '@components/CacheNotification'
import Search from '@components/Search'
import Movies from '@components/movies/Movies'
import { Pagination } from '@mui/material'
import useProfunctorState from '@staltz/use-profunctor-state/index'
import { FIRST_RENDER_KEY, Movie } from '@types'
import queryMovies from '@utils/query-movies'
import { useEffect } from 'react'
import { app } from './app.module.scss'

type AppState = {
  searchKeyword: string
  movies: Array<Movie>
  page: number
  fromCache: boolean
  totalPages: number
  totalResults: number
  [FIRST_RENDER_KEY]: boolean
}

const initialState: AppState = {
  searchKeyword: '',
  movies: [],
  totalPages: 0,
  fromCache: false,
  totalResults: 0,
  page: 1,
  [FIRST_RENDER_KEY]: true,
}

function App() {
  const appProf = useProfunctorState(initialState)

  const searchProf = appProf.promap(
    (state) => state.searchKeyword,
    (search, state) => ({ ...state, searchKeyword: search })
  )
  const cacheNotificationProf = appProf.promap(
    (state) => ({
      fromCache: state.fromCache,
      [FIRST_RENDER_KEY]: state[FIRST_RENDER_KEY],
    }),
    (_, state) => state
  )

  const moviesProf = appProf.promap(
    (state) => state.movies,
    (_, state) => state
  )

  const pagingProf = appProf.promap(
    (state) => ({ page: state.page, count: state.totalPages }),
    (pagingState, state) => ({ ...state, page: pagingState.page })
  )

  useEffect(() => {
    if (!appProf.state.searchKeyword) {
      return
    }
    const { searchKeyword, page } = appProf.state
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    void queryMovies({ keyword: searchKeyword, page }).then((result) => {
      appProf.setState((prevState) => ({ ...prevState, ...result }) as AppState)
    })
  }, [searchProf.state, pagingProf.state.page])

  // TODO: find a less hacky way of dealing with the first render
  useEffect(() => {
    if (!appProf.state.searchKeyword || !appProf.state[FIRST_RENDER_KEY]) {
      return
    }
    appProf.setState((prevState) => ({ ...prevState, [FIRST_RENDER_KEY]: false }))
  }, [searchProf.state])

  return (
    <div className={app}>
      <Search {...searchProf} />
      <CacheNotification {...cacheNotificationProf} />
      <Movies {...moviesProf} />
      {appProf.state.totalPages > 1 && (
        <Pagination
          {...pagingProf.state}
          onChange={(_, value) => {
            pagingProf.setState((prevState) => ({ ...prevState, page: value }))
          }}
        />
      )}
    </div>
  )
}

export default App
