import { Button, TextField } from '@mui/material'
import { SetState } from '@staltz/use-profunctor-state'
import { Promap } from '@types'
import debounce from 'debounce'
import { FormEvent, memo, useCallback, useEffect, useState } from 'react'
import { searchContainer } from './search.module.scss'

type SearchProps = {
  state: string
  setState: SetState<string>
  promap: Promap<string>
}

const Search = memo(({ state, setState }: SearchProps) => {
  const [searchKeyword, setSearchKeyword] = useState(state)

  const handleOnInput = useCallback(
    debounce((event: FormEvent) => {
      const inputElement = event.target as HTMLInputElement
      setSearchKeyword(() => inputElement.value)
    }, 300),
    [searchKeyword, setSearchKeyword]
  )

  useEffect(() => {
    if (searchKeyword.trim().length < 3) {
      return
    }

    setState(() => searchKeyword)
  }, [searchKeyword])

  return (
    <div className={searchContainer}>
      <TextField onInput={handleOnInput} placeholder="Please enter something..." label="Search" />
      <Button
        variant="contained"
        onClick={() => {
          setState(() => searchKeyword.trim())
        }}
      >
        Search
      </Button>
    </div>
  )
})

Search.displayName = 'Search'

export default Search
