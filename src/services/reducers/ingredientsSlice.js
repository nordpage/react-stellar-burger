import {createSelector, createSlice} from "@reduxjs/toolkit";
import {BUN, MAIN, SAUCE} from "../../utils/constants";
import { v4 as uuidv4 } from 'uuid';

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState: {
        ingredients: []
    },
    reducers: {
        addAll: (state, action) => {
            const items = action.payload
            state.ingredients = items.map(item => ({
                ...item,
                uid: uuidv4()
            }))
        }
    }
});

export const {
    addAll,
} = ingredientsSlice.actions

export const getIngredients = (state) => state.ingredients.ingredients

const sectionName = (type) => {
    switch (type) {
        case BUN:
            return "Булки";
        case SAUCE:
            return "Соусы";
        case MAIN:
            return "Начинки";

    }
}

export const getIngredientsSelector = createSelector(getIngredients, (ingredients) => {
    const ingredientsMap = new Map();

    if (ingredients !== undefined && ingredients.length > 0) {
        ingredients.forEach((ingredient) => ingredientsMap.set(ingredient.type, {
            name: sectionName(ingredient.type),
            ingredients: ingredients.filter(item => item.type === ingredient.type)
        }));
    }
    return ingredientsMap;
})

export default ingredientsSlice.reducer