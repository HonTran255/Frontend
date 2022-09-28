import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: {
    },
};
const userReducer = createSlice({
    name: 'user',
    initialState, // Define initial state
    reducers: {
      addUser: (state, {payload}) => {
        state.user=payload;
      }

    },
});

const {actions, reducer} = userReducer
export const { addUser } = actions
export default reducer;
