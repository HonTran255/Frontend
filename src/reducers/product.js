import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    product: {},
};

const productReducer = createSlice({
    name: 'user',
    initialState, // Define initial state
    reducers: {
      addProduct: (state, action) => {
        const product = action.payload;
        return {
            ...state,
            product: product,
        };
      }

    },
});
export const { addProduct } = productReducer.actions
export default productReducer.reducer;