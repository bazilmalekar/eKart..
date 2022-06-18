import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {productsApi} from "./productsApi";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";

export default configureStore({
    reducer: {        
        cartSlice,
        auth: authSlice,
        [productsApi.reducerPath]: productsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(productsApi.middleware)
    }
});