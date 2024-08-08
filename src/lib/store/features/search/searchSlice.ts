import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface searchState {
  searches: string[]
}

const initialState: searchState = {
  searches: [],
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearch: (state, action: PayloadAction<string>) => {
      state.searches.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addSearch } = searchSlice.actions

export default searchSlice.reducer