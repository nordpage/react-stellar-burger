import {createSlice} from "@reduxjs/toolkit";

export const feedSlice = createSlice({
    name: "feed",
    initialState: {
        feed: []
    },
    reducers: {
        updateFeeds: (state, action) => {
            state.feed = action.payload
        }
    }
});

export const {
    updateFeeds
} = feedSlice.actions

export default feedSlice.reducer