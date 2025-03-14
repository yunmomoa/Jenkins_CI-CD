import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import chatIcon from "../../assets/images/chat/chatBiggest.png";
import group from "../../assets/images/chat/groupChat.png";
import searchIcon from "../../assets/images/chat/search.png"; // 🔍 검색 아이콘 이미지 임포트 (파일경로는 네 프로젝트에 맞게 수정해)
import { useEffect } from "react";
const ChatCreate = ({ invitePeople, onClose, }) => {
    const [chatType, setChatType] = useState('');
    const [roomTitle, setRoomTitle] = useState('');
    // const handleInviteClick = () => {
    //   if (!chatType) {
    //     alert('채팅 종류를 선택해주세요!');
    //     return;
    //   }
    //   console.log("ChatCreate - handleInviteClick 실행됨!", chatType, roomTitle); // ✅ 확인용 로그 추가
    //   invitePeople(chatType, roomTitle);
    // };
    const handleInviteClick = () => {
        if (!chatType) {
            alert('채팅 종류를 선택해주세요!');
            return;
        }
        console.log("🔥 handleInviteClick 실행됨!");
        console.log("✅ 선택된 chatType:", chatType); // chatType 값 확인
        console.log("✅ 입력된 roomTitle:", roomTitle); // roomTitle 값 확인
        invitePeople(chatType, roomTitle);
    };
    useEffect(() => {
        console.log("✅ chatType 변경됨:", chatType);
    }, [chatType]); // chatType이 변경될 때마다 실행
    return (_jsxs("div", { className: "ChatCreate", style: {
            width: 390,
            height: 600,
            position: "relative",
        }, children: [_jsx("div", { className: "ChatCreate-Background", style: {
                    width: 390,
                    height: 560,
                    left: 0,
                    top: 0,
                    position: "absolute",
                    background: "white",
                    borderRadius: 5,
                } }), _jsx("div", { className: "ChatCreate-HeaderBackground", style: {
                    width: 390,
                    height: 170.18,
                    left: 0,
                    top: 0,
                    position: "absolute",
                    background: "#E9EBF1",
                    borderRadius: 5,
                } }), _jsx("div", { className: "ChatCreate-TitleWrapper", style: {
                    width: 95,
                    height: 19.64,
                    paddingBottom: 1.64,
                    paddingRight: 6.16,
                    left: 23,
                    top: 19.64,
                    position: "absolute",
                    borderRadius: 5,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    display: "inline-flex",
                }, children: _jsx("button", { onClick: onClose, style: {
                        position: "absolute",
                        left: 325,
                        background: "transparent",
                        border: "none",
                        fontSize: 18,
                        cursor: "pointer",
                    }, children: "\u2190" }) }), _jsxs("div", { onClick: () => {
                    console.log("🔥 1:1 채팅 버튼 클릭됨");
                    setChatType('1:1');
                }, style: {
                    position: "absolute",
                    top: "60px",
                    left: "110px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                }, children: [_jsx("img", { className: "chat", style: { width: "70px", height: "70px", marginTop: "-25px" }, src: chatIcon, alt: "1:1 \uCC44\uD305 \uC544\uC774\uCF58" }), _jsx("span", { style: {
                            marginTop: "8px",
                            fontSize: "14px",
                            fontFamily: "Inter",
                            fontWeight: "600",
                            color: "#202224",
                        }, children: "1:1 \uCC44\uD305" })] }), _jsxs("div", { onClick: () => setChatType('그룹'), style: {
                    position: "absolute",
                    top: "60px",
                    left: "230px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                }, children: [_jsx("img", { className: "group-chat", style: { width: "70px", height: "70px", marginTop: "-25px" }, src: group, alt: "\uADF8\uB8F9 \uCC44\uD305 \uC544\uC774\uCF58" }), _jsx("span", { style: {
                            marginTop: "8px",
                            fontSize: "14px",
                            fontFamily: "Inter",
                            fontWeight: "600",
                            color: "#202224",
                        }, children: "\uADF8\uB8F9 \uCC44\uD305" })] }), _jsx("div", { className: "ChatCreate-InfoCard", style: {
                    width: 300,
                    height: 190,
                    left: 50,
                    top: 192,
                    position: "absolute",
                    background: "white",
                    borderRadius: 5,
                    border: "0.50px #979797 solid",
                } }), _jsx("div", { className: "ChatCreate-InfoHeader", style: {
                    width: 300,
                    height: 29.45,
                    left: 50,
                    top: 192,
                    position: "absolute",
                    background: "#4880FF",
                    borderRadius: "5px 5px 0 0",
                    border: "0.50px #979797 solid",
                } }), _jsx("div", { className: "ChatCreate-InfoHeaderText", style: {
                    position: "absolute",
                    left: 68,
                    top: 195.8,
                    color: "white",
                    fontSize: 16,
                    fontFamily: "Inter",
                    fontWeight: "600",
                }, children: "\uCC44\uD305\uBC29 \uC815\uBCF4\uC124\uC815" }), _jsx("div", { style: {
                    position: "absolute",
                    left: 73,
                    top: 243,
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    color: "#979797",
                }, children: "\uCC44\uD305\uBC29 \uC774\uB984" }), _jsx("input", { type: "text", placeholder: "\uBC29 \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694", value: roomTitle, onChange: (e) => setRoomTitle(e.target.value), style: {
                    position: "absolute",
                    left: 73,
                    top: 265,
                    width: "240px",
                    height: "25px",
                    paddingLeft: "10px",
                    border: "1px solid #B3B3B3",
                    borderRadius: "3px",
                } }), _jsx("div", { onClick: handleInviteClick, style: {
                    position: "absolute",
                    left: 73,
                    top: 298,
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    color: "#979797",
                    cursor: "pointer",
                }, children: "\uB300\uD654\uC0C1\uB300 \uCD08\uB300" }), _jsxs("div", { style: {
                    cursor: "pointer",
                    position: "absolute",
                    left: 73,
                    top: 320,
                    width: "254px",
                    height: "25px",
                    backgroundColor: "#E9EBF1",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "8px",
                    borderRadius: "3px",
                    color: "#B3B3B3",
                    fontSize: "11px",
                    fontFamily: "Roboto",
                }, onClick: handleInviteClick, children: ["\uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694", _jsx("img", { src: searchIcon, alt: "\uAC80\uC0C9", style: { width: "18px", height: "18px", marginLeft: "auto", marginRight: "8px" } })] })] }));
};
export default ChatCreate;
