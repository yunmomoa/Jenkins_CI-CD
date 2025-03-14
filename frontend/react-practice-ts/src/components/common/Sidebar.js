import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from '../../styles/common/Sidebar.module.css';
import icon1 from '@/assets/images/icon/1.png';
import icon2 from '@/assets/images/icon/2.png';
import icon3 from '@/assets/images/icon/3.png';
import icon4 from '@/assets/images/icon/4.png';
import icon5 from '@/assets/images/icon/5.png';
import icon6 from '@/assets/images/icon/6.png';
import icon7 from '@/assets/images/icon/7.png';
import icon9 from '@/assets/images/icon/9.png';
import icon11 from '@/assets/images/icon/11.png';
import icon12 from '@/assets/images/icon/12.png';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/userSlice";
import { openChat } from "../../features/sidebarSlice";
import { removeCookie } from "../../utils/Cookie";
const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state.user;
    });
    const handleLogout = () => {
        if (confirm("로그아웃하시겠습니까?")) {
            removeCookie("user");
            removeCookie("accessToken");
            dispatch(logoutUser());
            navigate("/");
        }
    };
    return (_jsxs("div", { className: styles.sidebar, children: [_jsx("div", { className: styles.title, children: "Workly" }), _jsx("div", { className: styles.sidebarNav, children: _jsxs("nav", { children: [_jsxs("ul", { children: [_jsx(Link, { to: "/main", className: styles.link, children: _jsxs("li", { children: [_jsx("span", { children: _jsx("img", { src: icon1, alt: "\uD648" }) }), _jsx("span", { children: "\uD648" })] }) }), _jsx(Link, { to: "/OrganizationChart", className: styles.link, children: _jsxs("li", { children: [_jsx("span", { children: _jsx("img", { src: icon2, alt: "\uC870\uC9C1\uB3C4" }) }), _jsx("span", { children: "\uC870\uC9C1\uB3C4" })] }) }), _jsx(Link, { to: "/calendar", className: styles.link, children: _jsxs("li", { children: [_jsx("span", { children: _jsx("img", { src: icon3, alt: "\uCE98\uB9B0\uB354" }) }), _jsx("span", { children: "\uCE98\uB9B0\uB354" })] }) }), _jsxs("li", { onClick: () => navigate('/approvalMain'), style: { cursor: "pointer" }, children: [_jsx("span", { children: _jsx("img", { src: icon4, alt: "\uC804\uC790\uACB0\uC7AC" }) }), _jsx("span", { children: "\uC804\uC790\uACB0\uC7AC" })] }), _jsxs("li", { onClick: () => dispatch(openChat()), style: { cursor: "pointer" }, children: [_jsx("span", { children: _jsx("img", { src: icon5, alt: "\uCC44\uD305" }) }), _jsx("span", { children: "\uCC44\uD305" })] }), _jsx(Link, { to: "/leave", className: styles.link, children: _jsxs("li", { children: [_jsx("span", { children: _jsx("img", { src: icon6, alt: "\uC5F0\uCC28\uAD00\uB9AC" }) }), _jsx("span", { children: "\uC5F0\uCC28\uAD00\uB9AC" })] }) }), _jsxs("li", { onClick: () => navigate('/AIAssistantPage'), style: { cursor: "pointer" }, children: [_jsx("span", { children: _jsx("img", { src: icon7, alt: "\uD68C\uC0AC\uADDC\uC815Q&A" }) }), _jsx("span", { children: "\uD68C\uC0AC\uADDC\uC815Q&A" })] })] }), _jsxs("ul", { children: [user.role === "ROLE_HR" &&
                                    _jsx(Link, { to: "/personnel", className: styles.link, children: _jsxs("li", { children: [_jsx("span", { children: _jsx("img", { src: icon9, alt: "\uC778\uC0AC\uAD00\uB9AC" }) }), _jsx("span", { children: "\uC778\uC0AC\uAD00\uB9AC" })] }) }), user.role === "ROLE_HR" &&
                                    _jsxs("li", { onClick: () => navigate('/AdminPolicyManagerPage'), style: { cursor: "pointer" }, children: [_jsx("span", { children: _jsx("img", { src: icon7, alt: "\uADFC\uD0DC\uAD00\uB9AC" }) }), _jsx("span", { children: "\uD68C\uC0AC\uADDC\uC815Q&A \uAD00\uB9AC" })] })] })] }) }), _jsxs("div", { className: styles.logout, children: [_jsx(Link, { to: "/myPage", className: styles.link, children: _jsxs("button", { className: styles.mypageButton, children: [_jsx("span", { children: _jsx("img", { className: styles.imgIcon, src: icon11, alt: "\uB9C8\uC774\uD398\uC774\uC9C0" }) }), _jsx("span", { children: "\uB9C8\uC774\uD398\uC774\uC9C0" })] }) }), _jsxs("button", { className: styles.logoutButton, onClick: handleLogout, children: [_jsx("span", { children: _jsx("img", { className: styles.imgIcon, src: icon12, alt: "\uB85C\uADF8\uC544\uC6C3" }) }), _jsx("span", { children: "\uB85C\uADF8\uC544\uC6C3" })] })] })] }));
};
export default Sidebar;
