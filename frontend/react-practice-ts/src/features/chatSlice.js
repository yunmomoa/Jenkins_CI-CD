import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    favorites: [],
    chatRooms: [],
    currentRoomNo: null,
    participants: [],
    unreadMessages: {},
    memberInvite: [],
};
const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setFavorites: (state, action) => {
            state.favorites = action.payload; // ✅ 이제 객체 배열을 Redux에 저장
        },
        addFavorite: (state, action) => {
            if (!state.favorites.some(fav => fav.userNo === action.payload.userNo)) { // ✅ userNo으로 비교
                state.favorites.push(action.payload);
            }
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(fav => fav.userNo !== action.payload); // ✅ userNo을 기준으로 제거
        },
        setCurrentRoom: (state, action) => {
            state.currentRoomNo = action.payload;
        },
        setParticipants: (state, action) => {
            state.participants = action.payload;
        },
        setUnreadMessages: (state, action) => {
            state.unreadMessages[action.payload.roomNo] = action.payload.count;
        },
        setMemberInvite: (state, action) => {
            state.memberInvite = action.payload;
        },
        setChatRooms: (state, action) => {
            // console.log("💬 Redux 상태 업데이트: 채팅방 목록 저장됨!", action.payload);
            state.chatRooms = action.payload; // ✅ 채팅방 목록 업데이트
        },
        addChatRoom: (state, action) => {
            console.log("💬 새로운 채팅방 추가됨:", action.payload);
            state.chatRooms.push(action.payload);
        },
    },
});
export const { setFavorites, addFavorite, removeFavorite, setCurrentRoom, setParticipants, setUnreadMessages, setMemberInvite, setChatRooms, addChatRoom, } = chatSlice.actions;
export default chatSlice.reducer;
