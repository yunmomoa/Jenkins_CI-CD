import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styles from '../../styles/leave/LeavePolicy.module.css';
import axios from '../../utils/CustomAxios';
import PolicyModal from './PolicyModal';
const LeavePolicy = () => {
    const [policy, setPolicy] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [policyDetail, setPolicyDetail] = useState(0);
    const fetchPolicy = () => {
        axios.get("http://localhost:8003/workly/leavePolicy")
            .then((response) => {
            setPolicy(response.data);
        })
            .catch(() => {
            alert("기본 연차 조회에 실패하였습니다.");
            setPolicy([]);
        });
    };
    const handleModal = (i) => {
        setPolicyDetail(i);
        setOpenModal(true);
    };
    useEffect(() => {
        fetchPolicy();
    }, []);
    return (_jsxs("div", { className: styles.policyContainer, children: [openModal &&
                _jsx(PolicyModal, { setOpenModal: setOpenModal, policy: policy, policyDetail: policyDetail, fetchPolicy: fetchPolicy }), _jsxs("table", { className: styles.table, children: [_jsx("thead", { className: styles.theadStyle, children: _jsxs("tr", { className: styles.headerRow, children: [_jsx("th", { className: styles.thStyle, children: "No" }), _jsx("th", { className: styles.thStyle, children: "\uADFC\uB85C\uAE30\uAC04" }), _jsx("th", { className: styles.thStyle, children: "\uAE30\uBCF8 \uC5F0\uCC28 \uC77C\uC218" })] }) }), _jsxs("tbody", { children: [policy.length > 0 && policy.map((e, i) => {
                                let displayDate;
                                if (i === 0) {
                                    displayDate = `${e.minYear} 년차`;
                                }
                                else if (i === policy.length - 1) {
                                    displayDate = `${e.minYear} 년차 이상`;
                                }
                                else {
                                    displayDate = `${e.minYear} ~ ${e.maxYear} 년차`;
                                }
                                return (_jsxs("tr", { className: styles.rowStyle, onClick: () => handleModal(i), children: [_jsx("td", { className: styles.tdStyle, children: i + 1 }), _jsx("td", { className: styles.tdStyle, children: displayDate }), _jsxs("td", { className: styles.tdStyle, children: [e.leaveDays, "\uC77C"] })] }, i));
                            }), policy.length === 0 &&
                                _jsx("tr", { children: _jsx("td", { className: styles.tdStyle, colSpan: 3, children: "\uC870\uD68C\uB41C \uB0B4\uC5ED\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) })] })] })] }));
};
export default LeavePolicy;
