import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styles from '../../styles/leave/MemberSearchModal.module.css';
const MemberSearchModal = ({ setUser, setYear, memberList, setOpenModal }) => {
    const [searchUser, setSearchUser] = useState("");
    const [filteredUser, setFilterdUser] = useState(memberList);
    const handleDetail = (userNo, userName, deptName, positionName, status, hireDate) => {
        setUser({ userNo, userName, deptName, positionName, status, hireDate });
        setYear(new Date().getFullYear());
        setOpenModal(false);
    };
    useEffect(() => {
        setFilterdUser(memberList.filter(user => user.member.userName.includes(searchUser)));
    }, [searchUser, memberList]);
    return (_jsx("div", { className: styles.modalContainer, children: _jsxs("div", { className: styles.sectionContainer, children: [_jsx("button", { className: styles.closeButton, onClick: () => setOpenModal(false), children: "\u00D7" }), _jsx("div", { className: styles.searchContainer, children: _jsx("input", { type: "text", placeholder: "\uC774\uB984 \uC785\uB825", className: styles.nameInput, onChange: (e) => setSearchUser(e.target.value) }) }), _jsx("div", { className: styles.listContainer, children: _jsxs("table", { className: styles.tableStyle, children: [_jsx("thead", { className: styles.theadStyle, children: _jsxs("tr", { children: [_jsx("th", { className: styles.thStyle, children: "\uBD80\uC11C" }), _jsx("th", { className: styles.thStyle, children: "\uC9C1\uAE09" }), _jsx("th", { className: styles.thStyle, children: "\uC774\uB984" }), _jsx("th", { className: styles.thStyle, children: "\uC0C1\uD0DC" })] }) }), _jsx("tbody", { children: filteredUser.map((e, i) => (_jsxs("tr", { className: styles.rowStyle, onClick: () => handleDetail(e.member.userNo, e.member.userName, e.department.deptName, e.position.positionName, e.member.status, e.member.hireDate), children: [_jsx("td", { className: styles.tdStyle, children: e.department.deptName }), _jsx("td", { className: styles.tdStyle, children: e.position.positionName }), _jsx("td", { className: styles.tdStyle, children: e.member.userName }), _jsx("td", { className: styles.tdStyle, children: e.member.status === 'Y' ? "재직" : (e.member.status === 'X' ? '퇴직' : '휴직') })] }, i))) })] }) })] }) }));
};
export default MemberSearchModal;
