import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import chatPlus from "../../assets/images/chat/chatplus.png";
//import ChatCreate from "./ChatCreate";
const ChatNewList = ({ setIsCreatingChat, setIsFirstChatOpen, }) => {
    return (_jsxs("div", { className: "ChatNewList", style: {
            width: "245px",
            height: "490px",
            background: "#FFFFFF",
            borderRadius: "8px",
            padding: "8px 10px",
            fontFamily: "'Roboto', sans-serif",
            display: "flex",
            flexDirection: "column",
            position: "relative",
        }, children: [_jsxs("div", { className: "ChatNewList-header", style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }, children: [_jsx("div", { className: "ChatNewList-title", style: {
                            fontSize: "24px",
                            fontFamily: "Nunito Sans",
                            fontWeight: "800",
                            color: "#4880FF",
                        }, children: "Chatting" }), _jsx("img", { className: "ChatNewList-icon", style: { width: "30px", height: "30px", cursor: "pointer" }, src: chatPlus, alt: "icon", onClick: () => { setIsCreatingChat(true); setIsFirstChatOpen(false); } })] }), _jsx("div", { className: "ChatNewList-message", style: {
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#202224",
                    marginBottom: "20px",
                }, children: "\uC874\uC7AC\uD558\uB294 \uCC44\uD305\uBC29\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }), _jsx("div", { className: "ChatNewList-create-wrapper", style: {
                    background: "#E9EBF1",
                    borderRadius: "5px",
                    height: "31px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                }, onClick: () => { setIsCreatingChat(true); setIsFirstChatOpen(false); }, children: _jsx("span", { className: "ChatNewList-create-text", style: {
                        fontSize: "12px",
                        fontFamily: "Roboto",
                        fontWeight: "500",
                        color: "#202224",
                    }, children: "\uC0C8\uB85C\uC6B4 \uCC44\uD305\uBC29 \uB9CC\uB4E4\uAE30" }) })] }));
};
export default ChatNewList;
