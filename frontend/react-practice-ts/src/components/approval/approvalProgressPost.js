import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
export const ApprovalProgressPost = ({ filteredPosts, currentPage, postsPerPage }) => {
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), "yyyy.MM.dd a hh:mm", { locale: ko });
        }
        catch (error) {
            console.error("날짜 포맷팅 오류:", error);
            return dateString;
        }
    };
    // 현재 페이지의 게시글만 표시
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    return (_jsx("div", { style: containerStyle, children: _jsxs("table", { style: tableStyle, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { style: thStyle, children: "\uAD6C\uBD84" }), _jsx("th", { style: thStyle, children: "\uAE30\uC548\uBC88\uD638" }), _jsx("th", { style: thStyle }), _jsx("th", { style: thStyle, children: "\uC81C\uBAA9" }), _jsx("th", { style: thStyle, children: "\uAE30\uC548\uC77C" }), _jsx("th", { style: thStyle, children: "\uC0C1\uD0DC" })] }) }), _jsx("tbody", { children: currentPosts.length > 0 ? (currentPosts.map((post) => (_jsxs("tr", { style: rowStyle, onClick: () => navigate(`/approvalCompletePage/${post.approvalNo}`), children: [_jsx("td", { style: tdStyle, children: post.approvalType }), _jsx("td", { style: tdStyle, children: `기안-${post.approvalNo}` }), _jsx("td", { style: tdStyle, children: post.approvalUser }), _jsx("td", { style: tdTitleStyle, children: post.approvalTitle }), _jsx("td", { style: tdStyle, children: formatDate(post.startDate) }), _jsx("td", { style: tdStyle, children: _jsx("span", { style: statusStyle, children: "\uC9C4\uD589\uC911" }) })] }, post.approvalNo)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 6, style: { textAlign: "center", padding: "20px", fontSize: "14px", color: "#888" }, children: "\uC9C4\uD589\uC911\uC778 \uACB0\uC7AC \uB9AC\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) })) })] }) }));
};
// ✅ 스타일 추가
const containerStyle = {
    width: "100%",
    padding: "20px",
    backgroundColor: "#fff",
};
const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
};
const thStyle = {
    padding: "12px",
    borderBottom: "2px solid #202224",
    fontSize: "13px",
    fontWeight: "bold",
    textAlign: "center",
};
const rowStyle = {
    borderBottom: "1px solid #E0E0E0",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#F8F9FA",
    },
};
const tdStyle = {
    padding: "12px",
    fontSize: "12px",
    color: "#202224",
    textAlign: "center",
};
const tdTitleStyle = {
    ...tdStyle,
    textAlign: "left",
};
const statusStyle = {
    padding: "5px 10px",
    borderRadius: "4px",
    backgroundColor: "#ffa500",
    color: "#FFF ",
    fontSize: "12px",
    fontWeight: "bold",
};
