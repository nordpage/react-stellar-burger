import {createSlice} from "@reduxjs/toolkit";

export const feedSlice = createSlice({
    name: "feed",
    initialState : {
        orders: [],
        total: 0,
        totalToday: 0
    },
reducers: {
        updateData: (state, action) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
}
});

export const {
    updateData
} = feedSlice.actions

export default feedSlice.reducer