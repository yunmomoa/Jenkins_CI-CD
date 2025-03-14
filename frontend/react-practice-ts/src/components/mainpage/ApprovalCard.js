import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import styles from '../../styles/mainpage/ApprovalCard.module.css';
import { useNavigate } from 'react-router-dom';
const ApprovalCard = () => {
    const navigate = useNavigate();
    const approvalRejectCount = useSelector((state) => state.notifications.approvalReject);
    const approvalRequestCount = useSelector((state) => state.notifications.approvalRequest);
    const goToApprovalRejectPage = () => {
        navigate("/approvalRejectPage");
    };
    const goToApprovalRequestPage = () => {
        navigate("/ApprovalRequestPage");
    };
    return (_jsxs("div", { className: styles.card, children: [_jsx("div", { className: styles.header, children: _jsx("span", { children: "\uC804\uC790\uACB0\uC7AC" }) }), _jsxs("div", { className: styles.contentContainer, children: [_jsxs("span", { children: ["\uACB0\uC7AC \uBC18\uB824\uB41C \uBB38\uC11C\uAC00", _jsx("span", { className: styles.strong, children: approvalRejectCount }), "\uAC74 \uC788\uC2B5\uB2C8\uB2E4.", _jsx("span", { className: styles.location, onClick: goToApprovalRejectPage, children: ">>" })] }), _jsxs("span", { children: ["\uC2B9\uC778 \uB300\uAE30 \uC911\uC778 \uACB0\uC7AC \uBB38\uC11C\uAC00", _jsx("span", { className: styles.strong, children: approvalRequestCount }), "\uAC74 \uC788\uC2B5\uB2C8\uB2E4.", _jsx("span", { className: styles.location, onClick: goToApprovalRequestPage, children: ">>" })] })] })] }));
};
export default ApprovalCard;
