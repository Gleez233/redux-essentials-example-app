import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice.ts'
import usersReducer from '../features/users/usersSlice.ts'

const store = configureStore({
  reducer: {
    "posts": postsReducer,
    'users': usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store