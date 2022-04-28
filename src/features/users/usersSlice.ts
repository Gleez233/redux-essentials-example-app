import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client'

export interface UserInterface {
  id: string,
  name: string,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const initialState: UserInterface[] = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export default usersSlice.reducer