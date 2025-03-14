import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/leave/LeaveCategory.module.css';
import { useSelector } from 'react-redux';
const LeaveCategory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => {
        return state.user;
    });
    return (_jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { className: `${styles.button} ${location.pathname === "/leave" ? styles.activeButton : ""}`, onClick: () => navigate("/leave"), children: "\uB0B4 \uC5F0\uCC28 \uC0AC\uC6A9\uB0B4\uC5ED" }), user.role === "ROLE_HR" &&
                _jsx("button", { className: `${styles.button} ${location.pathname === "/leave/manage" ? styles.activeButton : ""}`, onClick: () => navigate("/leave/manage"), children: "\uC0AC\uC6D0 \uC5F0\uCC28 \uAD00\uB9AC" }), user.role === "ROLE_HR" &&
                _jsx("button", { className: `${styles.button} ${location.pathname === "/leave/policy" ? styles.activeButton : ""}`, onClick: () => navigate("/leave/policy"), children: "\uAE30\uBCF8 \uC5F0\uCC28 \uAD00\uB9AC" })] }));
};
export default LeaveCategory;
