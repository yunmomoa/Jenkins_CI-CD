import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination"; // 🔥 경로 확인 후 수정
export const ApprovalFooter = ({ pageInfo, setCurrentPage }) => {
    const navigate = useNavigate();
    return (_jsxs("div", { style: { width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }, children: [_jsx("div", { style: { width: "100%", display: "flex", justifyContent: "flex-end", marginRight: "100px" }, children: _jsx("button", { onClick: () => navigate('/ApprovalWritePage'), style: {
                        padding: "8px 16px",
                        backgroundColor: "#4880FF",
                        color: "white",
                        border: "none",
                        borderRadius: "14px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: 600,
                    }, children: "\uC791\uC131\uD558\uAE30" }) }), _jsx(Pagination, { pageInfo: pageInfo, setCurrentPage: setCurrentPage })] }));
};
