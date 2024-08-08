import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store/store'; // Adjust the import according to your project structure

interface Product {
  _id: string;
  productName: string;
  productPrice: string;
  productDescription: string;
  productCategory: string;
  fileURL: string;
  __v: number;
}


interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setFilteredProducts: (state, action: PayloadAction<Product[]>) => {
      state.filteredProducts = action.payload;
    },
    setClearFilteredProducts: (state) => {
      state.filteredProducts = [];
    }
  },
});

export const { setProducts } = productsSlice.actions;

export const { setClearFilteredProducts } = productsSlice.actions;

export const { setFilteredProducts } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
