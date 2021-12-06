import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: "",
    password: "********",
    roms: [
      { name: "sample1", rom: "sample1", date: "" },
      { name: "sample2", rom: "sample2", date: "" }
    ]

  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setRoms: (state, action) => {
      state.roms = action.payload
    }
  },
})

export const { setEmail, setRoms } = userSlice.actions;

export default userSlice.reducer;