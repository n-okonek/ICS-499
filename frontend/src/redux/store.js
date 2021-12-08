import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import headerReducer from './headerSlice';
import userReducer from './userSlice';
import adminReducer from './adminSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    header: headerReducer,
    user: userReducer,
    admin: adminReducer,
  },
})