import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Movie } from '@types'
import {
  movieCard,
  movieCardContent,
  movieCardOverview,
  movieDescription,
} from './movie-card.module.scss'
import noImageUrl from './no-image.webp'

const MovieCard = ({ poster_path, overview, title }: Movie) => {
  return (
    <Card sx={{ maxWidth: 360, maxHeight: 450 }} className={movieCard}>
      <CardMedia
        sx={{ height: 160 }}
        image={poster_path ?? noImageUrl}
        style={{ backgroundSize: 'auto' }}
      />
      <CardContent className={movieCardContent}>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <div className={movieCardOverview}>
          <Typography component="p" className={movieDescription}>
            {overview}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

MovieCard.displayName = 'Movie'

export default MovieCard
