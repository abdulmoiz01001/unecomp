import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './features/search/searchSlice'
import userReducer from './features/user/userSlice'
import orderReducer  from './features/orders/ordersSlice'
import cartsReducer from './features/carts/cartsSlice'
import productsReducer from './features/products/productsSlice';


export const makeStore = () => {
return configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    order: orderReducer,
    carts: cartsReducer,
    products: productsReducer,
  },
})
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']