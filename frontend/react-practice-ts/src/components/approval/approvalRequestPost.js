import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { format, addHours } from "date-fns";
import { ko } from "date-fns/locale";
import { ApprovalMark } from "./approvalMark";
export const ApprovalRequestPost = ({ filteredPosts, currentPage, postsPerPage }) => {
    const navigate = useNavigate();
    // ✅ 13자리 숫자를 한국 시간(KST) 형식으로 변환하는 함수
    const formatKST = (timestamp) => {
        if (!timestamp)
            return "N/A";
        let ts = Number(timestamp);
        if (ts.toString().length === 10) {
            ts *= 1000; // 초 단위(10자리) → 밀리초(13자리) 변환
        }
        const date = addHours(new Date(ts), 9); // UTC → KST 변환 (9시간 추가)
        return format(date, "yyyy. MM. dd. a hh:mm", { locale: ko });
    };
    // 현재 페이지의 게시물 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    // 기존 handleRowClick 함수 유지
    const handleRowClick = (approvalNo) => {
        window.location.href = `/ApprovalConfirmPage/${approvalNo}`;
    };
    return (_jsx("div", { style: containerStyle, children: _jsxs("table", { style: tableStyle, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { style: thStyle }), _jsx("th", { style: thStyle, children: "\uAD6C\uBD84" }), _jsx("th", { style: thStyle, children: "\uAE30\uC548\uBC88\uD638" }), _jsx("th", { style: thStyle, children: "\uAE30\uC548\uC790" }), _jsx("th", { style: thStyle, children: "\uC81C\uBAA9" }), _jsx("th", { style: thStyle, children: "\uAE30\uC548\uC77C" }), _jsx("th", { style: thStyle, children: "\uC0C1\uD0DC" })] }) }), _jsx("tbody", { children: currentPosts.length > 0 ? (currentPosts.map((post) => (_jsxs("tr", { style: { ...rowStyle, cursor: "pointer" }, onClick: () => handleRowClick(post.approvalNo), children: [_jsx("td", { style: tdIconStyle, children: _jsx(ApprovalMark, { isUnread: post.isUnread }) }), _jsx("td", { style: tdStyle, children: post.approvalType }), _jsx("td", { style: tdStyle, children: `기안-${post.approvalNo}` }), _jsx("td", { style: tdStyle, children: post.userName }), _jsx("td", { style: tdTitleStyle, children: post.approvalTitle }), _jsx("td", { style: tdStyle, children: formatKST(post.startDate) }), _jsx("td", { style: tdStyle, children: _jsx("span", { style: getStatusStyle(post.approvalStatus), children: getStatusText(post.approvalStatus) }) })] }, post.approvalNo)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 7, style: emptyRowStyle, children: "\uC694\uCCAD\uB41C \uACB0\uC7AC \uB9AC\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) })) })] }) }));
};
// ✅ 스타일 정의
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
const tdIconStyle = {
    ...tdStyle,
    width: "20px",
};
const rowStyle = {
    borderBottom: "1px solid #E0E0E0",
};
const emptyRowStyle = {
    padding: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#888",
};
const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '5px',
    marginTop: '20px',
};
const paginationButtonStyle = {
    padding: '5px 10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
};
// ✅ 상태 텍스트 변환 함수
const getStatusText = (status) => {
    switch (status) {
        case 1: return "진행중";
        case 2: return "완료";
        case 3: return "반려";
        default: return "알 수 없음";
    }
};
// ✅ 상태 스타일 함수
const getStatusStyle = (status) => {
    let baseStyle = {
        padding: "5px 10px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: 700,
        minWidth: "60px",
        display: "inline-block",
        textAlign: "center",
    };
    switch (status) {
        case 2:
            return { ...baseStyle, background: "#3E7BE6", color: "white" };
        case 1:
            return { ...baseStyle, background: "#ffa500", color: "white" };
        case 3:
            return { ...baseStyle, background: "#EB0909", color: "white" };
        default:
            return { ...baseStyle, background: "#E0E0E0", color: "#202224", opacity: 0.3 };
    }
};
