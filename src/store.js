import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';
import loginReducer from './redux/loginSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        login: loginReducer,
    },
});

export default store;
