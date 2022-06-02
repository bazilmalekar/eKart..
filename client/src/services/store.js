import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {productsApi} from "./productsApi";
import cartSlice from "./cartSlice";

export default configureStore({
    reducer: {
        cartSlice,
        [productsApi.reducerPath]: productsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(productsApi.middleware)
    }
});