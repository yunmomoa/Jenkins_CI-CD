import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setChatRooms } from "../../features/chatSlice"; // ✅ Redux 저장 액션
import axios from "axios";
import chatPlus from "../../assets/Images/chat/chatplus.png";
import profile from "../../assets/Images/chat/profile.png";
const ChatList = ({ setIsCreatingChat, openNoticeChat, openChatRoom }) => {
    const dispatch = useDispatch();
    const reduxChatRooms = useSelector((state) => state.chat.chatRooms);
    const userNo = useSelector((state) => state.user.userNo);
    const [isLoading, setIsLoading] = useState(true); // ✅ 초기 로딩 상태 추가
    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                //console.log("📌 채팅 목록 불러오기 시작");
                // ✅ 1️⃣ LocalStorage에서 채팅 목록 가져오기
                const localChatRooms = localStorage.getItem(`chatRooms_${userNo}`);
                if (localChatRooms) {
                    // console.log("🔹 LocalStorage에서 불러온 채팅방 목록:", JSON.parse(localChatRooms));
                    dispatch(setChatRooms(JSON.parse(localChatRooms))); // Redux 상태 업데이트
                }
                // ✅ 2️⃣ 백엔드에서 최신 채팅 목록 가져오기
                const response = await axios.get(`http://localhost:8003/workly/api/chat/list/${userNo}`);
                // console.log("📌 백엔드 응답:", response.data);
                if (response.data.length > 0) {
                    //  console.log("📢 Redux에 저장될 데이터:", response.data);
                    // ✅ 3️⃣ Redux 및 LocalStorage 동기화
                    dispatch(setChatRooms(response.data));
                    localStorage.setItem(`chatRooms_${userNo}`, JSON.stringify(response.data));
                }
                else {
                    console.warn("⚠️ 백엔드에서 빈 배열이 반환됨.");
                }
            }
            catch (error) {
                console.error("❌ 채팅방 목록 불러오기 실패:", error);
            }
            finally {
                setIsLoading(false); // ✅ 데이터 로드 완료 후 로딩 해제
            }
        };
        if (userNo) {
            fetchChatRooms();
        }
    }, [dispatch, userNo]);
    if (isLoading) {
        return _jsx("p", { children: "\u23F3 \uB85C\uB529 \uC911..." }); // ✅ 로딩 중이면 UI 표시
    }
    return (_jsxs("div", { style: {
            width: 280,
            height: 420,
            position: "relative",
            background: "white",
            borderRadius: 8,
        }, children: [_jsxs("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    alignItems: "center",
                }, children: [_jsx("span", { style: { fontSize: 20, fontWeight: "bold", color: "#4880FF" }, children: "Chatting" }), _jsx("div", { style: { display: "flex", gap: 8 }, children: _jsx("img", { src: chatPlus, alt: "add", style: { width: 25, height: 25, cursor: "pointer" }, onClick: () => setIsCreatingChat(true) }) })] }), _jsx("div", { style: {
                    padding: "8px 12px",
                    color: "#4880FF",
                    fontWeight: "bold",
                    cursor: "pointer",
                }, onClick: openNoticeChat, children: "\uC0AC\uB0B4 \uACF5\uC9C0 \uD1A1\uBC29" }), reduxChatRooms.length > 0 ? (reduxChatRooms.map((room) => (_jsxs("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 12px",
                    position: "relative",
                    cursor: "pointer",
                }, onClick: () => openChatRoom(room), children: [_jsx("div", { className: "mineProfile", style: {
                            width: "40px",
                            height: "40px",
                            background: "#D9D9D9",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                        }, children: _jsx("img", { className: "ProfileIcon", style: { width: "22px", height: "22px", objectFit: "cover" }, src: profile, alt: "profile" }) }), _jsxs("div", { style: { flexGrow: 1 }, children: [_jsx("div", { style: { fontWeight: 600, marginLeft: 15, cursor: "pointer" }, children: room.roomTitle }), _jsx("div", { style: {
                                    cursor: "pointer",
                                    fontSize: 12,
                                    color: room.isActive ? "#4880FF" : "#999999",
                                    marginLeft: 15,
                                }, children: room.isActive ? "활성화" : "비활성화" })] })] }, room.chatRoomNo)))) : (_jsx("p", { style: { textAlign: "center", color: "#888" }, children: "\uCC44\uD305\uBC29\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }))] }));
};
export default ChatList;
