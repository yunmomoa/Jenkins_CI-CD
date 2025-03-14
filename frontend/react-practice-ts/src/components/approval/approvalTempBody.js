import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
export const ApprovalTempBody = ({ selectedPosts, setSelectedPosts, filteredPosts, currentPage, postsPerPage, isLoading }) => {
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
    return (_jsx("div", { style: containerStyle, children: _jsxs("table", { style: tableStyle, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { style: thStyle, children: _jsx("input", { type: "checkbox", onChange: (e) => {
                                        if (e.target.checked) {
                                            setSelectedPosts(currentPosts.map(post => post.tempNo));
                                        }
                                        else {
                                            setSelectedPosts([]);
                                        }
                                    }, checked: currentPosts.length > 0 && selectedPosts.length === currentPosts.length }) }), _jsx("th", { style: thStyle, children: "\uAD6C\uBD84" }), _jsx("th", { style: thStyle, children: "\uAE30\uC548\uBC88\uD638" }), _jsx("th", { style: thStyle, children: "\uC81C\uBAA9" }), _jsx("th", { style: thStyle, children: "\uAE30\uC548\uC77C" }), _jsx("th", { style: thStyle, children: "\uC0C1\uD0DC" })] }) }), _jsx("tbody", { children: isLoading ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, style: { textAlign: "center", padding: "20px" }, children: "\u23F3 \uB370\uC774\uD130 \uBD88\uB7EC\uC624\uB294 \uC911..." }) })) : currentPosts.length > 0 ? (currentPosts.map((post) => (_jsxs("tr", { style: rowStyle, children: [_jsx("td", { style: tdStyle, children: _jsx("input", { type: "checkbox", checked: selectedPosts.includes(post.tempNo), onChange: () => setSelectedPosts(prev => prev.includes(post.tempNo) ? prev.filter(item => item !== post.tempNo) : [...prev, post.tempNo]) }) }), _jsx("td", { style: tdStyle, children: post.approvalType }), _jsx("td", { style: tdStyle, children: `임시저장-${post.tempNo}` }), _jsx("td", { style: { ...tdTitleStyle, cursor: "pointer" }, onClick: () => navigate(`/ApprovalWritePage?tempNo=${post.tempNo}`), children: post.approvalTitle }), _jsx("td", { style: tdStyle, children: post.createdAt ? formatDate(post.startDate) : "-" }), _jsx("td", { style: tdStyle, children: _jsx("span", { style: statusStyle, children: "\uC784\uC2DC\uC800\uC7A5" }) })] }, post.tempNo)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 6, style: { textAlign: "center", padding: "20px", fontSize: "14px", color: "#888" }, children: "\uBB38\uC11C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) })) })] }) }));
};
// ✅ 스타일 추가
const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
};
// ✅ 테이블 스타일 (오른쪽으로 이동 & 폭 넓힘)
const tableStyle = {
    width: "90%", // ✅ 기존 90% → 95%로 넓힘
    borderCollapse: "collapse",
    textAlign: "center",
    justifyContent: "center"
};
const thStyle = {
    padding: "12px",
    borderBottom: "2px solid #202224",
    fontSize: "13px",
    fontWeight: 700,
};
const rowStyle = {
    borderBottom: "1px solid #E0E0E0",
};
const tdStyle = {
    padding: "10px",
    fontSize: "12px",
    color: "#202224",
};
const tdTitleStyle = {
    ...tdStyle,
    textAlign: "left",
};
// 아이콘을 위한 셀 스타일 (왼쪽 정렬)
const tdIconStyle = {
    width: "20px", // 아이콘 크기 조정
    textAlign: "center",
};
const statusStyle = {
    padding: "5px 10px",
    borderRadius: "4px",
    backgroundColor: "#ffa500",
    color: "#FFF",
    fontSize: "12px",
    fontWeight: "bold",
};
