import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchNotifications, clearNotification } from "../../features/approvalNotificationsSlice";
export const ApprovalHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(null);
    const dispatch = useDispatch();
    // Redux에서 알림 개수 가져오기 (타입 명시)
    const notifications = useSelector((state) => state.notifications);
    const userNo = useSelector((state) => state.user.userNo);
    // 알림 데이터 가져오기 (백엔드 연동)
    useEffect(() => {
        if (userNo) {
            dispatch(fetchNotifications(userNo));
        }
    }, [userNo, dispatch]);
    const handleButtonClick = async (index, path, page) => {
        setActiveIndex(index);
        navigate(path);
        dispatch(clearNotification(page));
    };
    return (_jsx("header", { style: headerStyle, children: buttons.map((button, index) => {
            const isActive = location.pathname === button.path;
            const notificationCount = notifications?.[button.page] ?? 0; // undefined 방지 처리
            return (_jsxs("button", { onClick: () => handleButtonClick(index, button.path, button.page), style: isActive ? activeButtonStyle : buttonStyle, children: [button.label, notificationCount > 0 && (_jsx("span", { style: notificationBadgeStyle, children: notificationCount }))] }, index));
        }) }));
};
// 버튼 목록
const buttons = [
    { label: "내 문서함", path: "/approvalMain", page: "approvalMain" },
    { label: "임시저장", path: "/approvalTempPage", page: "approvalTemp" },
    { label: "결재진행", path: "/ApprovalProgressPage", page: "approvalProgress" },
    { label: "결재완료", path: "/ApprovalFinishPage", page: "approvalFinish" },
    { label: "결재요청", path: "/ApprovalRequestPage", page: "approvalRequest" },
    { label: "결재참조", path: "/ApprovalReferencePage", page: "approvalReference" },
    { label: "결재수신", path: "/ApprovalSendPage", page: "approvalSend" },
    { label: "결재반려", path: "/approvalRejectPage", page: "approvalReject" },
];
// 스타일 정의
const headerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10vh",
    gap: 40,
    borderRadius: 10,
};
const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
    background: "white",
    borderRadius: 14,
    border: "0.3px solid #B9B9B9",
    cursor: "pointer",
    textDecoration: "none",
    color: "black",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
    padding: "0 15px",
    position: "relative", // 알림 뱃지 스타일 적용을 위해 추가
};
const activeButtonStyle = {
    ...buttonStyle,
    background: "#4880FF",
    color: "white",
    border: "0.3px solid #4880FF",
};
const notificationBadgeStyle = {
    position: "absolute",
    top: -5, // 뱃지 위치 조정
    right: -5,
    background: "red",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};
