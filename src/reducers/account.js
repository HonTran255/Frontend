
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
};
const accountReducer = createSlice({
    name: 'account',
    initialState, // Define initial state
    reducers: {
      // Define reducers
      addAccount: (state, {payload}) => {
        state.user = payload;
      },
      updateAvatar: (state, action) => {
        state.user = action.payload;
      }
    },
});


export const { addAccount, updateAvatar } = accountReducer.actions;
export default accountReducer.reducer;