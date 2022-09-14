import { configureStore } from '@reduxjs/toolkit'

// Import reducer:
import userReducer from './reducers/user';

// Create Redux store:
export const store = configureStore({
  reducer: {
    userReducer,
  },
})