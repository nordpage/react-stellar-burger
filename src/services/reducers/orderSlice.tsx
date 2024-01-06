import {createSlice} from "@reduxjs/toolkit";

type Order = {
    order: { orderNumber: number }
}

const initialState: Order = {
    order: {orderNumber: 0}
}
export const orderSlice = createSlice({
    name:"order",
    initialState,
    reducers: {
        addOrderNumber: (state, action) =>{
            state.order.orderNumber = action.payload;
        },
    }
});

export const {
    addOrderNumber
} = orderSlice.actions

export default orderSlice.reducer