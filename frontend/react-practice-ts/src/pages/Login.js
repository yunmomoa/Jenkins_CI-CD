import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/mainpage/Login.module.css';
import axios from "../utils/CustomAxios";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice";
import { getCookie, removeCookie, setCookie, setIdCookie } from "../utils/Cookie";
const Login = () => {
    const [userNo, setUserNo] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [rememberId, setRememberId] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = (e) => {
        e.preventDefault();
        const userNoAsInt = Number(userNo);
        if (!userNo) {
            alert("아이디를 입력하세요.");
            return;
        }
        if (!userPwd) {
            alert("비밀번호를 입력하세요.");
            return;
        }
        if (rememberId) {
            setIdCookie('rememberId', userNo, 90);
        }
        else {
            removeCookie("rememberId");
        }
        axios.post(`${import.meta.env.VITE_API_URL}/workly/login`, {
            userNo: userNoAsInt,
            userPwd
        })
            .then((response) => {
            console.log("로그인 성공 response: ", response.data);
            const jwtToken = response.data.jwtToken;
            const user = response.data.user;
            setCookie("accessToken", jwtToken);
            setCookie("user", JSON.stringify(user));
            dispatch(loginUser(response.data.user));
            console.log("cookie user확인: ", getCookie("user"));
            console.log("cookie token확인: ", getCookie("accessToken"));
            console.log("localStorage 확인: ", localStorage.getItem("user"));
            navigate("/main", { replace: true });
        }).catch((error) => {
            console.log(error.response.data);
            const failCount = error.response.data.failCount;
            if (failCount < 5) {
                alert(`${error.response.data.msg} [${failCount}/5]`);
            }
            else {
                alert(error.response.data.msg);
            }
        }).finally(() => setUserPwd(''));
    };
    useEffect(() => {
        console.log("cookie user확인: ", getCookie("user"));
        console.log("cookie token확인: ", getCookie("accessToken"));
        console.log("localStorage 확인: ", localStorage.getItem("user"));
        console.log("cookie rememberId확인: ", getCookie("rememberId"));
        console.log(".env 변수확인: ", import.meta.env.VITE_API_URL);
        const userNo = getCookie("rememberId");
        if (userNo) {
            setUserNo(userNo);
            setRememberId(true);
        }
        document.body.classList.add(styles.myBodyStyle);
        return () => {
            document.body.classList.remove(styles.myBodyStyle);
        };
    }, []);
    return (_jsx(_Fragment, { children: _jsx("div", { className: styles.loginContainer, children: _jsxs("div", { className: styles.loginWrapper, children: [_jsx("h1", { className: styles.logo, children: "Workly" }), _jsxs("form", { onSubmit: handleLogin, children: [_jsx("label", { htmlFor: "userNo", className: styles.labelText, children: "ID" }), _jsx("input", { type: "text", id: "userNo", className: styles.inputField, placeholder: "\uC0AC\uC6D0\uBC88\uD638", value: userNo, onChange: (e) => setUserNo(e.target.value) }), _jsx("label", { htmlFor: "userPw", className: styles.labelText, children: "\uBE44\uBC00\uBC88\uD638" }), _jsx("input", { type: "password", id: "userPw", value: userPwd, className: styles.inputField, placeholder: "\uBE44\uBC00\uBC88\uD638", onChange: (e) => setUserPwd(e.target.value) }), _jsxs("div", { className: styles.saveContainer, children: [_jsx("input", { type: "checkbox", id: "saveId", className: styles.saveId, checked: rememberId, onChange: () => setRememberId(!rememberId) }), _jsx("label", { htmlFor: "saveId", className: styles.saveLabel, children: "\uC544\uC774\uB514 \uC800\uC7A5" })] }), _jsx("button", { type: "submit", className: styles.loginBtn, children: "\uB85C\uADF8\uC778" }), _jsxs("div", { className: styles.footer, children: [_jsx("p", { children: "\uBE44\uBC00\uBC88\uD638 \uBD84\uC2E4 \uC2DC \uC778\uC0AC\uD300\uC5D0 \uBB38\uC758\uD574\uC8FC\uC138\uC694" }), _jsx("label", { className: styles.notice, onClick: () => navigate("/CompanyEnrollPage"), children: "\uBC95\uC778 \uD68C\uC6D0\uAC00\uC785" })] })] })] }) }) }));
};
export default Login;
