import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export const ApprovalCompleteFooter = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    return (_jsxs("footer", { style: {
            display: "flex",
            justifyContent: "center", // ✅ 버튼들을 중앙으로 배치
            alignItems: "center",
            padding: "20px 20px",
            width: "100%",
            gap: "700px", // ✅ 그룹 사이 간격 조정
        }, children: [_jsx("div", { children: _jsx("button", { style: {
                        width: 75,
                        height: 30,
                        background: "#4880FF",
                        borderRadius: 14,
                        border: "0.30px solid #B9B9B9",
                        color: "white",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }, onClick: () => navigate('/approvalMain'), children: "\uBAA9\uB85D" }) }), _jsx("button", { style: {
                    width: 75,
                    height: 30,
                    background: "#FF5C5C",
                    borderRadius: 14,
                    border: "0.30px solid #B9B9B9",
                    color: "white",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }, onClick: () => navigate('/approvalMain/ApprovalWriteDetailPage'), children: "\uD68C\uC218" })] }));
};
