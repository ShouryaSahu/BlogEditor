import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { // Reducer ke pass hamesha state aur action ka access hota hai..state mei jo value update krni hoti hai voh aur action mei payload
        login : (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
     },
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;