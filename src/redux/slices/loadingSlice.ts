import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from '../../types/data.interfaces';

const initialState: LoadingState = {
    isLoading: false,
    loadingItems: {},
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setLoadingItem: (
            state,
            action: PayloadAction<{ id: string; isLoading: boolean }>
        ) => {
            state.loadingItems[action.payload.id] = action.payload.isLoading;
        },
    },
});

export const { setLoading, setLoadingItem } = loadingSlice.actions;
export default loadingSlice.reducer;