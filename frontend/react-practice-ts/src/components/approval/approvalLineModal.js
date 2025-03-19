import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import ApprovalFavoriteLineModal from "./approvalFavoriteLineModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { groupBy } from "lodash";
const ApprovalLineModal = ({ onClose, setApprovalData }) => {
    const [approvalLine, setApprovalLine] = useState([]); // 결재자 리스트
    const [favoriteLine, setFavoriteLine] = useState([]); // 즐겨찾기 리스트
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
    const [showFavoriteModal, setShowFavoriteModal] = useState(false);
    const [favoriteName, setFavoriteName] = useState(""); // 즐겨찾기 명
    const [employees, setEmployees] = useState([]);
    const [refresh, setRefresh] = useState(false); //새로고침 트리거
    const companyId = useSelector((state) => state.user.companyId);
    const refreshFavoritList = () => {
        setRefresh(prev => !prev);
    };
    const selectFavoriteForApprovalLine = (favorite) => {
        const updatedEmployees = favorite.employees.map(emp => ({
            ...emp,
            USER_NO: emp.USER_NO,
            approvalLineType: emp.approvalType // 해당 리스트 타입 유지
        }));
        setApprovalLine(updatedEmployees); // 선택한 즐겨찾기 내의 결재자 목록으로 결재라인 교체
    };
    // Redux에서 user 정보 가져오기
    const userNo = useSelector((state) => state.user.userNo);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/workly/api/approval/getFavoriteLines/${userNo}`)
            .then((response) => {
            // 데이터를 FAVORITE_NAME 기준으로 그룹화
            const groupedFavorites = groupBy(response.data, "FAVORITE_NAME");
            // 백엔드에서 받은 데이터를 적절한 형식으로 변환
            const formattedFavorites = Object.keys(groupedFavorites).map((favName) => ({
                name: favName, // 즐겨찾기 이름
                employees: groupedFavorites[favName].map((emp) => ({
                    USER_NO: emp.USER_NO,
                    USER_NAME: emp.USER_NAME,
                    DEPT_NAME: emp.DEPT_NAME,
                    POSITION_NAME: emp.POSITION_NAME,
                    approvalType: emp.APPROVAL_TYPE,
                    type: '결재자',
                    approvalLevel: emp.LEVEL,
                    approvalLineType: emp.APPROVAL_LINE_TYPE,
                })),
            }));
            console.log("즐겨찾기 선택 후 결재라인:", formattedFavorites); // ✅ 확인용 로그
            setFavoriteLine(formattedFavorites); // 상태 업데이트
        })
            .catch((error) => console.error("즐겨찾기 가져오기 실패:", error));
    }, [userNo, refresh]); // userNo가 변경될때마다 실행
    // ✅ 백엔드에서 직원 목록 가져오기 (axios 사용)
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/workly/api/approval/approvalLineList`)
            .then((response) => {
            console.log("백엔드 응답 데이터:", response.data);
            const filteredEmployees = response.data.filter(emp => emp.COMPANY_ID === companyId);
            setEmployees(filteredEmployees); // ✅ 필터링된 직원만 저장
        })
            .catch((error) => console.error("데이터 가져오기 실패:", error));
    }, []);
    // ✅ 검색어 적용된 직원 목록 필터링
    const filteredEmployees = employees.filter((emp) => emp.USER_NAME.includes(searchTerm));
    // 즐겨찾기 추가
    const saveFavoriteLine = () => {
        if (favoriteName.trim() === "") {
            alert("즐겨찾기 명을 입력해주세요!");
            return;
        }
        if (approvalLine.length === 0) {
            alert("추가할 결재자가 없습니다.");
            return;
        }
        setFavoriteLine([...favoriteLine, { name: favoriteName, employees: approvalLine }]);
        setShowFavoriteModal(false); // 모달 닫기
        setFavoriteName(""); // 입력 값 초기화
    };
    // 즐겨찾기 삭제
    const removeFavoriteLine = (favoriteName) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/workly/api/approval/deleteFavoriteLine`, {
            params: {
                userNo,
                favoriteName: encodeURIComponent(favoriteName)
            }
        })
            .then(() => {
            console.log(`'${favoriteName}' 즐겨찾기 삭제 완료`);
            alert("즐겨찾기 삭제 완료");
            refreshFavoritList(); // 삭제 후 목록 새로고침
        })
            .catch((error) => {
            console.log("즐겨찾기 삭제 실패:", error);
            alert("삭제에 실패했습니다.");
        });
    };
    const handleSaveApprovalLine = () => {
        console.log("결재라인 저장 전 데이터:", approvalLine);
        setApprovalData((prevData) => ({
            ...prevData,
            approvalLine: approvalLine.map((person, index) => ({
                ...person,
                USER_NO: person.USER_NO,
                APPROVAL_LINE_TYPE: person.approvalType,
                approvalLevel: index + 1, // ✅ 레벨을 다시 1부터 순차적으로 설정
            })), // ✅ approvalData 내부에 approvalLine 속성 추가
        }));
        onClose();
    };
    return (_jsx("div", { style: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // ✅ 반투명한 배경 추가
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        }, children: _jsxs("div", { style: {
                width: 750,
                height: 500,
                background: "white",
                borderRadius: 8,
                border: "1px solid black",
                padding: 15,
                position: "fixed", // 화면 중앙 정렬을 위해 fixed 사용
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", // 가로 세로 중앙 정렬
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // 살짝 그림자 추가 (선택 사항)
            }, children: [_jsx("button", { onClick: onClose, style: {
                        background: "transparent",
                        border: "none",
                        fontSize: 9,
                        cursor: "pointer",
                    }, children: _jsxs("svg", { width: "10", height: "15", viewBox: "0 0 19 22", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("rect", { width: "10", height: "15", fill: "white" }), _jsx("path", { d: "M14.25 5.5L4.75 16.5M4.75 5.5L14.25 16.5", stroke: "#1E1E1E", strokeWidth: "4", strokeLinecap: "round", strokeLinejoin: "round" })] }) }), _jsx("h2", { style: { fontSize: 16, fontWeight: 700, color: "#202224", marginBottom: "10px" }, children: "\uACB0\uC7AC\uB77C\uC778" }), _jsxs("div", { style: { display: "flex", gap: 15 }, children: [_jsxs("div", { style: {
                                width: 320,
                                height: 380,
                                border: "1px solid #404040",
                                borderRadius: 4,
                                padding: 8,
                            }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", marginBottom: 8 }, children: [_jsx("input", { type: "text", placeholder: "\uC774\uB984 \uC785\uB825", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), style: {
                                                width: "65%",
                                                padding: 4,
                                                fontSize: 11,
                                                borderRadius: 20,
                                                border: "0.6px solid #D5D5D5",
                                                background: "#F5F6FA",
                                            } }), _jsx("button", { onClick: () => console.log("검색어:", searchTerm), style: {
                                                marginLeft: "8px",
                                                padding: "5px 10px",
                                                fontSize: 11,
                                                borderRadius: 8,
                                                border: "1px solid black",
                                                background: "white",
                                                cursor: "pointer",
                                            }, children: "\uAC80\uC0C9" })] }), _jsx("div", { style: {
                                        width: "100%",
                                        maxHeight: 330, // 최대 높이 지정
                                        overflowY: "auto", // 스크롤 활성화
                                        border: "1px solid #ddd",
                                    }, children: _jsxs("table", { style: {
                                            width: "100%",
                                            borderCollapse: "collapse",
                                            tableLayout: "fixed", // 📌 컬럼 크기 고정 (정렬 유지)
                                            textAlign: "left",
                                            fontSize: 11,
                                        }, children: [_jsx("thead", { style: { position: "sticky", top: 0, background: "#f5f5f5" }, children: _jsxs("tr", { children: [_jsx("th", { style: { borderBottom: "2px solid #979797", padding: "6px", width: "50%" }, children: "\uBD80\uC11C" }), _jsx("th", { style: { borderBottom: "2px solid #979797", padding: "6px", width: "50%" }, children: "\uC0AC\uC6D0" }), _jsx("th", { style: { borderBottom: "2px solid #979797", padding: "6px", width: "50%" }, children: "\uC9C1\uAE09" })] }) }), _jsx("tbody", { children: filteredEmployees.length > 0 ? (filteredEmployees.map((emp, index) => (_jsxs("tr", { onClick: () => {
                                                        if (!approvalLine.some(person => person.USER_NAME === emp.USER_NAME)) {
                                                            setApprovalLine((prevApprovalLine) => [
                                                                ...prevApprovalLine,
                                                                {
                                                                    id: Date.now(), // 고유한 id 추가
                                                                    USER_NAME: emp.USER_NAME,
                                                                    DEPT_NAME: emp.DEPT_NAME,
                                                                    POSITION_NAME: emp.POSITION_NAME,
                                                                    approvalType: "승인", // 기본 타입 설정
                                                                    type: '결재자',
                                                                    approvalLevel: prevApprovalLine.length + 1, // ✅ 최신 상태 반영
                                                                    USER_NO: emp.USER_NO,
                                                                }
                                                            ]);
                                                        }
                                                    }, style: { cursor: "pointer" }, children: [_jsx("td", { style: { padding: "6px", borderBottom: "1px solid #ddd" }, children: emp.DEPT_NAME }), _jsx("td", { style: { padding: "6px", borderBottom: "1px solid #ddd" }, children: emp.USER_NAME }), _jsx("td", { style: { padding: "6px", borderBottom: "1px solid #ddd" }, children: emp.POSITION_NAME })] }, index)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 2, style: { textAlign: "center", padding: "10px", color: "gray" }, children: "\uB370\uC774\uD130 \uC5C6\uC74C" }) })) })] }) })] }), _jsxs("div", { style: { width: 350, display: "flex", flexDirection: "column", gap: 8 }, children: [_jsx("h2", { style: { fontSize: 12, fontWeight: 700, marginBottom: "2px" }, children: "\uC990\uACA8\uCC3E\uAE30" }), _jsx("div", { style: {
                                        width: "100%",
                                        height: 100,
                                        border: "1px solid #404040",
                                        borderRadius: 4,
                                        padding: 8,
                                        overflowY: "auto",
                                        maxHeight: 150, // 최대 높이 설정 (초과 시 스크롤)
                                    }, children: _jsx("ul", { style: { listStyle: "none", padding: 0, fontSize: 11 }, children: favoriteLine.map((fav, index) => (_jsxs("li", { style: {
                                                display: "flex",
                                                flexDirection: "column", // ✅ 세로 정렬
                                                borderBottom: "1px solid #ddd",
                                                paddingBottom: "6px",
                                                marginBottom: "6px",
                                                cursor: "pointer",
                                            }, onClick: () => selectFavoriteForApprovalLine(fav), children: [_jsx("strong", { children: fav.name }), _jsx("ul", { style: { paddingLeft: "10px", marginTop: "4px" }, children: (fav.employees || []).map((emp, empIndex) => (_jsxs("li", { children: [emp.USER_NAME, " (", emp.DEPT_NAME, " - ", emp.POSITION_NAME, ")"] }, emp.USER_NO || empIndex))) }), _jsx("button", { onClick: () => removeFavoriteLine(fav.name), style: {
                                                        border: "none",
                                                        background: "transparent",
                                                        cursor: "pointer",
                                                        marginLeft: "auto",
                                                    }, children: _jsxs("svg", { width: "30", height: "16", viewBox: "0 0 35 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("rect", { x: "0.5", y: "0.5", width: "34", height: "19", rx: "10", fill: "white", stroke: "black" }), _jsx("line", { x1: "10", y1: "10", x2: "25", y2: "10", stroke: "black", strokeWidth: "2" })] }) })] }, fav.name || index))) }) }), _jsx("h3", { style: { fontSize: 12, fontWeight: 700, marginTop: "17px" }, children: "\uACB0\uC7AC\uC790 \uC124\uC815" }), _jsxs("div", { style: {
                                        width: "100%",
                                        height: 208,
                                        border: "1px solid #404040",
                                        borderRadius: 3,
                                        padding: 6,
                                        display: "flex",
                                        flexDirection: "column", // 세로 정렬   
                                    }, children: [_jsx("div", { style: {
                                                flexGrow: 1, // 리스트가 남은 공간을 차지하도록 설정
                                                overflowY: "auto", // 📌 스크롤 적용
                                                maxHeight: "1000px", // 최대 높이 지정 (버튼을 고려하여 조정)
                                                paddingRight: "5px", // 스크롤바 공간 확보
                                            }, children: _jsx("ol", { style: { fontSize: 10, paddingLeft: 10 }, children: approvalLine.map((person, index) => (_jsxs("li", { style: {
                                                        display: "flex",
                                                        gap: 6,
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        padding: 4,
                                                        borderBottom: "1px solid #ddd",
                                                    }, children: [_jsxs("select", { value: person.approvalType, onChange: (e) => {
                                                                setApprovalLine(approvalLine.map((item) => item.USER_NO === person.USER_NO ? { ...item, approvalType: e.target.value } : item));
                                                            }, style: {
                                                                padding: "3px 8px",
                                                                fontSize: 10,
                                                                borderRadius: 3,
                                                                border: "1px solid black",
                                                            }, children: [_jsx("option", { value: "\uC2B9\uC778", children: "\uC2B9\uC778" }), _jsx("option", { value: "\uC218\uC2E0", children: "\uC218\uC2E0" })] }), _jsx("span", { style: { fontSize: 10 }, children: person.DEPT_NAME }), _jsx("span", { style: { fontSize: 10 }, children: person.USER_NAME }), _jsx("span", { style: { fontSize: 10 }, children: person.POSITION_NAME }), _jsx("button", { onClick: () => setApprovalLine(approvalLine.filter((_, i) => i !== index)), style: {
                                                                border: "none",
                                                                background: "transparent",
                                                                cursor: "pointer",
                                                            }, children: _jsxs("svg", { width: "30", height: "16", viewBox: "0 0 35 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("rect", { x: "0.5", y: "0.5", width: "34", height: "19", rx: "10", fill: "white", stroke: "black" }), _jsx("line", { x1: "10", y1: "10", x2: "25", y2: "10", stroke: "black", strokeWidth: "2" })] }) })] }, person.USER_NO))) }) }), _jsx("button", { onClick: () => setShowFavoriteModal(true), disabled: approvalLine.length === 0, style: {
                                                width: "79%",
                                                padding: 5,
                                                border: approvalLine.length === 0 ? "2px solid gray" : "2px solid #4880FF", // 비활성화 시 회색
                                                borderRadius: 14,
                                                background: approvalLine.length === 0 ? "#ccc" : "white", // 비활성화 시 배경색 변경
                                                fontSize: 12,
                                                fontWeight: 500,
                                                cursor: approvalLine.length === 0 ? "not-allowed" : "pointer", // 비활성화 시 클릭 방지
                                                marginLeft: "40px",
                                                marginTop: "40px",
                                                color: approvalLine.length === 0 ? "#888" : "black", // 비활성화 시 글씨색 변경
                                            }, children: "\uC990\uACA8\uCC3E\uAE30 \uCD94\uAC00" })] }), _jsx("button", { onClick: handleSaveApprovalLine, style: {
                                        width: "80%",
                                        padding: 8,
                                        background: "#4880FF",
                                        color: "white",
                                        fontSize: 12,
                                        fontWeight: 600,
                                        borderRadius: 14,
                                        border: "none",
                                        cursor: "pointer",
                                        marginTop: 8,
                                        marginLeft: "45px",
                                    }, children: "\uACB0\uC7AC\uB77C\uC778 \uC800\uC7A5" })] })] }), showFavoriteModal && (_jsx(ApprovalFavoriteLineModal, { onClose: () => setShowFavoriteModal(false), favoriteName: favoriteName, setFavoriteName: setFavoriteName, saveFavoriteLine: saveFavoriteLine, approvalLines: approvalLine, refreshFavoriteList: refreshFavoritList, userNo: userNo }))] }) }));
};
export default ApprovalLineModal;
