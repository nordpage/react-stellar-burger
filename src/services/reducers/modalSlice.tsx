import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        modal: {isOpen: false, type: null}
    },
    reducers: {
        openModal: (state, action) => {
            state.modal.isOpen = true;
            state.modal.type = action.payload
        },
        closeModal: (state) => {
            state.modal.isOpen = false;
            state.modal.type = null
        },
    }
});

export const {
    openModal,
    closeModal
} = modalSlice.actions
export const modalSelector = (state: RootState) => state.modal

export default modalSlice.reducer