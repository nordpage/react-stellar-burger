import {AnyAction, createSlice, current, nanoid, ThunkDispatch} from "@reduxjs/toolkit";
import {BUN} from "../../utils/constants";
import update from "immutability-helper"
import {Ingredient} from "../../utils/types";
import {AppThunk} from "./store";

type Cart = {
    cart: {bun: Ingredient | null, ingredients: Ingredient[], sum: number}
}

const initialState : Cart = {
    cart : {bun: null, ingredients: [], sum: 0 }
}

export const burgerSlice = createSlice({
    name: "burger",
    initialState,
    reducers: {
        addToList: (state, action) => {
            const item = Object.assign({ key: nanoid() }, action.payload)
            state.cart.ingredients.push(item)
        },
        deleteFromList: (state, action) => {
            const newStateArray = [...current(state.cart.ingredients)]
            const index = newStateArray.indexOf(action.payload)
            state.cart.ingredients.splice(index, 1)
        },
        setBun: (state, action) => {
            state.cart.bun = Object.assign({key: nanoid()}, action.payload)
        },
        checkSum: (state) => {
            const ingredientsSum = state.cart.ingredients.length > 0 ? state.cart.ingredients.reduce((a,v) => a + v.price, 0) : 0
            state.cart.sum = state.cart.bun ? ingredientsSum + state.cart.bun.price * 2 : ingredientsSum
        },
        sorting: (state, action) => {
            state.cart.ingredients = update(state.cart.ingredients, {
                $splice: [
                    [action.payload.dragIndex, 1],
                    [action.payload.hoverIndex, 0, state.cart.ingredients[action.payload.dragIndex]],
                ],
            })
        },
        clearCart: (state) => {
            state.cart.ingredients = []
            state.cart.bun = null
            state.cart.sum = 0
        }
    },
});

export const {
    addToList,
    deleteFromList,
    setBun,
    checkSum,
    sorting,
    clearCart
} = burgerSlice.actions

export const addToBurger = (item: Ingredient) : AppThunk => dispatch => {
    item.type === BUN ? dispatch(setBun(item)) : dispatch(addToList(item))
    dispatch(checkSum())
}

export const removeIngredient = (item: Ingredient) : AppThunk => dispatch => {
    dispatch(deleteFromList(item))
    dispatch(checkSum())
}

export default burgerSlice.reducer
