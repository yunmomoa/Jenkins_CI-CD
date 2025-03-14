import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/personnel/Category.module.css';
const Category = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (_jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { className: `${styles.button} ${location.pathname === "/personnel" ? styles.activeButton : ""}`, onClick: () => navigate("/personnel"), children: "\uC778\uC0AC\uC815\uBCF4\uC870\uD68C" }), _jsx("button", { className: `${styles.button} ${location.pathname === "/personnel/createEmployee" ? styles.activeButton : ""}`, onClick: () => navigate("/personnel/createEmployee"), children: "\uC0AC\uC6D0\uC0DD\uC131" })] }));
};
export default Category;
