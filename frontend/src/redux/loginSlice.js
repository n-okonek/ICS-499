import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loggedIn: false,
    userRole: 1,
    inputs: {
      email: "",
      password: "",
    },
  },
  reducers: {
    setLoginState: (state, action) => {
      state.loggedIn = action.payload
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload
    },
    setInputs: (state, action) => {
      state.inputs = action.payload
    }
  },
})

export const { setLoginState, setUserRole, setInputs } = loginSlice.actions;

export default loginSlice.reducer;