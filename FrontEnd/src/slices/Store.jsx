import { configureStore } from "@reduxjs/toolkit";
import CartSlice from './CartSlice';
import ProductSlice from './ProductSlice';

const Store = configureStore({
    reducer: {
        cart: CartSlice,
        product: ProductSlice
    }
})

export default Store;