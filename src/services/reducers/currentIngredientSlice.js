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

export function addCurrent(item) {
    return async function addCurrentThunk(dispatch) {
        dispatch(addCurrentIngredient(item))
    }
}
export default currentIngredientSlice.reducer