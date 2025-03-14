import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ApprovalMark } from "./approvalMark";
import { addHours, format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
export const ApprovalReferencePost = ({ filteredPosts, currentPage, postsPerPage, setCurrentPage }) => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const [/*filteredPosts*/ , setFilteredPosts] = useState([]);
    const navigate = useNavigate();
    // const [currentPage, setCurrentPage] = useState(1);
    // const postsPerPage = 10;
    //export const ApprovalReferencePost = () => {
    //   const [currentPage, setCurrentPage] = useState(1);
    //   const postsPerPage = 10;
    // 로그인한 유저의 userNO
    const userNo = useSelector((state) => state.user.userNo);
    // 게시글 목록
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchApprovalPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:8003/workly/api/approval/referenceList/${userNo}`);
                // 필터링: userNo가 포함된 참조 + 진행 중, 완료인 항목만
                const filterdPosts = response.data.filter((post) => post.approvalStatus === 1 || post.approvalStatus === 2)
                    .map((post) => ({
                    ...post,
                    startDate: formatKST(post.startDate) // ✅ 한국시간 변환 적용
                }));
                setPosts(filterdPosts);
                setFilteredPosts(filterdPosts);
            }
            catch (error) {
                console.error("결재 요청 목록을 불러오는 데 실패했습니다");
            }
        };
        if (userNo) {
            fetchApprovalPosts();
        }
    }, [userNo]);
    // 게시글 클릭 시 상세 페이지로 이동, 읽음처리리하는 함수
    const handleRowClick = async (approvalNo) => {
        if (!userNo) {
            console.error("❌ 로그인된 사용자 정보 없음");
            return;
        }
        try {
            await axios.post(`http://localhost:8003/workly/notifications/read`, null, {
                params: { approvalNo: approvalNo, userNo: userNo },
            });
            navigate(`/ApprovalCompletePage2/${approvalNo}`);
        }
        catch (error) {
            console.error("❌ 읽음 처리 API 호출 중 오류 발생:", error);
        }
    };
    return (_jsx("div", { style: containerStyle, children: _jsxs("table", { style: tableStyle, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { style: thStyle }), _jsx("th", { style: thStyle, children: "\uAD6C\uBD84" }), _jsx("th", { style: thStyle, children: "\uAE30\uC548\uBC88\uD638" }), _jsx("th", { style: thStyle, children: "\uAE30\uC548\uC790" }), _jsx("th", { style: thStyle, children: "\uC81C\uBAA9" }), _jsx("th", { style: thStyle, children: "\uAE30\uC548\uC77C" }), _jsx("th", { style: thStyle, children: "\uC0C1\uD0DC" })] }) }), _jsx("tbody", { children: currentPosts.length > 0 ? (currentPosts.map((post) => (_jsxs("tr", { style: { ...rowStyle, cursor: "pointer" }, onClick: () => handleRowClick(post.approvalNo), children: [_jsx("td", { style: tdIconStyle, children: _jsx(ApprovalMark, { isUnread: post.isUnread }) }), _jsx("td", { style: tdStyle, children: post.approvalType }), _jsx("td", { style: tdStyle, children: `기안-${post.approvalNo}` }), _jsx("td", { style: tdStyle, children: post.userName }), _jsx("td", { style: tdTitleStyle, children: post.approvalTitle }), _jsx("td", { style: tdStyle, children: post.startDate }), _jsx("td", { style: tdStyle, children: _jsx("span", { style: getStatusStyle(post.approvalStatus), children: getStatusText(post.approvalStatus) }) })] }, post.approvalNo)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 7, style: emptyRowStyle, children: "\uCC38\uC870\uB41C \uACB0\uC7AC \uB9AC\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) })) })] }) }));
};
const emptyRowStyle = {
    padding: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#888",
};
const formatKST = (timestamp) => {
    if (!timestamp)
        return "N/A";
    let ts = Number(timestamp);
    if (ts.toString().length === 10) {
        ts *= 1000;
    }
    const date = addHours(new Date(ts), 9);
    return format(date, "yyyy. MM. dd. a hh:mm", { locale: ko });
};
const getStatusText = (status) => {
    switch (status) {
        case 1: return "진행중";
        case 2: return "완료";
        case 3: return "반려";
        default: return "알 수 없음";
    }
};
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
            return { ...baseStyle, background: "#4c93ff", color: "white" };
        case 1:
            return { ...baseStyle, background: "#ffa500", color: "white" };
        case 3:
            return { ...baseStyle, background: "#EB0909", color: "white" };
        default:
            return { ...baseStyle, background: "#E0E0E0", color: "#202224", opacity: 0.3 };
    }
};
const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
};
const tableStyle = {
    width: "90%",
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
const tdIconStyle = {
    width: "20px",
    textAlign: "center",
};
