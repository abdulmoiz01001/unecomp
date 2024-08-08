import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface OrdersState {
  cartOrders: string[];
  carts: number;
}

const initialState: OrdersState = {
  cartOrders: [],
  carts: 0,
};

export const cartsSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
   
    clearCartsData: (state: OrdersState) => {
      state.cartOrders = [];

    },
    cartsCount: (state, action: PayloadAction<number>) => {
      state.carts = action.payload;
    },
    cartOrders: (state, action: PayloadAction<any>) => {
      state.cartOrders.push(action.payload);
    }
  },
});

export const { clearCartsData } = cartsSlice.actions;
export const { cartOrders } = cartsSlice.actions;
export const { cartsCount } = cartsSlice.actions;

export default cartsSlice.reducer;