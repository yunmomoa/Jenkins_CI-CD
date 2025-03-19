import styles from '../../styles/myPage/MyPageCategory.module.css';
import { useLocation, useNavigate } from "react-router-dom";

const MyPageCategory = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={styles.buttonGroup}>
            <button 
            className={`${styles.button} ${location.pathname === "/myPage" ? styles.activeButton : ""}`}
            onClick={() => navigate("/myPage")}    
            >내 정보 수정</button>
        </div>
    )
}

export default MyPageCategory;