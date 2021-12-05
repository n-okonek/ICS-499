import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import headerReducer from './headerSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    header: headerReducer,
  },
})