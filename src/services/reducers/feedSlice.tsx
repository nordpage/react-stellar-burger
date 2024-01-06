import {createSlice} from "@reduxjs/toolkit";
import {Feed} from "../../utils/types";
import {RootState} from "./store";

const initialState: Feed = {
    orders: [],
    total: 0,
    totalToday: 0
}
export const feedSlice = createSlice({
    name: "feed",
    initialState,
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

export const feedSelector = (state: RootState) => state.feed

export default feedSlice.reducer