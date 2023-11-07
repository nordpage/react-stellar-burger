import {configureStore} from "@reduxjs/toolkit";
import {burgerApi} from "./burgerApi";
import {burgerSlice} from "./burgerSlice";
import {ingredientsSlice} from "./ingredientsSlice";
import {orderSlice} from "./orderSlice";
import {modalSlice} from "./modalSlice";
import {apiSlice} from "./apiSlice";
import authReducer from './authSlice'


const store = configureStore({
    reducer: {
        [burgerApi.reducerPath]: burgerApi.reducer,
        [apiSlice.reducerPath] : apiSlice.reducer,
        burger: burgerSlice.reducer,
        ingredients: ingredientsSlice.reducer,
        order: orderSlice.reducer,
        modal: modalSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(burgerApi.middleware).concat(apiSlice.middleware)
})

export default store