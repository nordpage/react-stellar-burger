import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {burgerApi} from "./burgerApi";
import {burgerSlice} from "./burgerSlice";
import {orderSlice} from "./orderSlice";
import {modalSlice} from "./modalSlice";
import {apiSlice} from "./apiSlice";
import authReducer from './authSlice'
import {feedSlice} from "./feedSlice";

export const store = configureStore({
    reducer: {
        [burgerApi.reducerPath]: burgerApi.reducer,
        [apiSlice.reducerPath] : apiSlice.reducer,
        feed: feedSlice.reducer,
        burger: burgerSlice.reducer,
        order: orderSlice.reducer,
        modal: modalSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(burgerApi.middleware).concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;


