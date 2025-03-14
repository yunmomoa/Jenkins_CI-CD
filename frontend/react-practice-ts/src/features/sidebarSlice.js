import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isChatOpen: false,
};
const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        openChat: (state) => {
            state.isChatOpen = true;
        },
        closeChat: (state) => {
            state.isChatOpen = false;
        },
    },
});
export const { openChat, closeChat } = sidebarSlice.actions;
export default sidebarSlice.reducer;
