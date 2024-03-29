import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            const user = localStorage.getItem('user');
            if (user) {
                state.authData = JSON.parse(user);
            }
            state._inited = true;
        },
        onLogout: (state) => {
            state.authData = undefined;
            localStorage.removeItem('user');
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
