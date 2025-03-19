import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { ApprovalMemoModal } from "./approvalMemoModal";
import ApprovalOutcheckModal from "./approvalOutcheckModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
export const ApprovalWriteFooter = ({ approvalData, selectedCCUsers, submitApproval, approvalNo }) => {
    useEffect(() => {
        console.log("footer에서 받은 approvalData:", approvalData);
    }, [approvalData]);
    useEffect(() => {
        console.log("✅ Footer에서 받은 참조자 목록:", selectedCCUsers);
    }, [selectedCCUsers]);
    // Redux에서 user 정보 가져오기
    const userNo = useSelector((state) => state.user.userNo);
    const [modalOpen, setModalOpen] = useState(false);
    const [outCheckModalOpen, setOutCheckModalOpen] = useState(false);
    const navigate = useNavigate();
    const handleExit = () => {
        navigate("/approvalMain/ApprovalWriteDetailPage");
    };
    return (_jsxs("footer", { style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 20px",
            width: "100%",
            gap: "700px",
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
                    }, onClick: () => alert("임시 저장 기능은 Page에서 구현"), children: "\uC784\uC2DC\uC800\uC7A5" }) }), _jsxs("div", { style: { display: "flex", gap: "10px" }, children: [_jsx("button", { style: {
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
                        }, onClick: async () => {
                            if (!approvalData.approvalType || !approvalData.approvalTitle || !approvalData.approvalContent || !approvalData.approvalLine) {
                                alert("필수 입력사항을 모두 입력해야 합니다.");
                                return; // ✅ 필수 입력 사항이 없으면 실행 중단
                            }
                            // ✅ 결재 상신 확인창 추가
                            const isConfirmed = window.confirm("결재 상신하시겠습니까?");
                            if (!isConfirmed) {
                                console.log("🚀 사용자가 결재 상신을 취소함");
                                return; // ✅ 취소를 선택하면 실행 중단 (모달도 뜨지 않음)
                            }
                            await submitApproval(); // ✅ 결재 상신 API 실행
                            setTimeout(() => {
                                setModalOpen(true); // ✅ approvalNo 업데이트 후 모달 열기
                            }, 100);
                        }, children: "\uACB0\uC7AC\uC0C1\uC2E0" }), modalOpen && (_jsx(ApprovalMemoModal, { approvalNo: approvalNo, onClose: () => setModalOpen(false), onSave: (memoContent) => {
                            console.log("🔥 메모 저장 요청:", memoContent, "approvalNo:", approvalData.approvalNo);
                            if (memoContent) {
                                axios.post(`${import.meta.env.VITE_API_URL}/workly/api/approvalMemos/create`, {
                                    approvalNo: approvalNo, // ✅ 기존 approvalNo 유지
                                    userNo: userNo,
                                    memoContent: memoContent,
                                }).then(() => {
                                    console.log("🔥 메모 저장 완료!");
                                    alert("메모 등록 완료");
                                }).catch((error) => {
                                    console.error("🚨 메모 저장 실패:", error);
                                });
                            }
                            setModalOpen(false);
                        } })), _jsx("button", { style: {
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
                        }, onClick: () => setOutCheckModalOpen(true), children: "\uACB0\uC7AC\uCDE8\uC18C" }), outCheckModalOpen && (_jsx(ApprovalOutcheckModal, { onClose: () => setOutCheckModalOpen(false), onGoBack: () => setOutCheckModalOpen(false), onExit: handleExit }))] })] }));
};
