import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [
      { id: 0, role: 1, email: "", registered: "", login: "", warned: 0, banned: 0 },
    ]
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    }
  },
})

export const { setUsers } = adminSlice.actions;

export default adminSlice.reducer;