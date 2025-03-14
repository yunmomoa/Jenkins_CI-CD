import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ko";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
// 아이콘 이미지 import (경로는 실제 프로젝트에 맞게 수정)
import speaker from "../../assets/images/chat/loud-speaker 11.png";
import profileDefault from "../../assets/images/chat/profile.png";
const backendHost = "192.168.130.8";
dayjs.extend(utc);
const DEFAULT_CHATROOM_NO = 0;
// 그룹챗에서 사용한 함수와 동일하게 작성 (DB 시간은 UTC)
const formatTime = (dateTimeString) => {
    if (!dateTimeString)
        return "";
    // DB의 UTC 값을 한국 로컬 시간으로 변환하여 "HH:mm" (예: 22:01) 형식으로 출력
    return dayjs.utc(dateTimeString, "YYYY-MM-DD HH:mm:ss").local().format("HH:mm");
};
const formatDate = (dateTimeString) => {
    if (!dateTimeString)
        return "";
    // 날짜 구분선에 사용, "YYYY년 MM월 DD일 dddd" 형식
    return dayjs.utc(dateTimeString, "YYYY-MM-DD HH:mm:ss").local().format("YYYY년 MM월 DD일 dddd");
};
function getDateKey(dateString) {
    if (!dateString)
        return null;
    const parsed = dayjs.utc(dateString, "YYYY-MM-DD HH:mm:ss");
    if (!parsed.isValid())
        return null;
    return parsed.local().format("YYYY-MM-DD");
}
const NoticeChat = ({ onClose }) => {
    const currentUser = useSelector((state) => state.user);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const chatContainerRef = useRef(null);
    const stompClientRef = useRef(null);
    // 초기 메시지 로딩 (axios)
    useEffect(() => {
        axios
            .get(`http://${backendHost}:8003/workly/api/chat/messages/${DEFAULT_CHATROOM_NO}`)
            .then((res) => setMessages(res.data))
            .catch((error) => console.error("❌ 채팅 메시지 불러오기 실패", error));
    }, []);
    // STOMP 클라이언트 설정 및 "/sub/noticeChat" 구독
    useEffect(() => {
        const sock = new SockJS(`http://${backendHost}:8003/workly/ws-stomp`);
        const client = new Client({
            webSocketFactory: () => sock,
            reconnectDelay: 5000,
            debug: (str) => console.log("STOMP:", str),
            onConnect: () => {
                console.log("STOMP 연결 성공");
                client.subscribe("/sub/noticeChat", (message) => {
                    if (message.body) {
                        const receivedMsg = JSON.parse(message.body);
                        setMessages((prev) => [...prev, receivedMsg]);
                    }
                });
            },
        });
        client.activate();
        stompClientRef.current = client;
        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
            }
        };
    }, []);
    // 메시지 업데이트 시 스크롤 하단 이동
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    // STOMP를 이용한 메시지 전송 함수
    const sendMessage = () => {
        if (!inputMessage.trim() ||
            !stompClientRef.current ||
            !stompClientRef.current.connected)
            return;
        const newMessage = {
            chatRoomNo: DEFAULT_CHATROOM_NO,
            userNo: currentUser.userNo,
            userName: currentUser.userName,
            message: inputMessage,
            // 전송 시 한국 로컬시간을 UTC로 변환하여 "YYYY-MM-DD HH:mm:ss" 형식으로 보내기
            receivedDate: dayjs().utc().format("YYYY-MM-DD HH:mm:ss"),
            profileImg: currentUser.profileImg || profileDefault,
        };
        stompClientRef.current.publish({
            destination: "/pub/noticeChat/sendMessage",
            body: JSON.stringify(newMessage),
        });
        setInputMessage("");
    };
    return (_jsxs("div", { style: {
            width: 390,
            height: 560,
            position: "relative",
            background: "white",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: 5,
        }, children: [_jsx(ToastContainer, {}), _jsx("img", { src: speaker, alt: "speaker icon", style: {
                    width: 30,
                    height: 30,
                    position: "absolute",
                    left: 185,
                    top: 20,
                } }), _jsx("div", { style: {
                    position: "absolute",
                    left: 85,
                    top: 26,
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Nunito Sans",
                    fontWeight: "700",
                }, children: "\uC0AC\uB0B4\uACF5\uC9C0 \uD1A1\uBC29" }), _jsx("div", { style: {
                    width: 40,
                    height: 40,
                    position: "absolute",
                    left: 28,
                    top: 21,
                    background: "#D9D9D9",
                    borderRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }, children: _jsx("img", { src: profileDefault, alt: "profile", style: {
                        width: 22,
                        height: 22,
                        objectFit: "cover",
                    } }) }), _jsx("div", { className: "noticechat-close-icon", style: {
                    position: "absolute",
                    left: 359,
                    top: 22,
                    cursor: "pointer",
                    fontSize: 20,
                    fontWeight: "bold",
                }, onClick: onClose, children: "\u2190" }), _jsx("div", { ref: chatContainerRef, style: {
                    position: "absolute",
                    top: 85,
                    left: 20,
                    right: 20,
                    bottom: 120,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                }, children: messages.map((msg, index) => {
                    const isNewDay = index === 0 ||
                        formatDate(messages[index - 1].receivedDate) !== formatDate(msg.receivedDate);
                    return (_jsxs("div", { children: [isNewDay && (_jsx("div", { style: {
                                    textAlign: "center",
                                    marginBottom: 10,
                                    color: "#4880FF",
                                    fontSize: 11,
                                }, children: formatDate(msg.receivedDate) })), _jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-start" }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", marginBottom: 10 }, children: [_jsx("img", { src: msg.profileImg || profileDefault, alt: "sender profile", style: {
                                                    width: 22,
                                                    height: 22,
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                    marginRight: 5,
                                                } }), _jsx("span", { style: { fontSize: "15px", fontWeight: "600", color: "#333" }, children: msg.userName })] }), _jsx("div", { style: {
                                            background: "#D2E3FF",
                                            padding: "10px",
                                            borderRadius: "7px",
                                            fontSize: "13px",
                                            color: "black",
                                            maxWidth: "270px",
                                        }, children: msg.message }), _jsx("div", { style: { fontSize: "10px", color: "#B3B3B3", marginTop: 2 }, children: formatTime(msg.receivedDate) })] })] }, msg.chatNo));
                }) }), _jsx("textarea", { value: inputMessage, onChange: (e) => setInputMessage(e.target.value), onKeyDown: (e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                    }
                }, placeholder: "\uBA54\uC138\uC9C0 \uC785\uB825", maxLength: 5000, style: {
                    position: "absolute",
                    bottom: 35,
                    left: 20,
                    width: 350,
                    height: 70,
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    padding: "10px",
                    fontSize: "14px",
                    resize: "none",
                    overflowY: "auto",
                } })] }));
};
export default NoticeChat;
