import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        pid: '',
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
            state.pid = action.payload.current._id;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
            state.pid = null;
            state.current = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
        });

        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
        });
    },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
