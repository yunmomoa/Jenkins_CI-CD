import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styles from '../../styles/leave/PolicyModal.module.css';
import axios from '../../utils/CustomAxios';
const PolicyModal = ({ setOpenModal, policy, policyDetail, fetchPolicy }) => {
    const [detail, setDetail] = useState(policy[policyDetail]);
    const changeLeaveDays = (e) => {
        setDetail({
            ...detail,
            leaveDays: Number(e.target.value)
        });
    };
    const handleUpdate = () => {
        console.log(detail);
        axios.put("http://localhost:8003/workly/updatePolicy", {
            policyNo: detail.policyNo,
            minYear: detail.minYear,
            maxYear: detail.maxYear,
            leaveDays: detail.leaveDays
        }, { headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
            alert(response.data.msg);
        })
            .catch((error) => {
            console.log(error.data);
        })
            .finally(() => {
            fetchPolicy();
            setOpenModal(false);
        });
    };
    return (_jsx("div", { className: styles.modalContainer, children: _jsxs("div", { className: styles.sectionContainer, children: [_jsx("h3", { className: styles.h3, children: "\uAE30\uBCF8 \uC5F0\uCC28 \uBCC0\uACBD" }), _jsxs("div", { className: styles.dateSection, children: [_jsx("div", { className: styles.dateLabel, children: "\uADFC\uB85C\uAE30\uAC04" }), _jsxs("div", { className: styles.inputContainer, children: [_jsx("input", { type: "number", placeholder: "\uADFC\uB85C\uAE30\uAC04 \uC785\uB825", value: detail.minYear, className: styles.dateInput, readOnly: true }), _jsx("div", { className: styles.space, children: "~" }), _jsx("input", { type: "number", placeholder: "\uADFC\uB85C\uAE30\uAC04 \uC785\uB825", value: detail.maxYear, className: styles.dateInput, readOnly: true })] })] }), _jsxs("div", { className: styles.leaveSection, children: [_jsx("label", { className: styles.label, children: "\uAE30\uBCF8\uC5F0\uCC28" }), _jsx("input", { type: "number", placeholder: "\uAE30\uBCF8\uC5F0\uCC28 \uC785\uB825", onChange: changeLeaveDays, value: detail.leaveDays, className: styles.input })] }), _jsxs("div", { className: styles.buttonSection, children: [_jsx("button", { className: styles.update, onClick: handleUpdate, children: "\uC218\uC815" }), _jsx("button", { className: styles.cancle, onClick: () => setOpenModal(false), children: "\uCDE8\uC18C" })] })] }) }));
};
export default PolicyModal;
