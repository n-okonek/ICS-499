import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: "",
    password: "********",
    roms: [
      { name: "sample1", id: "sample1", date: "" },
      { name: "sample2", id: "sample2", date: "" }
    ],
    role: 0,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setRoms: (state, action) => {
      state.roms = action.payload
    },
    setUserRole: (state, action) => {
      state.role = action.payload
    }
  },
})

export const { setEmail, setRoms } = userSlice.actions;

export default userSlice.reducer;
