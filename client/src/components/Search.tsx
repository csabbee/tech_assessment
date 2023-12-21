import ClearIcon from '@mui/icons-material/Clear'
import { Button, TextField } from '@mui/material'
import { SetState } from '@staltz/use-profunctor-state'
import { Promap } from '@types'
import debounce from 'debounce'
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react'
import { clearIconWrapper, searchContainer } from './search.module.scss'

type SearchProps = {
  state: string
  setState: SetState<string>
  promap: Promap<string>
}

const Search = memo(({ state, setState }: SearchProps) => {
  const [searchKeyword, setSearchKeyword] = useState(state)

  const promoteSearchChange = useCallback(
    debounce((keyword: string) => {
      setState(() => keyword)
    }, 300),
    []
  )

  useEffect(() => {
    if (searchKeyword.trim().length < 3) {
      return
    }

    promoteSearchChange(searchKeyword)
  }, [searchKeyword])

  return (
    <div className={searchContainer}>
      <TextField
        value={searchKeyword}
        onInput={(event: ChangeEvent<HTMLInputElement>) => {
          setSearchKeyword(event.target.value)
        }}
        placeholder="Please enter something..."
        label="Search"
        InputProps={{
          endAdornment: (
            <div
              className={clearIconWrapper}
              onClick={() => {
                setSearchKeyword('')
                setState(() => '')
              }}
            >
              <ClearIcon />
            </div>
          ),
        }}
      />
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
