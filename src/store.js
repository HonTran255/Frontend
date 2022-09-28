import { configureStore } from '@reduxjs/toolkit'

// Import reducer:
import userReducer from './reducers/user';
import productReducer from './reducers/product';
import accountReducer from './reducers/account';


const rootReducer ={
  user: userReducer,
  product: productReducer,
  account: accountReducer,
}
// Create Redux store:
export const store = configureStore({
  reducer: rootReducer,
});