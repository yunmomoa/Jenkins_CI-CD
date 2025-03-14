import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./Modal1.module.css";
/**
 * ForceAlertInModal: 강제 오류 메시지 모달 (CSS 모듈 사용)
 */
function ForceAlertInModal({ message, onClose, }) {
    if (!message)
        return null;
    return (_jsx("div", { className: styles.forceAlertOverlay, onClick: onClose, children: _jsxs("div", { className: styles.forceAlertContent, onClick: (e) => e.stopPropagation(), children: [_jsx("p", { className: styles.forceAlertMessage, children: message }), _jsx("button", { className: styles.forceAlertButton, onClick: onClose, children: "\uD655\uC778" })] }) }));
}
const Modal1 = ({ isOpen, onClose, onSave, onDelete, setMeetingRoomEvents, selectedEvent, }) => {
    const [meetingTitle, setMeetingTitle] = useState("");
    const [meetingDescription, setMeetingDescription] = useState("");
    const [meetingDate, setMeetingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedColor, setSelectedColor] = useState("#000000");
    const [meetingRooms, setMeetingRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [forceAlertMessage, setForceAlertMessage] = useState("");
    const user = useSelector((state) => state.user);
    const userNo = user?.userNo;
    // 회의실 목록 불러오기 (mrNo 기준 오름차순 정렬)
    useEffect(() => {
        axios
            .get("http://localhost:8003/workly/meeting-rooms")
            .then((response) => {
            if (Array.isArray(response.data) && response.data.length > 0) {
                const sortedData = response.data.sort((a, b) => Number(a.mrNo) - Number(b.mrNo));
                setMeetingRooms(sortedData);
            }
            else {
                console.error("🚨 빈 데이터 반환됨", response.data);
            }
        })
            .catch((error) => console.error("🚨 회의실 목록 불러오기 오류:", error));
    }, []);
    // 기존 예약 데이터를 수정 모드로 불러오기
    useEffect(() => {
        if (isOpen) {
            if (!selectedEvent || selectedEvent.meetingRoomId === undefined) {
                resetForm();
            }
            else {
                setMeetingTitle(selectedEvent.title || "");
                setMeetingDescription(selectedEvent.description || "");
                setMeetingDate(selectedEvent.start ? selectedEvent.start.split("T")[0] : "");
                const startDateTime = selectedEvent.start
                    ? selectedEvent.start.split("T")
                    : ["", ""];
                const endDateTime = selectedEvent.end
                    ? selectedEvent.end.split("T")
                    : ["", ""];
                setStartTime(startDateTime[1] ? startDateTime[1].slice(0, 5) : "");
                setEndTime(endDateTime[1] ? endDateTime[1].slice(0, 5) : "");
                setSelectedColor(selectedEvent.backgroundColor || "#000000");
                setSelectedRoom(selectedEvent.meetingRoomId || "");
            }
        }
    }, [selectedEvent, isOpen]);
    // 입력값 초기화
    const resetForm = () => {
        setMeetingTitle("");
        setMeetingDescription("");
        setMeetingDate("");
        setStartTime("");
        setEndTime("");
        setSelectedColor("#000000");
        setSelectedRoom("");
    };
    // 예약 저장
    const handleSaveClick = async () => {
        if (!meetingTitle || !meetingDate || !startTime || !endTime || !selectedRoom) {
            alert("필수 항목을 입력해주세요.");
            return;
        }
        const meetingData = {
            id: selectedEvent ? selectedEvent.id : Date.now().toString(),
            mrResTitle: meetingTitle,
            startTime: `${meetingDate}T${startTime}+09:00`,
            endTime: `${meetingDate}T${endTime}+09:00`,
            reason: meetingDescription,
            mrStatus: "N",
            mrResDate: meetingDate,
            mrNo: selectedRoom,
            userNo: userNo,
            backgroundColor: selectedColor,
        };
        try {
            if (selectedEvent && selectedEvent.meetingRoomId !== undefined) {
                // 예약 수정
                const response = await axios.put(`http://localhost:8003/workly/meeting-reservation/update/${selectedEvent.id}`, meetingData);
                console.log("예약 수정 응답:", response.data);
            }
            else {
                // 새 예약 추가
                const response = await axios.post("http://localhost:8003/workly/meeting-reservation/add", meetingData);
                console.log("예약 추가 응답:", response.data);
            }
            // 캘린더에 새로 추가된 예약 데이터 반영
            if (setMeetingRoomEvents) {
                setMeetingRoomEvents((prevMeetings) => {
                    if (selectedEvent) {
                        return prevMeetings.map((event) => event.id === selectedEvent.id ? meetingData : event);
                    }
                    else {
                        return [...prevMeetings, meetingData];
                    }
                });
            }
            onClose();
        }
        catch (error) {
            console.error("📌 회의실 예약 저장 오류:", error);
            if (error.response) {
                const data = error.response.data;
                const message = typeof data === "object" && data.message
                    ? data.message
                    : data || "오류가 발생했습니다.";
                setForceAlertMessage(message);
            }
            else {
                setForceAlertMessage("네트워크 오류가 발생했습니다.");
            }
        }
    };
    // 예약 삭제
    const handleDeleteClick = async () => {
        if (!selectedEvent || !onDelete)
            return;
        if (window.confirm(`정말 "${selectedEvent.title}" 회의 예약을 삭제하시겠습니까?`)) {
            try {
                await axios.delete(`http://localhost:8003/workly/meeting-reservation/delete/${selectedEvent.id}`);
                if (setMeetingRoomEvents) {
                    setMeetingRoomEvents((prevMeetings) => prevMeetings.filter((event) => event.id !== selectedEvent.id));
                }
                onDelete(selectedEvent.id);
                onClose();
            }
            catch (error) {
                console.error("회의실 예약 삭제 오류:", error);
                setForceAlertMessage("회의실 예약을 삭제하는 도중 오류가 발생했습니다.");
            }
        }
    };
    if (!isOpen)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx(ForceAlertInModal, { message: forceAlertMessage, onClose: () => setForceAlertMessage("") }), _jsx("div", { className: styles.modal1Overlay, onClick: onClose, children: _jsxs("div", { className: styles.modal1Container, onClick: (e) => e.stopPropagation(), children: [_jsx("h2", { className: styles.modal1Title, children: "\uD68C\uC758\uC2E4 \uC608\uC57D" }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "\uD68C\uC758\uC2E4 \uC120\uD0DD *" }), _jsx("select", { value: selectedRoom, onChange: (e) => setSelectedRoom(e.target.value), children: meetingRooms.length === 0 ? (_jsx("option", { value: "", children: "\uD83D\uDEA8 \uD68C\uC758\uC2E4 \uC815\uBCF4 \uC5C6\uC74C" })) : (_jsxs(_Fragment, { children: [_jsx("option", { value: "", children: "\uD68C\uC758\uC2E4\uC744 \uC120\uD0DD\uD558\uC138\uC694" }), meetingRooms.map((room) => (_jsx("option", { value: room.mrNo, children: room.mrName }, room.mrNo)))] })) })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "\uB0A0\uC9DC \uC9C0\uC815 *" }), _jsx("input", { type: "date", value: meetingDate, onChange: (e) => setMeetingDate(e.target.value) })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "\uD68C\uC758 \uC81C\uBAA9 *" }), _jsx("input", { type: "text", placeholder: "\uC81C\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694", value: meetingTitle, onChange: (e) => setMeetingTitle(e.target.value) })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "\uD68C\uC758 \uC548\uAC74" }), _jsx("input", { type: "text", placeholder: "\uD68C\uC758 \uC548\uAC74\uC744 \uC785\uB825\uD558\uC138\uC694", value: meetingDescription, onChange: (e) => setMeetingDescription(e.target.value) })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "\uC2DC\uAC04 \uC9C0\uC815 *" }), _jsxs("div", { className: styles.timeGroup, children: [_jsx("span", { children: "\uC2DC\uC791" }), _jsx("input", { type: "time", value: startTime, onChange: (e) => setStartTime(e.target.value) }), _jsx("span", { children: "\uC885\uB8CC" }), _jsx("input", { type: "time", value: endTime, onChange: (e) => setEndTime(e.target.value) })] })] }), _jsxs("div", { className: styles.buttonGroup, children: [selectedEvent && onDelete && (_jsx("button", { className: styles.deleteButton, onClick: handleDeleteClick, children: "\uC608\uC57D \uC0AD\uC81C" })), _jsx("button", { className: styles.saveButton, onClick: handleSaveClick, children: selectedEvent && selectedEvent.meetingRoomId !== undefined
                                        ? "예약 수정"
                                        : "예약 추가" }), _jsx("button", { className: styles.cancelButton, onClick: onClose, children: "\uCDE8\uC18C" })] })] }) })] }));
};
export default Modal1;
