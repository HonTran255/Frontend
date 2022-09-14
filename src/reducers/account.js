
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: {},
};
const accountReducer = createSlice({
    name: 'account',
    initialState, // Define initial state
    reducers: {
      // Define reducers
      addAccount: (state, action) => {
        const user = action.payload;
        return {
            ...state,
            user: user,
        };
      },
      updateAvatar: (state, action) => {
        const newUser = state.user;
        newUser.avatar = action.payload;
        return {
            ...state,
            user: newUser,
        };
      }
    },
});
export const { addAccount, updateAvatar } = accountReducer.actions
export default accountReducer.reducer;