import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { csrfFetch } from "./csrf";

interface UserState {
    status: 'idle' | "loading" | "succeeded" | "failed",
    error: string | null
}

// Define the initial state using that type
const initialState: UserState = {
    status: 'idle',
    error: null
  }


export const login = createAsyncThunk("login/loginAsync", async (loginData: any, { rejectWithValue }) => {
    try {
        const res = await csrfFetch('/api/session', {
          method: 'POST',
          body: JSON.stringify(loginData),
        });

        if (!res.ok) {
          // Check for CSRF token error explicitly
          if (res.status === 403 && res.headers.get('Content-Type')?.includes('application/json')) {
            const errorData = await res.json();
            return rejectWithValue(errorData); // Pass the error data to be handled in the rejected action
          }

          throw new Error('Failed to login');
        }

        return res.json();
      } catch (error) {
        return rejectWithValue({ error: 'error' || 'An error occurred' });
      }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(login.pending,(state) => {
            state.status = 'loading'
        })
        .addCase(login.fulfilled, (state) => {
            state.status = 'succeeded'
            state.error = null
        })
        .addCase(login.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || null;
        })
      }
})

export default userSlice.reducer;
