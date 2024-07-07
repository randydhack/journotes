import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { csrfFetch } from './csrf'

// Error Message
interface ErrorResponse {
  message: string;
  // Add other properties as needed for your error handling
}

// Define a type for the slice state
interface JournalState {
  data: [] | null,
  loading: boolean,
  error: ErrorResponse | null
}

// Define the initial state using that type
const initialState: JournalState = {
  data: [] || null,
  loading: false,
  error: null
}

// Fetch a single Journal
export const getJournal = createAsyncThunk("journal/singleJournal", async () => {
    const res = await csrfFetch(`/api/journal`, {
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
    .addCase(getJournal.pending, (state) => {
      state.loading = true;
    })
    .addCase(getJournal.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    })
    .addCase(getJournal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as ErrorResponse;
      state.data = null; // Consider setting data to null or another appropriate value
    });
},
})

export default journalSlice.reducer
