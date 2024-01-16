import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { csrfFetch } from './csrf'
// Define a type for the slice state
interface JournalState {
  data: [] | null,
  loading: boolean,
  error: string | null
}

// Define the initial state using that type
const initialState: JournalState = {
  data: [],
  loading: false,
  error: ''
}

export const getJournal = createAsyncThunk("journal", async () => {
    const res = await csrfFetch(`/api/journal/1`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      return res.json()
    }
})

export const journalSlice = createSlice({
  name: 'journal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
    .addCase(getJournal.pending,(state) => {
        state.loading = true
    })
    .addCase(getJournal.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.data = action.payload
    })
    .addCase(getJournal.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
        state.data = []
    })
  }
})

export default journalSlice.reducer
