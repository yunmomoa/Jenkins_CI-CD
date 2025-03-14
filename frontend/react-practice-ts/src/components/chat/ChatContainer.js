import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import profileIcon from "../../assets/Images/chat/profile.png";
import chatIcon from "../../assets/Images/chat/chat.png";
import peopleIcon from "../../assets/Images/chat/people.png";
import bellIcon from "../../assets/Images/chat/bell.png";
import settingIcon from "../../assets/Images/chat/setting.png";
const ChatContainer = ({ children, onClose, onChatClick, onProfileClick, onOrgClick, OnAlarmClick, }) => {
    return (_jsxs("div", { className: "containerWrapper", style: {
            width: "390px",
            height: "560px",
            position: "relative",
            display: "flex",
            overflowX: "hidden" // 📌 좌우 스크롤 방지
        }, children: [_jsx("div", { className: "containerBackground", style: {
                    width: "390px", height: "570px", left: "0px", top: "0px", position: "absolute",
                    background: "white", /* boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",*/ borderRadius: "5px"
                } }), _jsx("div", { className: "containerSidebar", style: { width: "70px", height: "570px", left: "0px", top: "0px", position: "absolute", background: "#E9EBF1" } }), _jsx("img", { className: "profile", onClick: onProfileClick, style: { width: "31px", height: "31px", left: "20px", top: "20px", position: "absolute", cursor: "pointer" }, src: profileIcon, alt: "icon1" }), _jsx("img", { className: "chat", onClick: onChatClick, style: { width: "35px", height: "35px", left: "18px", top: "70px", position: "absolute", cursor: "pointer" }, src: chatIcon, alt: "icon2" }), _jsx("img", { className: "people", onClick: onOrgClick, style: { width: "31px", height: "31px", left: "20px", top: "120px", position: "absolute", cursor: "pointer" }, src: peopleIcon, alt: "icon3" }), _jsx("img", { className: "bell", onClick: OnAlarmClick, style: { width: "31px", height: "31px", left: "20px", top: "450px", position: "absolute", cursor: "pointer" }, src: bellIcon, alt: "icon4" }), _jsx("img", { className: "setting", style: { width: "31px", height: "31px", left: "20px", top: "505px", position: "absolute", cursor: "pointer" }, src: settingIcon, alt: "icon5" }), _jsx("div", { className: "containerContent", style: {
                    flex: 1,
                    position: "absolute",
                    top: "30px",
                    left: "70px",
                    width: "100%", // 📌 가로 길이를 자동으로 조정
                    height: "515px",
                    overflowY: "auto", // 세로 스크롤 유지
                    overflowX: "hidden", // 📌 좌우 스크롤 제거
                    paddingLeft: "15px",
                    marginTop: "-15px"
                }, children: children })] }));
};
export default ChatContainer;
