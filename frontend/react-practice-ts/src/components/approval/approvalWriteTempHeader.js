import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import ApprovalLineModal from "./approvalLineModal";
import ApprovalCCModal from "./approvalCCModal";
const ApprovalWriteTempHeader = ({ approvalData, setApprovalData, selectedCCUsers = [], setSelectedCCUsers = [] }) => {
    // ✅ 각각의 모달 상태를 독립적으로 관리
    const [approvalLineModalOpen, setApprovalLineModalOpen] = useState(false);
    const [approvalCCModalOpen, setApprovalCCModalOpen] = useState(false);
    const [approvalType, setApprovalType] = useState(""); // ✅ 종류 선택 (일반 or 휴가원)
    const [leaveType, setLeaveType] = useState(""); // ✅ 휴가원 선택 시 기안양식 (연차, 반차 등)
    const [startLeaveDate, setStartLeaveDate] = useState(""); // ✅ 연차 시작일
    const [endDate, setEndDate] = useState(""); // ✅ 연차 종료일
    const [halfDayDate, setHalfDayDate] = useState(""); // ✅ 반차 날짜
    const [leaveDays, setLeaveDays] = useState(0); // ✅ 사용 연차 일수
    const handleApprovalTypeChange = (e) => {
        const selectedType = e.target.value;
        setApprovalType(selectedType);
        // ✅ approvalData에도 반영
        setApprovalData((prevData) => ({
            ...prevData,
            approvalType: selectedType, // approvalData에 반영
            leaveType: "", // 기안양식 초기화
            startLeaveDate: "",
            endDate: "",
            halfDayDate: "",
            leaveDays: 0,
        }));
    };
    useEffect(() => {
        setApprovalData((prevData) => ({
            ...prevData,
            approvalType,
            leaveType,
            startLeaveDate,
            endDate,
            halfDayDate: leaveType.includes("반차") ? startLeaveDate : "", // 반차는 startDate와 동일
            leaveDays,
        }));
    }, [leaveType, startLeaveDate, endDate, leaveDays, approvalType]);
    // 참조자 목록 상태 추가
    //const [selectedCCUsers, setSelectedCCUsers] = useState([]);
    useEffect(() => {
        console.log("✅ Header에서 업데이트된 selectedCCUsers:", selectedCCUsers);
    }, [selectedCCUsers]);
    // 파일 업로드용 state
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null); // 파일 선택 트리거용 Ref
    // 파일 선택 처리
    const handleFileChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
            //approvalData에 파일 추가
            setApprovalData((prevData) => ({
                ...prevData,
                attachments: [...prevData.attachments || [], ...filesArray], // 파일 목록 저장
            }));
        }
    };
    // 파일 삭제 함수 추가
    const handleRemoveFile = (index) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        // approvalData에서도 파일 제거
        setApprovalData((prevData) => ({
            ...prevData,
            attachments: prevData.attachments?.filter((_, i) => i !== index) || [],
        }));
    };
    // 입력값 변경 시 상태 업데이트하는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setApprovalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // 파일 선택 버튼 클릭 시 input[type="file"] 트리거
    const handleFileUploadClick = () => {
        fileInputRef.current?.click();
    };
    // 📌 연차 시작일/종료일이 변경될 때 연차 일수 계산
    useEffect(() => {
        if (approvalType === "휴가원" && leaveType === "연차" && startLeaveDate && endDate) {
            const start = new Date(startLeaveDate);
            const end = new Date(endDate);
            const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1; // 차이 계산 후 1일 추가
            setLeaveDays(days > 0 ? days : 0); // 음수가 나오지 않도록 제한
        }
        else if (leaveType === "오전반차" || leaveType === "오후반차") {
            setLeaveDays(0.5); // ✅ 반차 선택 시 0.5일
        }
        else {
            setLeaveDays(0);
        }
    }, [approvalType, leaveType, startLeaveDate, endDate]);
    return (_jsx("div", { style: pageContainerStyle, children: _jsxs("div", { style: formContainerStyle, children: [_jsx("div", { style: sectionTitleStyle, children: "\uAE30\uC548\uC11C \uC791\uC131" }), _jsx("div", { style: dividerStyle1 }), _jsxs("div", { style: rowContainerStyle, children: [_jsxs("div", { style: rowStyle, children: [_jsx("label", { style: labelStyle, children: "\uC885\uB958" }), _jsxs("select", { name: "approvalType", style: selectBoxStyle, value: approvalType, onChange: handleApprovalTypeChange, children: [_jsx("option", { value: "", children: "\uC120\uD0DD" }), _jsx("option", { value: "\uC77C\uBC18", children: "\uC77C\uBC18" }), _jsx("option", { value: "\uD734\uAC00\uC6D0", children: "\uD734\uAC00\uC6D0" })] })] }), approvalType === "휴가원" && (_jsxs("div", { style: rowStyle2, children: [_jsx("label", { style: labelStyle, children: "\uD734\uAC00\uC720\uD615" }), _jsxs("select", { style: selectBoxStyle, value: leaveType, onChange: (e) => {
                                        setLeaveType(e.target.value);
                                        setLeaveDays(e.target.value.includes("반차") ? 0.5 : 0); // ✅ 반차일 경우 0.5일
                                        setStartLeaveDate("");
                                        setEndDate("");
                                        setHalfDayDate("");
                                    }, children: [_jsx("option", { value: "", children: "\uC120\uD0DD" }), _jsx("option", { value: "\uC5F0\uCC28", children: "\uC5F0\uCC28" }), _jsx("option", { value: "\uC624\uC804\uBC18\uCC28", children: "\uC624\uC804\uBC18\uCC28" }), _jsx("option", { value: "\uC624\uD6C4\uBC18\uCC28", children: "\uC624\uD6C4\uBC18\uCC28" })] })] }))] }), approvalType === "휴가원" && leaveType === "연차" && (_jsxs(_Fragment, { children: [_jsx("div", { style: dividerStyle }), _jsxs("div", { style: rowContainerStyle, children: [_jsxs("div", { style: rowStyle, children: [_jsx("label", { style: labelStyle, children: "\uC5F0\uCC28 \uC2DC\uC791\uC77C" }), _jsx("input", { type: "date", style: inputStyle, value: startLeaveDate, onChange: (e) => setStartLeaveDate(e.target.value) })] }), _jsxs("div", { style: rowStyle2, children: [_jsx("label", { style: labelStyle, children: "\uC5F0\uCC28 \uC885\uB8CC\uC77C" }), _jsx("input", { type: "date", style: inputStyle, value: endDate, onChange: (e) => setEndDate(e.target.value) })] })] })] })), approvalType === "휴가원" && (leaveType === "오전반차" || leaveType === "오후반차") && (_jsxs(_Fragment, { children: [_jsx("div", { style: dividerStyle }), _jsxs("div", { style: rowStyle, children: [_jsx("label", { style: labelStyle, children: "\uBC18\uCC28 \uB0A0\uC9DC" }), _jsx("input", { type: "date", style: inputStyle, value: startLeaveDate, onChange: (e) => {
                                        const selectedDate = e.target.value;
                                        setStartLeaveDate(selectedDate);
                                        setEndDate(selectedDate); // ✅ 반차의 경우 startDate = endDate 동일
                                        setLeaveDays(0.5); // ✅ 반차는 0.5일로 고정
                                    } })] })] })), _jsx("div", { style: dividerStyle }), approvalType === "휴가원" && (_jsxs("div", { style: rowStyle, children: [_jsx("label", { style: labelStyle, children: "\uC0AC\uC6A9 \uC5F0\uCC28 \uC77C\uC218" }), _jsx("input", { type: "text", style: inputStyle, value: leaveDays, readOnly: true })] })), _jsx("div", { style: dividerStyle }), _jsxs("div", { style: rowStyle, children: [_jsx("label", { style: labelStyle, children: "\uC81C\uBAA9" }), _jsx("input", { type: "text", name: "approvalTitle", placeholder: "\uC81C\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694.", style: inputStyle, value: approvalData.approvalTitle, onChange: handleChange })] }), _jsx("div", { style: dividerStyle }), _jsxs("div", { style: rowStyle, children: [_jsx("label", { style: labelStyle, children: "\uACB0\uC7AC\uB77C\uC778" }), _jsx("button", { style: actionButtonStyle, onClick: () => setApprovalLineModalOpen(true), children: "+ \uC120\uD0DD" }), _jsx("div", { style: {
                                //width: "100%", // 부모 요소에 맞게 너비 설정
                                minHeight: "20px", // 최소 높이 설정 (데이터 없을 때도 공간 확보)
                                padding: "8px",
                                wordBreak: "break-word", // 긴 텍스트 자동 줄바꿈
                                fontSize: "12px",
                                color: "#007bff",
                            }, children: approvalData.approvalLine && approvalData.approvalLine.length > 0 ? (approvalData.approvalLine.map((emp, index) => (_jsxs("div", { style: { marginBottom: "5px" }, children: [emp.USER_NAME, " (", emp.DEPT_NAME, " - ", emp.POSITION_NAME, ")"] }, index)))) : (_jsx("div", { style: { color: "gray", fontSize: "11px" }, children: "\uACB0\uC7AC\uC790\uB97C \uCD94\uAC00\uD558\uC138\uC694" })) })] }), approvalLineModalOpen && (_jsx(ApprovalLineModal, { onClose: () => setApprovalLineModalOpen(false), setApprovalData: setApprovalData })), _jsx("div", { style: dividerStyle }), _jsxs("div", { style: rowStyle, children: [_jsx("span", { style: labelStyle, children: "\uCCA8\uBD80" }), _jsx("button", { style: actionButtonStyle, onClick: handleFileUploadClick, children: "+ \uCCA8\uBD80" }), _jsx("input", { type: "file", multiple: true, ref: fileInputRef, style: { position: "absolute", width: 0, height: 0, overflow: "hidden", opacity: 0, pointerEvents: "none" }, onChange: handleFileChange }), _jsx("div", { style: fileListContainerStyle, children: selectedFiles.length > 0 ? (selectedFiles.map((file, index) => {
                                const fileURL = URL.createObjectURL(file); // 파일 URL 생성
                                return (_jsxs("div", { style: fileItemStyle, children: [_jsxs("a", { href: fileURL, download: file.name, style: fileLinkStyle, children: ["\uD83D\uDCCE ", file.name] }), _jsx("button", { onClick: () => handleRemoveFile(index), style: removeButtonStyle, children: "x" })] }, index));
                            })) : (_jsx("div", { style: fileItemStyle, children: "\uC120\uD0DD\uB41C \uD30C\uC77C \uC5C6\uC74C" })) })] }), _jsx("div", { style: dividerStyle }), _jsxs("div", { style: rowStyle, children: [_jsx("label", { style: labelStyle, children: "\uCC38\uC870" }), _jsx("button", { style: actionButtonStyle, onClick: () => setApprovalCCModalOpen(true), children: "+ \uC120\uD0DD" }), _jsx("div", { style: infoContainer, children: selectedCCUsers.length > 0 ? (selectedCCUsers.map((emp, index) => (_jsxs("div", { style: { marginBottom: "5px" }, children: [emp.USER_NAME, " (", emp.DEPT_NAME, " - ", emp.POSITION_NAME, ")"] }, index)))) : (_jsx("div", { style: emptyMessage, children: "\uCC38\uC870\uC790\uB97C \uCD94\uAC00\uD558\uC138\uC694" })) })] }), approvalCCModalOpen && (_jsx(ApprovalCCModal, { onClose: () => setApprovalCCModalOpen(false), setSelectedCCUsers: setSelectedCCUsers, selectedCCUsers: selectedCCUsers })), _jsx("div", { style: dividerStyle })] }) }));
};
const infoContainer = {
    minHeight: "20px",
    padding: "8px",
    wordBreak: "break-word",
    fontSize: "12px",
    color: "#007bff",
};
const emptyMessage = { color: "gray", fontSize: "11px" };
// 삭제 버튼 스타일
const removeButtonStyle = {
    background: "none",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
    marginLeft: "6px",
};
// 파일 다운로드 링크 스타일
const fileLinkStyle = {
    textDecoration: "none",
    color: "#007bff",
    cursor: "pointer",
    fontSize: "12px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
};
// 파일 목록을 감싸는 컨테이너 (스크롤 가능)
const fileListContainerStyle = {
    maxWidth: "300px", // 파일명이 너무 길 경우 대비
    maxHeight: "60px", // ✅ 최대 높이 설정하여 스크롤 가능하도록 변경
    overflowY: "auto", // ✅ 스크롤이 필요하면 자동으로 활성화
    //border: "1px solid black",
    borderRadius: "5px",
    padding: "5px",
    fontSize: "11px",
    color: "#757575",
};
// 개별 파일 스타일
const fileItemStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: "3px 0",
};
// ✅ **페이지 전체 컨테이너 스타일 (가운데 정렬)**
const pageContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
};
// ✅ **기안서 작성 폼 박스 스타일 (가운데 정렬 & 배경 그림자 제거)**
const formContainerStyle = {
    width: "70%", // ✅ 기존 50% → 70%로 넓힘
    maxWidth: "900px", // ✅ 기존 600px → 900px로 증가
    background: "white",
    padding: "20px",
};
const sectionTitleStyle = {
    fontSize: "16px",
    fontWeight: "700",
    color: "#202224",
    marginBottom: "10px",
};
const dividerStyle = {
    width: "100%",
    height: "1px",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    margin: "10px 0",
};
const dividerStyle1 = {
    width: "100%",
    height: "3px", // ✅ 기존 1px → 3px로 굵게 변경
    backgroundColor: "rgba(0, 0, 0, 0.3)", // ✅ 조금 더 진한 회색으로 변경
    margin: "10px 0",
};
const rowContainerStyle = {
    display: "flex", // ✅ 내부 요소를 가로로 배치
    justifyContent: "space-between", // ✅ 두 개의 row를 좌우로 정렬
    width: "100%", // ✅ 부모 컨테이너 전체 너비 설정
    gap: "20px", // ✅ 두 요소 사이 간격 추가
};
const rowStyle = {
    display: "flex",
    alignItems: "center",
    flex: 1, // ✅ 같은 크기로 맞춤
    gap: "10px",
    marginBottom: "10px",
};
const rowStyle2 = {
    display: "flex",
    alignItems: "center",
    flex: 1, // ✅ 같은 크기로 맞춤
    gap: "10px",
    marginBottom: "10px",
};
const labelStyle = {
    width: "80px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#202224",
};
const selectBoxStyle = {
    width: "150px",
    border: "1px solid black",
    borderRadius: "4px",
    fontSize: "12px",
    padding: "5px",
    cursor: "pointer",
};
const inputStyle = {
    flex: 1,
    height: "25px",
    border: "1px solid black",
    borderRadius: "4px",
    paddingLeft: "10px",
    fontSize: "12px",
};
const actionButtonStyle = {
    display: "flex", // ✅ 내부 요소를 flexbox로 설정
    alignItems: "center", // ✅ 세로 중앙 정렬
    justifyContent: "center", // ✅ 가로 중앙 정렬
    height: "25px",
    width: "70px", // ✅ 버튼 크기 추가 (가로 너비 설정)
    background: "white",
    borderRadius: "5px",
    border: "2px solid #4880FF",
    fontSize: "11px",
    fontWeight: "bold",
    color: "black",
    cursor: "pointer",
};
export default ApprovalWriteTempHeader;
