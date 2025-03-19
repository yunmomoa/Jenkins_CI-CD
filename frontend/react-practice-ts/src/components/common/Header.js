import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import changePwd from '@/assets/images/icon/changePwd.png';
import down from '@/assets/images/icon/down.png';
import logout from '@/assets/images/icon/logout.png';
import mypage from '@/assets/images/icon/mypage.png';
import profileImg from '@/assets/images/icon/profile.png';
import { useEffect, useState } from 'react';
import styles from '../../styles/common/Header.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/userSlice';
import { getCookie, removeCookie } from '../../utils/Cookie';
import ChangePwdModal from '../myPage/ChangePwdModal';
function Header() {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [preview, setPreview] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const [openModal, setOpenModal] = useState(false);
    const user = useSelector((state) => state.user);
    const url = `${import.meta.env.VITE_API_URL}/workly/uploads/profile/`;
    useEffect(() => {
        setPreview(user.changeName);
    }, []);
    let title = "";
    switch (true) {
        case pathname.includes("approval"):
        case pathname.includes("Approval"):
            title = "전자결재";
            break;
        case pathname.includes("personnel"):
            title = "인사관리";
            break;
        case pathname.includes("calendar"):
            title = "캘린더";
            break;
        case pathname.includes("form"):
            title = "결재양식관리";
            break;
        case pathname.includes("leave"):
            title = "연차관리";
            break;
        case pathname.includes("myPage"):
            title = "마이페이지";
            break;
        case pathname.includes("AIAssistant"):
            title = "회사규정Q&A";
            break;
        case pathname.includes("AdminPolicyManager"):
            title = "회사규정Q&A 관리";
            break;
        case pathname.includes("OrganizationChart"):
            title = "조직도";
            break;
        default:
            title = "";
            break;
    }
    const toggleDown = () => {
        setDropDownOpen((prev) => !prev);
    };
    const handleLogout = () => {
        if (confirm("로그아웃하시겠습니까?")) {
            removeCookie("user");
            removeCookie("accessToken");
            dispatch(logoutUser());
            console.log("cookie user확인: ", getCookie("user"));
            console.log("cookie token확인: ", getCookie("accessToken"));
            navigate("/");
        }
    };
    return (_jsxs(_Fragment, { children: [openModal &&
                _jsx(ChangePwdModal, { setOpenModal: setOpenModal }), _jsxs("header", { children: [_jsx("div", { className: styles.header, children: _jsxs("div", { className: styles.profileArea, children: [!preview && _jsx("img", { src: profileImg, alt: "profile", className: styles.profileImage }), preview && _jsx("img", { src: url + preview, alt: "preview", className: styles.profileImage }), _jsxs("div", { className: styles.profileInfo, children: [_jsx("div", { className: styles.profileName, children: user.userName }), _jsxs("div", { className: styles.infoSection, children: [_jsx("div", { className: styles.profileRole, children: user.deptName }), _jsx("div", { className: styles.profileRole, children: user.positionName })] })] }), _jsx("button", { className: styles.dropdownButton, children: _jsx("div", { children: _jsx("img", { src: down, alt: "\uB4DC\uB86D\uB2E4\uC6B4", onClick: toggleDown }) }) }), dropDownOpen && (_jsxs("div", { className: styles.dropdownMenu, children: [_jsxs("div", { className: styles.menuItem, onClick: () => navigate("/myPage"), children: [_jsx("img", { src: mypage, alt: "\uB9C8\uC774 \uD398\uC774\uC9C0" }), _jsx("span", { children: "\uB9C8\uC774 \uD398\uC774\uC9C0" })] }), _jsxs("div", { className: styles.menuItem, onClick: () => setOpenModal(true), children: [_jsx("img", { src: changePwd, alt: "\uBE44\uBC00\uBC88\uD638 \uBCC0\uACBD" }), _jsx("span", { children: "\uBE44\uBC00\uBC88\uD638 \uBCC0\uACBD" })] }), _jsxs("div", { className: styles.menuItem, onClick: handleLogout, children: [_jsx("img", { src: logout, alt: "\uB85C\uADF8\uC544\uC6C3" }), _jsx("span", { children: "\uB85C\uADF8\uC544\uC6C3" })] })] }))] }) }), _jsx("div", { children: _jsx("h2", { className: styles.category, children: title }) })] })] }));
}
export default Header;
