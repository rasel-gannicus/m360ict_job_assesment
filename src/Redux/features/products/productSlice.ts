import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  searchQuery: string;
}

const initialState: ProductState = {
  searchQuery: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer;