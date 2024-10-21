import { configureStore } from '@reduxjs/toolkit'
import  journalReducer  from './journalSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    journal: journalReducer,
    session: userReducer,
  },






})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
