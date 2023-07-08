import { createSlice } from '@reduxjs/toolkit';
import {
    getNewProducts,
    getBestSellerProduct,
    getTabletProduct,
    getLaptopProduct,
    getSmartphoneProduct,
} from './asyncActions';
export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProducts: null,
        bestSellerProducts: null,
        isLoading: false,
        tablet: null,
        laptop: null,
        phone: null,
    },
    reducers: {},
    extraReducers: {
        [getBestSellerProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.bestSellerProducts = action.payload;
        },
        [getNewProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.newProducts = action.payload;
        },
        [getTabletProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.tablet = action.payload;
        },
        [getLaptopProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.laptop = action.payload;
        },
        [getSmartphoneProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.phone = action.payload;
        },
    },
    // (builder) => {
    // Bắt đầu thực hiện action (Promise pending)
    // builder.addCase(actions.pending, (state) => {
    //     // Bật trạng thái loading
    //     state.isLoading = true;
    // });

    // Khi thực hiện action thành công (Promise fulfilled)
    // builder.addCase(actions.fulfilled, (state, action) => {
    //     // Tắt trạng thái loading, lưu thông tin vào store
    //     state.isLoading = false;
    //     state.categories = action.payload;
    // });
    // Khi thực hiện action thất bại (Promise rejected)
    // builder.addCase(actions.rejected, (state, action) => {
    //     // Tắt trạng thái loading, lưu thông báo lỗi vào store
    //     state.isLoading = false;
    //     state.errorMessage = action.payload.message;
    // });
    // },
});
// export const { login } = productSlice.actions;
export default productSlice.reducer;
