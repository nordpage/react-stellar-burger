import {createSlice, current, nanoid} from "@reduxjs/toolkit";
import {BUN} from "../../utils/constants";
import update from "immutability-helper"

export const burgerSlice = createSlice({
    name: "burger",
    initialState: {
        cart : {bun: null, ingredients: [], sum: 0 }
    },
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

export function addIngredient (item){
    return async function addIngredientThunk(dispatch) {
        dispatch(addToList(item))
        dispatch(checkSum())
    }
}

export function addToBurger(item) {
    return async function addToBurgerThunk(dispatch) {
        item.type === BUN ? dispatch(setBun(item)) : dispatch(addToList(item))
        dispatch(checkSum())
    }
}

export function addBun(item) {
    return async function addBunThunk(dispatch) {
        dispatch(setBun(item))
        dispatch(checkSum())
    }
}

export function removeIngredient(item) {
    return async function removeIngredientThunk(dispatch) {
        dispatch(deleteFromList(item))
        dispatch(checkSum())
    }
}

export function getCounter(item) {

}

export default burgerSlice.reducer
