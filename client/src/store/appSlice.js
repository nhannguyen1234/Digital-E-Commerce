import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';
export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action (Promise pending)
        builder.addCase(actions.getCategories.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });

        // Khi thực hiện action thành công (Promise fulfilled)
        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            console.log(action);
            // Tắt trạng thái loading, lưu thông tin vào store
            state.isLoading = false;
            state.categories = action.payload;
        });
        // Khi thực hiện action thất bại (Promise rejected)
        builder.addCase(actions.getCategories.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});
export const { login } = appSlice.actions;
export default appSlice.reducer;
