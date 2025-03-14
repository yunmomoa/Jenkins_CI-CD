import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
export const ApprovalRejectFooter = ({ selectedPosts, onDelete }) => {
    const navigate = useNavigate();
    return (_jsxs("div", { style: {
            display: "flex",
            justifyContent: "flex-end",
            padding: "20px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            gap: "10px"
        }, children: [_jsx("button", { style: {
                    width: 75,
                    height: 30,
                    background: "#4880FF",
                    borderRadius: 14,
                    border: "0.30px solid #B9B9B9",
                    color: "white",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                }, onClick: () => navigate('/ApprovalWritePage'), children: "\uC791\uC131\uD558\uAE30" }), _jsx("button", { style: {
                    width: 75,
                    height: 30,
                    background: "#FF5C5C",
                    borderRadius: 14,
                    border: "0.30px solid #B9B9B9",
                    color: "white",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                }, onClick: onDelete, children: "\uC0AD\uC81C" })] }));
};
