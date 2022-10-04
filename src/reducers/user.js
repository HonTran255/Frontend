
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {

    },
};
const userReducer = createSlice({
    name: 'user',
    initialState, // Define initial state
    reducers: {
      // Define reducers
      addUser: (state, {payload}) => {
        state.user = payload;
      }
    },
});


export const { addUser} = userReducer.actions;
export default userReducer.reducer;
