import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    showAdminMenu: false,
  },
  reducers: {
    setSignInState: (state, action) => {
      state.showSignIn = action.payload
    },
    setAdminState: (state, action) => {
      state.showAdminMenu = action.payload
    }
  },
})

export const { setSignInState, setAdminState } = headerSlice.actions;

export default headerSlice.reducer;