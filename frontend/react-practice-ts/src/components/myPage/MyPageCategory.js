import { jsx as _jsx } from "react/jsx-runtime";
import styles from '../../styles/myPage/MyPageCategory.module.css';
import { useLocation, useNavigate } from "react-router-dom";
const MyPageCategory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (_jsx("div", { className: styles.buttonGroup, children: _jsx("button", { className: `${styles.button} ${location.pathname === "/myPage" ? styles.activeButton : ""}`, onClick: () => navigate("/myPage"), children: "\uB0B4 \uC815\uBCF4 \uC218\uC815" }) }));
};
export default MyPageCategory;
