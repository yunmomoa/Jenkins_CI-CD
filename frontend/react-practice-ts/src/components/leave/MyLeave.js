import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styles from '../../styles/leave/MyLeave.module.css';
import { useSelector } from 'react-redux';
import axios from '../../utils/CustomAxios';
import Pagination2 from '../common/Pagination';
const MyLeave = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [history, setHistory] = useState([]); // 연차 사용 내역 리스트
    const [annualLeave, setAnnualLeave] = useState({}); // 총 연차 수
    const [pageInfo, setPageInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    let user = useSelector((state) => {
        return state.user;
    });
    const handleReset = () => {
        setYear(new Date().getFullYear());
    };
    const handleChange = (e) => {
        const newYear = e.target.name === 'minus' ? year - 1 : year + 1;
        if (user.userName) {
            const hireYear = new Date(user.hireDate).getFullYear();
            if (newYear < hireYear) {
                alert("입사일 이전 기간으로 이동할 수 없습니다.");
                return;
            }
        }
        setCurrentPage(1);
        setYear(newYear);
    };
    useEffect(() => {
        console.log(user);
        axios.get(`${import.meta.env.VITE_API_URL}/workly/myLeave`, {
            params: {
                year,
                userNo: user.userNo,
                cPage: currentPage
            }
        })
            .then((response) => {
            console.log(response.data);
            setHistory(response.data.list);
            setAnnualLeave(response.data.list[0].annualLeave);
            setPageInfo(response.data.pi);
        })
            .catch((error) => {
            setHistory([]);
            setAnnualLeave({
                totalAnnualLeave: 0,
                usedAnnualLeave: 0
            });
            setPageInfo({});
        });
    }, [currentPage, year]);
    return (_jsxs("div", { children: [_jsxs("div", { className: styles.header, children: [_jsxs("div", { className: styles.dateSection, children: [_jsx("div", { children: _jsx("button", { onClick: handleChange, className: styles.button, name: 'minus', children: "<" }) }), _jsxs("div", { onClick: handleReset, className: styles.date, children: [year, _jsx("input", { type: "date", className: styles.calendar })] }), _jsx("div", { children: _jsx("button", { onClick: handleChange, className: styles.button, name: 'plus', children: ">" }) })] }), _jsx("div", { className: styles.infoSection, children: _jsxs("div", { className: styles.content, children: [_jsx("div", { className: styles.title, children: "\uC794\uC5EC" }), _jsxs("span", { className: styles.rest, children: [annualLeave.totalAnnualLeave - annualLeave.usedAnnualLeave, " \uC77C"] }), _jsx("div", { className: styles.title, children: "\uC0AC\uC6A9" }), _jsxs("span", { className: styles.rest, children: [annualLeave.usedAnnualLeave, " \uC77C"] }), _jsx("div", { className: styles.title, children: "\uCD1D \uC5F0\uCC28" }), _jsxs("span", { className: styles.total, children: [annualLeave.totalAnnualLeave, " \uC77C"] })] }) })] }), _jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { className: styles.headerRow, children: [_jsx("th", { className: styles.thStyle, children: "No" }), _jsx("th", { className: styles.thStyle, children: "\uD734\uAC00\uAD6C\uBD84" }), _jsx("th", { className: styles.thStyle, children: "\uC2DC\uC791\uC77C" }), _jsx("th", { className: styles.thStyle, children: "\uC885\uB8CC\uC77C" }), _jsx("th", { className: styles.thStyle, children: "\uD734\uAC00\uC77C\uC218" }), _jsx("th", { className: styles.thStyle, children: "\uC0C1\uD0DC" })] }) }), _jsxs("tbody", { children: [history.length > 0 && history[0].leaveHistory !== null && history.map((e, i) => (_jsxs("tr", { className: styles.rowStyle, children: [_jsx("td", { className: styles.tdStyle, children: i + 1 }), _jsx("td", { className: styles.tdStyle, children: e.leaveHistory.leaveType }), _jsx("td", { className: styles.tdStyle, children: new Date(e.leaveHistory.startDate).toISOString().split("T")[0] }), _jsx("td", { className: styles.tdStyle, children: new Date(e.leaveHistory.endDate).toISOString().split("T")[0] }), _jsx("td", { className: styles.tdStyle, children: e.leaveHistory.leaveDays }), _jsx("td", { className: styles.tdStyle, children: e.leaveHistory.approvalStatus === 1 ? "신청" : (e.leaveHistory.approvalStatus === 2 ? "승인" : "반려") })] }, i))), (history.length === 0 || (history.length > 0 && history[0].leaveHistory === null)) && user.userName !== "" &&
                                _jsx("tr", { className: styles.rowStyle, children: _jsx("td", { className: styles.tdStyle, colSpan: 6, children: "\uD734\uAC00 \uC0AC\uC6A9 \uB0B4\uC5ED\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) })] })] }), _jsx(Pagination2, { pageInfo: pageInfo, setCurrentPage: setCurrentPage })] }));
};
export default MyLeave;
