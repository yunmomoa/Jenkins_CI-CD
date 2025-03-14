import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
const ChatModal = ({ isOpen, onClose, children }) => {
    const nodeRef = useRef(null);
    if (!isOpen)
        return null;
    return ReactDOM.createPortal(_jsx(Draggable, { handle: ".chat-drag-handle", children: _jsxs("div", { ref: nodeRef, style: {
                position: "fixed",
                top: "100px",
                left: "100px",
                width: "391px",
                height: "598px",
                zIndex: 1000,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                // flex 레이아웃으로 변경
                display: "flex",
                flexDirection: "column",
            }, children: [_jsxs("div", { className: "chat-drag-handle", style: {
                        padding: "18px",
                        backgroundColor: "#E9EBF1",
                        cursor: "move",
                        display: "flex",
                        justifyContent: "space-between",
                        // 필요하다면 정확한 높이를 지정해도 됨 (예: height: '50px')
                    }, children: [_jsx("div", { className: "containerHeaderLogoWrapper", style: {
                                position: "absolute",
                                left: "12px",
                                top: "7px",
                                fontSize: "16px",
                                fontFamily: "'Nunito Sans', sans-serif",
                                fontWeight: 800,
                                color: "#4880FF",
                                display: "inline-block",
                            }, children: "Workly" }), _jsx("button", { onClick: onClose, style: {
                                position: "absolute",
                                top: "9px",
                                right: "10px",
                                zIndex: 10,
                                background: "transparent",
                                border: "none",
                                fontSize: "18px",
                                cursor: "pointer",
                            }, children: "\u00D7" })] }), _jsx("div", { style: { flex: 1, }, children: children })] }) }), document.body);
};
export default ChatModal;
