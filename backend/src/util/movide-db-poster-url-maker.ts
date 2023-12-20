import { THEMOVIEDB_IMAGE_URL } from '@config'
console.log('asdasd', THEMOVIEDB_IMAGE_URL)

const createPosterUrl = (postfix: string) => {
  return `${THEMOVIEDB_IMAGE_URL}/w92/${postfix}`
}

export default createPosterUrl
