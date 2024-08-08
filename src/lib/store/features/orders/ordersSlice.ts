import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface OrdersState {
  orders: string[];
  // cartOrders: string[];
}

const initialState: OrdersState = {
  orders: [],
  // cartOrders: [],
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<any>) {
      state.orders.push(action.payload);
    },
    clearData: (state: OrdersState) => {
      state.orders = [];
      // state.cartOrders = [];
    },
    // cartOrders: (state, action: PayloadAction<string>) => {
    //   state.cartOrders.push(action.payload);
    // }
  },
});

export const { addOrder } = ordersSlice.actions;
export const { clearData } = ordersSlice.actions;
// export const { cartOrders } = ordersSlice.actions;

export default ordersSlice.reducer;