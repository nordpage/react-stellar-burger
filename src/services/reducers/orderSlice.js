import {createSlice} from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name:"order",
    initialState: {
        order: {orderNumber: 0}
    },
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