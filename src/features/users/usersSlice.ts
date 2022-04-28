import { createSlice } from '@reduxjs/toolkit';

export interface UserInterface {
  id: string,
  name: string,
}

const initialState: UserInterface[] = [
  { id: '0', name: 'Asweg'},
  { id: '1', name: 'Nrhe'},
  { id: '2', name: 'Prdfg'},
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export default usersSlice.reducer