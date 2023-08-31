import {configureStore} from "@reduxjs/toolkit";
import {burgerApi} from "./burgerApi";
import {burgerSlice} from "./burgerSlice";
import {ingredientsSlice} from "./ingredientsSlice";
import {currentIngredientSlice} from "./currentIngredientSlice";
import {orderSlice} from "./orderSlice";
import {modalSlice} from "./modalSlice";


const store = configureStore({
    reducer: {
        [burgerApi.reducerPath]: burgerApi.reducer,
         burger: burgerSlice.reducer,
        ingredients: ingredientsSlice.reducer,
        currentIngredient: currentIngredientSlice.reducer,
        order: orderSlice.reducer,
        modal: modalSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(burgerApi.middleware)
})

export default store