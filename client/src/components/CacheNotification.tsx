import { Alert } from '@mui/material'
import { FIRST_RENDER_KEY } from '@types'

type CacheNotificationState = {
  fromCache: boolean
  [FIRST_RENDER_KEY]: boolean
}

type CacheNotificationProps = {
  state: CacheNotificationState
}

const CacheNotification = ({ state }: CacheNotificationProps) => {
  return state[FIRST_RENDER_KEY] ? (
    <></>
  ) : state.fromCache ? (
    <Alert severity="success">Result is from cache</Alert>
  ) : (
    <Alert severity="info">Result is not from cache</Alert>
  )
}

CacheNotification.displayName = 'CacheNotification'

export default CacheNotification
