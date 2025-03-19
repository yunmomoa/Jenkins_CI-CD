import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { format, addHours } from 'date-fns';
import { ko } from 'date-fns/locale';
export const ApprovalCompleteHeader = () => {
    const { approvalNo } = useParams(); // URL에서 approvalNo 가져오기
    const [approvalData, setApprovalData] = useState();
    const [approvalLine, setApprovalLine] = useState([]);
    const [writeUser, setWriteUser] = useState(null);
    const [attachments, setAttachments] = useState([]);
    const [error, setError] = useState(null); // ✅ 추가
    const approvers = approvalLine.filter(line => line.type == '결재자');
    const references = approvalLine.filter(line => line.type == '참조자');
    // redux에서 가져온 userNo
    const userNo = useSelector((state) => state.user.userNo);
    const [formattedDate, setFormattedDate] = useState("N/A"); // 시간 이상함
    // ✅ date-fns를 활용한 시간 변환 함수
    const convertToKST = (timestamp) => {
        if (!timestamp) {
            console.error("⛔ 오류: timestamp가 존재하지 않습니다!", timestamp);
            return "N/A";
        }
        let dateObj;
        // ✅ 문자열이면 "YYYY-MM-DD HH:mm:ss" → "YYYY-MM-DDTHH:mm:ss" 로 변환 후 Date 객체 생성
        if (typeof timestamp === "string") {
            // 공백(" ")을 "T"로 변경
            timestamp = timestamp.replace(" ", "T");
            dateObj = new Date(timestamp);
        }
        else if (typeof timestamp === "number") {
            // ✅ 초 단위(10자리)라면 밀리초로 변환
            if (timestamp.toString().length === 10) {
                timestamp *= 1000;
            }
            dateObj = new Date(timestamp);
        }
        else {
            console.error("⛔ 오류: 지원되지 않는 timestamp 형식입니다!", timestamp);
            return "N/A";
        }
        // ✅ 날짜가 유효한지 확인
        if (isNaN(dateObj.getTime())) {
            console.error("⛔ 오류: 유효하지 않은 날짜입니다!", timestamp);
            return "N/A";
        }
        // ✅ KST 변환 (9시간 추가)
        const kstDate = addHours(dateObj, 9);
        // ✅ 포맷팅된 한국 시간 반환
        return format(kstDate, "yyyy-MM-dd HH:mm", { locale: ko });
    };
    useEffect(() => {
        if (approvers.length > 0 && approvers[0]?.approvalDate) {
            let timestamp = approvers[0].approvalDate;
            let convertedTime = convertToKST(timestamp);
        }
    }, [approvers]);
    //  백엔드에서 결재 완료 데이터 가져오기
    useEffect(() => {
        if (!approvalNo)
            return;
        const fetchWriteUser = axios.get(`${import.meta.env.VITE_API_URL}/workly/api/approval/getWriteUser`, {
            params: {
                approvalNo: approvalNo
            }
        });
        const fetchApprovalData = axios.get(`${import.meta.env.VITE_API_URL}/workly/api/approval/getApprovalData`, {
            params: {
                approvalNo: approvalNo,
            }
        });
        const fetchApprovalLine = axios.get(`${import.meta.env.VITE_API_URL}/workly/api/approval/getApprovalLine`, {
            params: {
                approvalNo: approvalNo,
            }
        });
        const fetchAttachments = axios
            .get(`${import.meta.env.VITE_API_URL}/workly/api/approval/getApprovalAttachments/${approvalNo}`)
            .catch(() => ({ data: [] })); // 404 에러 시 빈 배열 반환
        Promise.allSettled([fetchWriteUser, fetchApprovalData, fetchApprovalLine, fetchAttachments])
            .then(results => {
            const writeUserRes = results[0].status === "fulfilled" ? results[0].value?.data ?? null : null;
            const approvalRes = results[1].status === "fulfilled" ? results[1].value?.data ?? null : null;
            const lineRes = results[2].status === "fulfilled" ? results[2].value?.data ?? [] : [];
            const attachRes = results[3].status === "fulfilled" ? results[3].value?.data ?? [] : [];
            console.log("✅ API 응답 결과:", {
                writeUserRes,
                approvalRes,
                lineRes,
                attachRes
            });
            if (writeUserRes)
                setWriteUser(writeUserRes);
            if (approvalRes)
                setApprovalData(approvalRes);
            setApprovalLine(lineRes);
            if (attachRes.length > 0) {
                const attachmentList = attachRes.map(file => ({
                    fileName: file.fileName,
                    fileUrl: URL.createObjectURL(new Blob([Uint8Array.from(atob(file.fileData), c => c.charCodeAt(0))], // 이 부분 변경 필요
                    { type: file.mimeType || "application/octet-stream" }))
                }));
                setAttachments(attachmentList);
            }
            else {
                setAttachments([]); // 첨부파일이 없으면 빈 배열 유지
            }
        })
            .catch(error => {
            console.error("데이터 로딩 실패:", error);
            setError("데이터를 불러오는 데 실패했습니다");
        });
    }, [approvalNo]);
    //console.log("approvalLine: ", approvalLine)
    return (_jsxs("div", { style: containerStyle, children: [_jsx("h2", { style: titleStyle, children: "\uACB0\uC7AC \uC644\uB8CC \uBB38\uC11C" }), _jsx("div", { style: dividerStyleBold }), _jsxs("div", { style: rowContainerStyle, children: [_jsxs("div", { style: rowStyle, children: [_jsx("label", { style: labelStyle, children: "\uC885\uB958" }), _jsx("span", { style: textStyle, children: approvalData?.approvalType || "N/A" })] }), _jsxs("div", { style: rowStyle, children: [_jsx("label", { style: labelStyle, children: "\uAE30\uC548\uC790" }), _jsx("span", { style: textStyle, children: writeUser?.userName || "N/A" })] })] }), _jsx("div", { style: dividerStyle }), _jsxs("div", { style: rowStyle, children: [_jsx("label", { style: labelStyle, children: "\uC81C\uBAA9" }), _jsx("span", { style: textStyle, children: approvalData?.approvalTitle || "제목 없음" })] }), _jsx("div", { style: dividerStyle }), _jsxs("div", { children: [_jsx("label", { style: labelStyle, children: "\uACB0\uC7AC\uB77C\uC778" }), _jsx("div", { style: approvalListContainerStyle, children: approvers.length > 0 ? (approvers.map((line, index) => {
                            const formattedDate = convertToKST(line.approvalDate); // ✅ 개별 날짜 변환
                            return (_jsxs("div", { style: approvalItemStyle, children: [_jsxs("span", { children: [line.deptName, " / ", line.positionName, " / ", line.userName] }), _jsx("span", { style: dateStyle, children: formattedDate || "N/A" }), _jsx("span", { style: statusStyle(line), children: getStatusLabel(line) })] }, index));
                        })) : (_jsx("span", { style: textStyle, children: "\uACB0\uC7AC\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })) })] }), _jsx("div", { style: dividerStyle }), _jsxs("div", { style: rowStyle, children: [_jsx("label", { style: labelStyle, children: "\uCCA8\uBD80" }), _jsx("div", { children: attachments.length > 0 ? (attachments.map((file, index) => (_jsx("div", { children: _jsxs("a", { href: file.fileUrl, download: file.fileName, style: textStyle, children: ["\uD83D\uDCCE ", file.fileName] }) }, index)))) : (_jsx("span", { style: textStyle, children: "\uCCA8\uBD80 \uD30C\uC77C \uC5C6\uC74C" })) })] }), _jsx("div", { style: dividerStyle }), _jsxs("div", { style: rowStyle, children: [_jsx("label", { style: labelStyle, children: "\uCC38\uC870" }), _jsx("div", { style: referenceContainerStyle, children: references.length > 0 ? (references.map((ref, index) => (_jsxs("span", { style: referenceItemStyle, children: [ref.deptName, " / ", ref.userName, " ", ref.positionName] }, index)))) : (_jsx("span", { style: textStyle, children: "\uCC38\uC870\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })) })] }), _jsx("div", { style: dividerStyle })] }));
};
// ✅ 상태 값을 문자열로 변환하는 함수 (approvalLineType이 '수신'이면 '수신' 표시)
const getStatusLabel = (line) => {
    if (line.approvalLineType === "수신") {
        return "수신"; // ✅ approvalLineType이 '수신'이면 '수신' 표시
    }
    switch (line.status) {
        case 0: return "대기";
        case 1: return "진행중";
        case 2: return "승인";
        case 3: return "반려";
        default: return "N/A";
    }
};
// ✅ 상태별 스타일 적용 함수 (approvalLineType이 '수신'이면 초록색 적용)
const statusStyle = (line) => {
    if (line.approvalLineType === "수신") {
        return {
            padding: "4px 6px",
            fontSize: "11px",
            borderRadius: "4px",
            color: "white",
            backgroundColor: "#4CAF50", // ✅ '수신'이면 초록색
            width: "60px",
            textAlign: "center"
        };
    }
    return {
        padding: "4px 6px",
        fontSize: "11px",
        borderRadius: "4px",
        color: "white",
        backgroundColor: getStatusColor(line.status), // ✅ 기본 상태별 색상 적용
        width: "60px",
        textAlign: "center"
    };
};
// ✅ 상태별 색상 반환 함수 추가
const getStatusColor = (status) => {
    switch (status) {
        case 0: return "#666"; // 대기 (회색)
        case 1: return "#FFA500"; // 진행중 (오렌지색)
        case 2: return "#4c93ff"; // 승인 (파란색)
        case 3: return "#FF0000"; // 반려 (빨간색)
        default: return "#666"; // 기본값 (회색)
    }
};
// ✅ **컨테이너 스타일**
const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    padding: "20px",
    width: "100%",
    maxWidth: "900px",
    background: "white",
    borderRadius: "8px",
    margin: "0 auto", // ✅ 좌우 중앙 정렬
};
// ✅ **타이틀 스타일**
const titleStyle = {
    fontSize: "16px",
    fontWeight: "700",
    color: "#202224",
    marginBottom: "10px",
};
// ✅ **구분선 스타일**
const dividerStyle = {
    width: "100%",
    height: "1px",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    margin: "10px 0",
};
const dividerStyleBold = {
    width: "100%",
    height: "3px",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    margin: "10px 0",
};
// ✅ **행 스타일**
const rowContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
    gap: "20px",
};
const rowStyle = {
    display: "flex",
    alignItems: "center",
    flex: 1,
    gap: "10px",
};
// ✅ **라벨 스타일**
const labelStyle = {
    width: "80px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#202224",
};
// ✅ **텍스트 스타일**
const textStyle = {
    fontSize: "13px",
    color: "#666"
};
// ✅ **결재라인 스타일**
const approvalListContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "3px",
};
const approvalItemStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 0.5fr 0.6fr", // ✅ 첫 번째 컬럼을 적절히 조정하여 중앙 배치
    alignItems: "center",
    gap: "30px", // ✅ 간격을 적절히 조정하여 균형 맞추기
    fontSize: "12px",
    color: "#666",
    textAlign: "center", // ✅ 텍스트 중앙 정렬
};
// ✅ **결재일자 스타일**
const dateStyle = {
    fontSize: "12px",
    color: "#666",
};
// ✅ **참조자 컨테이너 스타일**
const referenceContainerStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
};
const referenceItemStyle = {
    background: "white",
    border: "1px solid #4880FF",
    borderRadius: "8px",
    padding: "5px 10px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#4880FF",
};
