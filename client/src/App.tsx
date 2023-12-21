import Search from '@components/Search'
import useProfunctorState from '@staltz/use-profunctor-state/index'
import { useEffect } from 'react'
import { app } from './app.module.scss'

const initialState = {
  search: '',
}

function App() {
  const appProf = useProfunctorState(initialState)

  const searchProf = appProf.promap(
    (state) => state.search,
    (search, state) => ({ ...state, search })
  )

  useEffect(() => {}, [searchProf.state])

  return (
    <div className={app}>
      <Search {...searchProf} />
      {appProf.state.search}
    </div>
  )
}

export default App
