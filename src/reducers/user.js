import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: {},
};
const userReducer = createSlice({
    name: 'user',
    initialState, // Define initial state
    reducers: {
      addUser: (state, action) => {
        const user = action.payload;
        return {
            ...state,
            user: user,
        };
      }

    },
});
export const { addUser } = userReducer.actions
export default userReducer.reducer;
