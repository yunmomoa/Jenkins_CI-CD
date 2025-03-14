import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import styles from '../styles/mainpage/MainPage.module.css';
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import Weather from "../components/mainpage/Weather";
import Attendance from "../components/mainpage/Attendance";
import ApprovalCard from "../components/mainpage/ApprovalCard";
import MeetingRoom from "../components/mainpage/MeetingRoom";
import Calendar5 from "../components/mainpage/Calendar5";
const MainPage = () => {
    useEffect(() => {
        // 이미 새로고침한 적이 없으면 새로고침
        if (!sessionStorage.getItem("mainPageRefreshed")) {
            sessionStorage.setItem("mainPageRefreshed", "true");
            window.location.reload();
        }
    }, []);
    return (_jsxs("div", { className: "mainpageContainer", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "componentContainer", children: [_jsx(Header, {}), _jsx("div", { className: "componentContainer1", children: _jsxs("div", { className: styles.components, children: [_jsxs("div", { className: styles.leftComponents, children: [_jsx("div", { className: styles.approval, children: _jsx(ApprovalCard, {}) }), _jsx("div", { className: styles.meetingRoom, children: _jsx(MeetingRoom, {}) }), _jsx("div", { className: styles.weather, children: _jsx(Weather, {}) })] }), _jsxs("div", { className: styles.rightComponents, children: [_jsx("div", { className: styles.attendance, children: _jsx(Attendance, {}) }), _jsx("div", { className: styles.calendar, children: _jsx(Calendar5, {}) })] })] }) })] })] }));
};
export default MainPage;
