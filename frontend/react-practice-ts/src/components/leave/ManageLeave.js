import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from '../../styles/leave/ManageLeave.module.css';
import search from '@/assets/images/icon/search.png';
import { useEffect, useState } from 'react';
import MemberSearchModal from './MemberSearchModal';
import axios from '../../utils/CustomAxios';
import { format } from 'date-fns';
const ManageLeave = () => {
    const [openModal, setOpenModal] = useState(false); // 모달창 열기
    const [memberList, setMemberList] = useState([]); // 모달창 사원 리스트
    const [year, setYear] = useState(new Date().getFullYear()); // 선택 연도
    const [updateLeave, setUpdateLeave] = useState(1); // 총 연차 변경 state
    const [annualLeave, setAnnualLeave] = useState({}); // 해당 사원의 연도별 휴가 수
    const [leaveHistory, setleaveHistory] = useState([]); // 해당 사원의 연도별 휴가 내역
    const [user, setUser] = useState({
        userNo: 1,
        userName: "",
        deptName: "",
        positionName: "",
        status: "",
        hireDate: ""
    });
    const handleChange = (e) => {
        const newYear = e.target.name === 'minus' ? year - 1 : year + 1;
        if (user.userName) {
            const hireYear = new Date(user.hireDate).getFullYear();
            if (newYear < hireYear) {
                alert("입사일 이전 기간으로 이동할 수 없습니다.");
                return;
            }
        }
        setYear(newYear);
    };
    const handleModal = () => {
        axios.get("http://localhost:8003/workly/memberSearch")
            .then((response) => {
            setMemberList(response.data);
        })
            .catch(() => {
            setMemberList([]);
        });
        setOpenModal(true);
    };
    const handleLeaveDetail = () => {
        axios.get("http://localhost:8003/workly/leaveDetail", {
            params: {
                userNo: user.userNo,
                year
            }
        })
            .then((response) => {
            console.log("response: ", response);
            setAnnualLeave(response.data[0].annualLeave);
            setleaveHistory(response.data);
            setUpdateLeave(response.data[0].annualLeave.totalAnnualLeave);
        })
            .catch((error) => {
            setAnnualLeave({
                totalAnnualLeave: 0,
                usedAnnualLeave: 0
            });
            setleaveHistory([]);
            setUpdateLeave(0);
        });
    };
    const handleUpdateLeave = () => {
        axios.put("http://localhost:8003/workly/updateLeave", null, {
            params: {
                userNo: user.userNo,
                year,
                updateLeave
            }
        })
            .then((response) => {
            handleLeaveDetail();
            alert(response.data.msg);
        })
            .catch((error) => {
            handleLeaveDetail();
            alert(error.response.data.msg);
        });
    };
    useEffect(() => {
        // console.log(user);
        // console.log(annualLeave);
        handleLeaveDetail();
    }, [user, year]);
    return (_jsxs("div", { className: styles.vacationPageContainer, children: [openModal && (_jsx(MemberSearchModal, { setYear: setYear, setUser: setUser, memberList: memberList, setOpenModal: setOpenModal })), _jsxs("div", { className: styles.searchContainer, onClick: handleModal, children: [_jsx("input", { type: "text", className: styles.input, placeholder: "\uC0AC\uC6D0 \uAC80\uC0C9" }), _jsx("button", { className: styles.searchButton, children: _jsx("img", { src: search, alt: 'search' }) })] }), _jsx("div", { className: styles.profileContainer, children: _jsxs("div", { className: styles.profileHeader, children: [user.userName !== "" && (_jsxs("div", { children: [_jsx("h1", { className: styles.profileName, children: user.userName }), _jsxs("div", { className: styles.profileSubInfo, children: [_jsx("span", { children: user.deptName }), _jsx("span", { children: user.positionName }), _jsxs("span", { className: styles.hireDate, children: [_jsx("span", { children: "\uC785\uC0AC\uC77C" }), _jsx("span", { children: format(new Date(user.hireDate), 'yyyy-MM-dd') })] }), _jsx("span", { children: user.status === "Y" ? "재직" : (user.status === "X" ? "퇴직" : "휴직") })] })] })), user.userName === "" && (_jsxs("div", { children: [_jsx("h1", { className: styles.tmpName, children: "\uC774\uB984" }), _jsxs("div", { className: styles.profileSubInfo, children: [_jsx("span", { children: "\uBD80\uC11C\uBA85" }), _jsx("span", { children: "\uC9C1\uAE09\uBA85" }), _jsxs("span", { className: styles.hireDate, children: [_jsx("span", { children: "\uC785\uC0AC\uC77C" }), _jsx("span", {})] }), _jsx("span", { children: "\uC7AC\uC9C1\uC0C1\uD0DC" })] })] })), _jsxs("div", { className: styles.infoContainer, children: [_jsxs("div", { className: styles.annualLeaveLabel, children: [year, "\uB144 \uC794\uC5EC \uC5F0\uCC28"] }), _jsxs("div", { className: styles.annualLeaveContainer, children: [_jsx("span", { className: styles.usedLeaveCount, children: annualLeave.totalAnnualLeave - annualLeave.usedAnnualLeave }), _jsx("span", { children: "/" }), _jsx("span", { children: _jsx("input", { className: styles.annualLeaveCount, type: "number", onChange: (e) => { setUpdateLeave(e.target.value); }, value: updateLeave }) }), _jsx("button", { className: styles.editButton, onClick: handleUpdateLeave, children: "\uC218\uC815" })] })] })] }) }), _jsxs("div", { className: styles.dateSection, children: [_jsx("div", { children: _jsx("button", { onClick: handleChange, className: styles.button, name: 'minus', children: "<" }) }), _jsxs("div", { onClick: () => setYear(new Date().getFullYear()), className: styles.date, children: [year, _jsx("input", { type: "date", className: styles.calendar })] }), _jsx("div", { children: _jsx("button", { onClick: handleChange, className: styles.button, name: 'plus', children: ">" }) })] }), _jsx("div", { className: styles.listContainer, children: _jsxs("table", { className: styles.table, children: [_jsx("thead", { className: styles.stickyHeader, children: _jsxs("tr", { className: styles.headerRow, children: [_jsx("th", { className: styles.thStyle, children: "No" }), _jsx("th", { className: styles.thStyle, children: "\uD734\uAC00\uAD6C\uBD84" }), _jsx("th", { className: styles.thStyle, children: "\uC2DC\uC791\uC77C" }), _jsx("th", { className: styles.thStyle, children: "\uC885\uB8CC\uC77C" }), _jsx("th", { className: styles.thStyle, children: "\uD734\uAC00\uC77C\uC218" }), _jsx("th", { className: styles.thStyle, children: "\uC0C1\uD0DC" })] }) }), _jsxs("tbody", { children: [leaveHistory.length > 0 && leaveHistory[0].leaveHistory !== null && leaveHistory.map((e, i) => (_jsxs("tr", { className: styles.rowStyle, children: [_jsx("td", { className: styles.tdStyle, children: i + 1 }), _jsx("td", { className: styles.tdStyle, children: e.leaveHistory.leaveType }), _jsx("td", { className: styles.tdStyle, children: new Date(e.leaveHistory.startDate).toISOString().split("T")[0] }), _jsx("td", { className: styles.tdStyle, children: new Date(e.leaveHistory.endDate).toISOString().split("T")[0] }), _jsx("td", { className: styles.tdStyle, children: e.leaveHistory.leaveDays }), _jsx("td", { className: styles.tdStyle, children: e.leaveHistory.approvalStatus === 1 ? "신청" : (e.leaveHistory.approvalStatus === 2 ? "승인" : "반려") })] }, i))), leaveHistory.length === 0 && user.userName === "" &&
                                    _jsx("tr", { className: styles.rowStyle, children: _jsx("td", { className: styles.tdStyle, colSpan: 6, children: "\uC0AC\uC6D0\uC744 \uAC80\uC0C9\uD574\uC8FC\uC138\uC694." }) }), (leaveHistory.length === 0 || (leaveHistory.length > 0 && leaveHistory[0].leaveHistory === null)) && user.userName !== "" &&
                                    _jsx("tr", { className: styles.rowStyle, children: _jsx("td", { className: styles.tdStyle, colSpan: 6, children: "\uD734\uAC00 \uC0AC\uC6A9 \uB0B4\uC5ED\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC5F0\uB3C4\uB97C \uD074\uB9AD\uD558\uC5EC \uD604\uC7AC\uC5F0\uB3C4\uB85C \uC774\uB3D9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }) })] })] }) })] }));
};
export default ManageLeave;
