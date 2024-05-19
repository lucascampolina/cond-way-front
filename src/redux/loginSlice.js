import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: 'idle',
    error: null,
};

export const loginUser = createAsyncThunk(
    'login/loginUser',
    async (userCredentials, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/login?email=${userCredentials.email}&password=${userCredentials.password}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});


export const selectLoginStatus = (state) => state.login.status;
export const selectLoginError = (state) => state.login.error;

export default loginSlice.reducer;