import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
const ApprovalOutcheckModal = ({ onClose, onGoBack }) => {
    const navigate = useNavigate();
    const handleExit = () => {
        navigate('/approvalMain'); // 결재 메인 페이지로 이동
        onClose(); // 모달 닫기
    };
    return (_jsx("div", { style: modalOverlay, children: _jsxs("div", { style: modalContainer, children: [_jsxs("div", { style: modalHeader, children: [_jsx("span", { style: modalTitle, children: "\uC54C\uB9BC" }), _jsx("button", { style: closeButton, onClick: onClose, children: "\u2716" })] }), _jsxs("div", { style: messageContainer, children: [_jsxs("p", { style: mainMessage, children: ["\uC791\uC131\uC911\uC778 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4.", _jsx("br", {}), "\uB098\uAC00\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?"] }), _jsxs("p", { style: subMessage, children: ["\uC784\uC2DC\uC800\uC7A5\uD558\uC9C0 \uC54A\uACE0 \uD398\uC774\uC9C0\uB97C \uBC97\uC5B4\uB0A0 \uACBD\uC6B0,", _jsx("br", {}), "\uC9C0\uAE08\uAE4C\uC9C0 \uC791\uC131\uD55C \uB0B4\uC6A9\uC774 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4."] })] }), _jsxs("div", { style: buttonContainer, children: [_jsx("button", { style: backButton, onClick: onGoBack, children: "\uB4A4\uB85C\uAC00\uAE30" }), _jsx("button", { style: exitButton, onClick: handleExit, children: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uACE0 \uB098\uAC00\uAE30" })] })] }) }));
};
// ✅ **스타일 정의**
const modalOverlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};
const modalContainer = {
    width: "500px",
    background: "white",
    borderRadius: "8px",
    border: "1px solid black",
    padding: "20px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};
const modalHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "20px",
};
const modalTitle = {
    fontSize: "16px",
    fontWeight: "700",
    color: "#202224",
};
const closeButton = {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "13px",
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "black",
};
const messageContainer = {
    textAlign: "center",
    marginBottom: "20px",
};
const mainMessage = {
    fontSize: "15px",
    fontWeight: "700",
    color: "#202224",
    marginBottom: "15px",
};
const subMessage = {
    fontSize: "12px",
    fontWeight: "400",
    color: "#202224",
};
const buttonContainer = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    width: "100%",
};
const backButton = {
    width: "220px",
    height: "45px",
    background: "#4880FF",
    borderRadius: "12px",
    border: "2px solid #4880FF",
    color: "white",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    textAlign: "center",
};
const exitButton = {
    width: "220px",
    height: "45px",
    background: "white",
    borderRadius: "12px",
    border: "3px solid #4880FF",
    color: "#202224",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    textAlign: "center",
};
export default ApprovalOutcheckModal;
