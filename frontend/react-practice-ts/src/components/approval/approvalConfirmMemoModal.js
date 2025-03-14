import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const ApprovalConfirmMemoModal = ({ onClose, onSave, approvalNo }) => {
    const userNo = useSelector((state) => state.user.userNo);
    console.log("footer에서 받은 approvalNo값:", approvalNo);
    const [memoContent, setMemocontent] = useState("");
    const navigate = useNavigate();
    const handleApprove = async () => {
        try {
            // 1. 결재 승인 요청(STATUS 변경)
            const approvalResponse = await axios.post("http://localhost:8003/workly/api/approval/approve", {
                approvalNo: approvalNo,
                userNo: userNo,
            });
            // 2. 현재 사용자가 마지막 결재자인지 확인
            const checkFinalApprover = await axios.get(`http://localhost:8003/workly/api/approval/checkFinalApprover`, {
                params: { approvalNo: approvalNo },
            });
            if (checkFinalApprover.data.isFinalApprover) { // 1이면 최종 승인자
                // 3. 마지막 결재자라면 'APPROVAL_STATUS' 변경 및 'END_DAT' 설정
                await axios.post("http://localhost:8003/workly/api/approval/updateFinalApproval", {
                    approvalNo: approvalNo,
                });
            }
            // 4. 메모 저장 요청 (userNo 업데이트 후 실행)
            setTimeout(async () => {
                if (memoContent.trim() !== "") {
                    const memoResponse = await axios.post("http://localhost:8003/workly/api/approvalMemos/create", {
                        approvalNo: approvalNo,
                        userNo: userNo, // 이제 정상적으로 값이 들어감
                        memoContent: memoContent,
                    });
                    alert("결재 의견이 저장되었습니다.");
                }
                // 5. 결재 완료 후 이동
                onSave(memoContent);
                navigate(`/ApprovalCompletePage2/${approvalNo}`);
                setTimeout(() => {
                    window.location.reload();
                });
            }, 100); // 100ms(0.1초) 지연 후 실행
        }
        catch (error) {
            console.error("승인 또는 메모 저장 실패:", error);
            alert("결재 처리리 중 오류가 발생했습니다.");
        }
    };
    return (_jsx("div", { style: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.5)", // 반투명 배경 추가
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }, children: _jsxs("div", { style: {
                width: "442px", // :흰색_확인_표시: 모달 크기 조정
                background: "white",
                borderRadius: "8px",
                border: "1px solid #ccc",
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                position: "relative",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // :흰색_확인_표시: 그림자 추가
            }, children: [_jsx("div", { style: {
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                    }, onClick: onClose, children: _jsx("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M12.25 2.5L2.75 12.5M2.75 2.5L12.25 12.5", stroke: "#1E1E1E", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }) }) }), _jsx("div", { style: {
                        fontSize: "18px",
                        fontWeight: "700",
                        marginBottom: "15px",
                    }, children: "\uACB0\uC7AC\uC758\uACAC" }), _jsx("div", { style: {
                        fontSize: "14px",
                        fontWeight: "600",
                        marginBottom: "5px",
                    } }), _jsx("textarea", { value: memoContent, onChange: (e) => setMemocontent(e.target.value), placeholder: "\uACB0\uC7AC\uC758\uACAC\uC744 \uC785\uB825\uD558\uC138\uC694", style: {
                        width: "100%",
                        height: "100px", // :흰색_확인_표시: 입력 필드 크기 조정
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        padding: "10px",
                        fontSize: "14px",
                        resize: "none",
                        overflowY: "auto",
                        background: "#FAFAFA", // :흰색_확인_표시: 약간의 배경색 추가
                    } }), _jsx("button", { style: {
                        width: "100%", // :흰색_확인_표시: 버튼 크기 조정
                        height: "40px",
                        background: "#4880FF",
                        borderRadius: "8px",
                        border: "none",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginTop: "15px",
                    }, onClick: handleApprove, children: "\uC800\uC7A5" })] }) }));
};
