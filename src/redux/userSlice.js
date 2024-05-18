// src/redux/userSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    registrationStatus: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
};

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, {rejectWithValue}) => {
        try {
            console.log("Sending registration request:", userData);
            const response = await axios.post('http://localhost:8080/api/users/register', userData);
            console.log("Registration response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Registration error:", error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                console.log("Registration pending");
                state.registrationStatus = 'loading'
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log("Registration succeeded with data:", action.payload);
                state.registrationStatus = 'succeeded';
                state.user = action.payload;
                state.error = null
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log("Registration failed with error:", action.payload);
                state.registrationStatus = 'failed';
                state.error = action.payload;
            });
    },
});

export const selectRegistrationStatus = (state) => state.user.registrationStatus;
export const selectRegistrationError = (state) => state.user.error;

export default userSlice.reducer;