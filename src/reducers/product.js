import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    product: {
    },
};

const productReducer = createSlice({
    name: 'product',
    initialState, // Define initial state
    reducers: {
      addProduct: (state, {payload}) => {
        state.product = payload;
      }

    },
});
export const { addProduct } = productReducer.actions
export default productReducer.reducer;