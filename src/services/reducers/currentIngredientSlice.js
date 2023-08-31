import {createSlice} from "@reduxjs/toolkit";

export const currentIngredientSlice = createSlice({
    name: "currentIngredient",
    initialState: {currentIngredient: null },
    reducers: {
        addCurrentIngredient: (state, action) => {
            state.currentIngredient = action.payload
        },
    }
});

export const {
    addCurrentIngredient
} = currentIngredientSlice.actions

export default currentIngredientSlice.reducer