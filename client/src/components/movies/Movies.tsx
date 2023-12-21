import MovieCard from '@components/movies/MovieCard'
import { SetState } from '@staltz/use-profunctor-state'
import { Movie, Promap } from '@types'
import { memo } from 'react'
import { moviesGrid } from './movies.module.scss'

type MoviesProp = {
  state: Array<Movie>
  setState: SetState<Array<Movie>>
  promap: Promap<Array<Movie>>
}

const Movies = memo(({ state }: MoviesProp) => {
  return (
    <div className={moviesGrid}>
      {state.map((movie) => (
        <MovieCard {...movie} key={movie.id} />
      ))}
    </div>
  )
})

Movies.displayName = 'Movies'

export default Movies
