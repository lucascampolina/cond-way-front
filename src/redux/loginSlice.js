import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: 'idle',
    error: null,
};

export const loginUser = createAsyncThunk(
    'login/loginUser',
    async (userCredentials, {rejectWithValue}) => {
        const {email, password} = userCredentials;
        try {
            const response = await axios.post('http://localhost:8080/api/login', { email, password }, { withCredentials: true });
            console.log('Server response:', response.data);
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
                console.log('loginStatus after fulfilled:', state.status);
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                console.log('loginStatus after rejected:', state.status);
                state.error = action.payload;
            });
    },
});

export const selectLoginStatus = (state) => state.login.status;
export const selectLoginError = (state) => state.login.error;

export default loginSlice.reducer;