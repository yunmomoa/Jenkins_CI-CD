import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styles from '../../styles/myPage/ChangePwdModal.module.css';
import { useSelector } from 'react-redux';
import axios from '../../utils/CustomAxios';
// import axios from 'axios';
const ChangePwdModal = ({ setOpenModal }) => {
    const [currentPwd, setCurrentPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [pwdErrorMessage, setPwdErrorMessage] = useState("");
    const [regErrorMessage, setRegErrorMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    let user = useSelector((state) => {
        return state.user;
    });
    const handleUpdate = () => {
        setRegErrorMessage("");
        setErrorMessage("");
        // 새 비밀번호 유효성 검사
        if (!passwordRegex.test(newPwd)) {
            setRegErrorMessage("영문, 숫자, 특수문자 를 포함하여 8~20자로 입력해주세요.");
            setNewPwd("");
            setConfirmPwd("");
            return;
        }
        // 새 비밀번호와 확인 비밀번호 일치 여부 확인
        if (newPwd !== confirmPwd) {
            setErrorMessage("새 비밀번호가 일치하지 않습니다.");
            setConfirmPwd("");
            return;
        }
        if (confirm("비밀번호를 변경하시겠습니까?")) {
            axios.put("http://localhost:8003/workly/changePwd", {
                userNo: user.userNo,
                currentPwd,
                newPwd
            })
                .then((response) => {
                console.log("response: ", response);
                alert(response.data.msg);
                setOpenModal(false);
            })
                .catch((error) => {
                setPwdErrorMessage(error.response.data.msg);
                setCurrentPwd("");
            });
        }
    };
    return (_jsx("div", { className: styles.modalContainer, children: _jsxs("div", { className: styles.sectionContainer, children: [_jsx("h3", { className: styles.h3, children: "\uBE44\uBC00\uBC88\uD638 \uBCC0\uACBD" }), _jsxs("div", { className: styles.mainSection, children: [_jsxs("div", { className: styles.changePwd, children: [_jsx("label", { className: styles.label, children: "\uD604\uC7AC \uBE44\uBC00\uBC88\uD638" }), _jsx("input", { type: "password", placeholder: "\uD604\uC7AC \uBE44\uBC00\uBC88\uD638 \uC785\uB825", className: styles.input, value: currentPwd, onChange: (e) => setCurrentPwd(e.target.value) })] }), pwdErrorMessage && _jsx("p", { className: styles.error, children: pwdErrorMessage }), _jsxs("div", { className: styles.changePwd, children: [_jsx("label", { className: styles.label, children: "\uC0C8 \uBE44\uBC00\uBC88\uD638" }), _jsx("input", { type: "password", placeholder: "\uC601\uBB38, \uC22B\uC790, \uD2B9\uC218\uBB38\uC790 \uD3EC\uD568 8~20\uC790 \uC785\uB825", className: styles.input, value: newPwd, onChange: (e) => setNewPwd(e.target.value) })] }), regErrorMessage && _jsx("p", { className: styles.error, children: regErrorMessage }), _jsxs("div", { className: styles.changePwd, children: [_jsx("label", { className: styles.label, children: "\uC0C8 \uBE44\uBC00\uBC88\uD638 \uD655\uC778" }), _jsx("input", { type: "password", placeholder: "\uC0C8 \uBE44\uBC00\uBC88\uD638 \uD655\uC778", className: styles.input, value: confirmPwd, onChange: (e) => setConfirmPwd(e.target.value) })] }), errorMessage && _jsx("p", { className: styles.error, children: errorMessage })] }), _jsxs("div", { className: styles.buttonSection, children: [_jsx("button", { className: styles.update, onClick: handleUpdate, children: "\uC218\uC815" }), _jsx("button", { className: styles.cancle, onClick: () => setOpenModal(false), children: "\uCDE8\uC18C" })] })] }) }));
};
export default ChangePwdModal;
