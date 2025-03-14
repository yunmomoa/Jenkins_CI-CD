import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styles from '../../styles/mainpage/Attendance.module.css';
import { useSelector } from 'react-redux';
import profileImg from '../../assets/images/icon/profile.png';
import axios from '../../utils/CustomAxios';
const Attendance = () => {
    const [time, setTime] = useState(new Date());
    const [preview, setPreview] = useState("");
    const url = "http://localhost:8003/workly/uploads/profile/";
    let user = useSelector((state) => {
        return state.user;
    });
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        setPreview(user.changeName);
        return () => clearInterval(interval);
    }, []);
    const formatDate = (time) => {
        const year = time.getFullYear();
        const month = String(time.getMonth() + 1).padStart(2, "0");
        const day = String(time.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    const formatTime = (time) => {
        const hours = String(time.getHours()).padStart(2, "0");
        const minutes = String(time.getMinutes()).padStart(2, "0");
        const seconds = String(time.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    };
    const insertAttendance = () => {
        if (!confirm("출근을 기록하시겠습니까?")) {
            return;
        }
        axios.get("http://localhost:8003/workly/insertAttendance", {
            params: {
                userNo: user.userNo
            }
        }).then((response) => {
            const date = formatTimestamp(response.data.date);
            const message = `${response.data.msg} ${date}`;
            alert(message);
        }).catch((error) => {
            const date = formatTimestamp(error.response.data.date);
            const message = `${error.response.data.msg} ${date}`;
            alert(message);
        });
    };
    const updateAttendance = () => {
        if (!confirm("퇴근을 기록하시겠습니까?")) {
            return;
        }
        axios.get("http://localhost:8003/workly/updateAttendance", {
            params: {
                userNo: user.userNo
            }
        }).then((response) => {
            const date = formatTimestamp(response.data.date);
            const message = `${response.data.msg} ${date}`;
            alert(message);
        }).catch((error) => {
            if (error.response.data.date) {
                const date = formatTimestamp(error.response.data.date);
                const message = `${error.response.data.msg} ${date}`;
                alert(message);
                return;
            }
            alert(error.response.data.msg);
        });
    };
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        const weekday = weekdays[date.getDay()];
        const hour = date.getHours();
        const minute = date.getMinutes();
        return `${month}/${day}(${weekday}) ${hour}:${minute}`;
    };
    return (_jsxs("div", { className: styles.widgetContainer, children: [_jsxs("div", { className: styles.dateSection, children: [_jsxs("div", { className: styles.date, children: [formatDate(time), " (", ["일", "월", "화", "수", "목", "금", "토"][time.getDay()], ")"] }), _jsx("div", { className: styles.time, children: formatTime(time) })] }), _jsxs("div", { className: styles.profile, children: [!preview && _jsx("img", { src: profileImg, alt: "profile", className: styles.avatar }), preview && _jsx("img", { src: url + preview, alt: "preview", className: styles.avatar }), _jsx("div", { className: styles.name, children: user.userName }), _jsxs("div", { className: styles.position, children: [user.deptName, " ", user.positionName] })] }), _jsxs("div", { className: styles.buttons, children: [_jsx("button", { className: styles.checkIn, onClick: insertAttendance, children: "\uCD9C\uADFC" }), _jsx("button", { className: styles.checkOut, onClick: updateAttendance, children: "\uD1F4\uADFC" })] })] }));
};
export default Attendance;
