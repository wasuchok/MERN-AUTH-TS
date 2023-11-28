import { createSlice } from '@reduxjs/toolkit';

const storedUserInfo = localStorage.getItem('userinfo');
const initialState = {
    userinfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setCredentials : (state, action) => {
            state.userinfo = action.payload
            localStorage.setItem('userinfo', JSON.stringify(action.payload))
        },
        logout : (state) => {
            state.userinfo = null
            localStorage.removeItem('userinfo')
        }
    }
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
