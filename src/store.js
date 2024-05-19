import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        login: userReducer,
    },
});

export default store;
