import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from 'apis';
export const getNewProducts = createAsyncThunk('product/newProducts', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetProducts({ sort: '-createdAt' });
    if (!response.success) return rejectWithValue(response);
    return response.products;
});
export const getBestSellerProduct = createAsyncThunk('product/bestSeller', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetProducts({ sort: '-sold' });
    if (!response.success) return rejectWithValue(response);
    return response.products;
});
export const getSmartphoneProduct = createAsyncThunk('product/smartphone', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetProducts({ limit: 6, category: 'Smartphone' });
    if (!response.success) return rejectWithValue(response);
    return response.products;
});
export const getTabletProduct = createAsyncThunk('product/tablet', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetProducts({ limit: 6, category: 'Tablet' });
    if (!response.success) return rejectWithValue(response);
    return response.products;
});
export const getLaptopProduct = createAsyncThunk('product/laptop', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetProducts({ limit: 6, category: 'Laptop' });
    if (!response.success) return rejectWithValue(response);
    return response.products;
});
