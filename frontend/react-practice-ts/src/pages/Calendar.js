import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Calendar1 from "../components/calendar/Calendar1";
import Calendar2 from "../components/calendar/Calendar2";
import Calendar3 from "../components/calendar/Calendar3";
import Calendar4 from "../components/calendar/Calendar4";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import Modal from "../components/calendar/Modal"; // 일정 추가 모달
import Modal1 from "../components/calendar/Modal1"; // 회의실 예약 모달
import styles from "./Calendar.module.css";
import MeetingRoom from "../components/calendar/MeetingRoom";
const CalendarPage = () => {
    const [selectedCalendar, setSelectedCalendar] = useState("calendar1");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isMeetingRoomModalOpen, setMeetingRoomModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [meetingRoomEvents, setMeetingRoomEvents] = useState([]);
    const [memoText, setMemoText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [events, setEvents] = useState([]);
    const [teamEvents, setTeamEvents] = useState([]);
    const user = useSelector((state) => state.user);
    const userNo = user?.userNo;
    useEffect(() => {
        if (userNo) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/workly/memo/${userNo}`)
                .then((response) => {
                setMemoText(response.data.memo);
            })
                .catch((error) => console.error("🚨 메모 조회 오류:", error));
        }
    }, [userNo]);
    const handleMemoSave = () => {
        if (!userNo)
            return;
        axios
            .put(`${import.meta.env.VITE_API_URL}/workly/memo/update/${userNo}`, { memo: memoText })
            .then((response) => {
            console.log("메모 저장 성공", response.data);
        })
            .catch((error) => console.error("메모 저장 오류:", error));
    };
    // 회의실 예약 모달 열기
    const handleMeetingRoomOpen = () => {
        setSelectedEvent(null);
        setMeetingRoomModalOpen(true);
    };
    // 회의실 예약 저장
    const handleSaveMeeting = async (newMeeting) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/workly/meeting-reservation/add`, newMeeting);
            setMeetingRoomEvents((prevEvents) => [...prevEvents, newMeeting]); // 새 예약 추가
            setMeetingRoomModalOpen(false);
        }
        catch (error) {
            console.error("🚨 회의실 예약 저장 오류:", error);
        }
    };
    // 회의실 예약 삭제
    const handleDeleteMeeting = async (eventId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/workly/meeting-reservation/delete/${eventId}`);
            setMeetingRoomEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
            setMeetingRoomModalOpen(false);
        }
        catch (error) {
            console.error("🚨 회의실 예약 삭제 오류:", error);
        }
    };
    return (_jsxs("div", { className: styles.mainpageContainer, children: [_jsx(Sidebar, {}), _jsxs("div", { className: styles.componentContainer, children: [_jsx(Header, {}), _jsxs("div", { className: styles.calendarPageContainer, children: [_jsxs("div", { className: styles.buttonContainer, children: [_jsx("button", { className: `${styles.tabButton} ${selectedCalendar === "calendar1" ? styles.active : ""}`, onClick: () => setSelectedCalendar("calendar1"), children: "\uB0B4 \uCE98\uB9B0\uB354" }), _jsx("button", { className: `${styles.tabButton} ${selectedCalendar === "calendar2" ? styles.active : ""}`, onClick: () => setSelectedCalendar("calendar2"), children: "\uD300 \uCE98\uB9B0\uB354" }), _jsx("button", { className: `${styles.tabButton} ${selectedCalendar === "calendar3" ? styles.active : ""}`, onClick: () => setSelectedCalendar("calendar3"), children: "\uC804\uCCB4 \uCE98\uB9B0\uB354" }), _jsx("button", { className: `${styles.tabButton} ${selectedCalendar === "meetingroom" ? styles.active : ""}`, onClick: () => setSelectedCalendar("meetingroom"), children: "\uD68C\uC758\uC2E4 \uD604\uD669\uD310" })] }), _jsxs("div", { className: styles.mainContent, children: [_jsxs("div", { className: styles.calendarContent, children: [selectedCalendar === "calendar1" && (_jsx(Calendar1, { setSelectedEvent: setSelectedEvent, setModalOpen: setModalOpen, events: events, setEvents: setEvents })), selectedCalendar === "calendar2" && (_jsx(Calendar2, { setSelectedEvent: setSelectedEvent, setModalOpen: setModalOpen, events: teamEvents, setEvents: setTeamEvents })), selectedCalendar === "calendar3" && (_jsx(Calendar3, { meetingRoomEvents: meetingRoomEvents, setMeetingRoomEvents: setMeetingRoomEvents })), selectedCalendar === "meetingroom" && _jsx(MeetingRoom, {})] }), _jsxs("div", { className: styles.rightSection, children: [_jsxs("div", { className: styles.buttonContainer2, children: [_jsx("button", { className: styles.addEventButton, onClick: () => {
                                                            setSelectedEvent(null);
                                                            setModalOpen(true);
                                                        }, children: "+ \uC77C\uC815 \uCD94\uAC00" }), _jsx("button", { className: styles.addEventButton, onClick: handleMeetingRoomOpen, children: "+ \uD68C\uC758\uC2E4 \uC608\uC57D" })] }), _jsx("div", { className: styles.miniCalendar, children: _jsx(Calendar4, {}) }), _jsxs("div", { className: styles.memoSection, children: [_jsx("h3", { children: "\uD83D\uDCCC Memo" }), isEditing ? (_jsx("textarea", { className: styles.memoInput, value: memoText, onChange: (e) => setMemoText(e.target.value), onBlur: () => {
                                                            setIsEditing(false);
                                                            handleMemoSave();
                                                        }, autoFocus: true })) : (_jsx("p", { className: styles.memoContent, onClick: () => setIsEditing(true), children: memoText }))] })] })] })] })] }), _jsx(Modal, { isOpen: isModalOpen, onClose: () => setModalOpen(false), selectedEvent: selectedEvent, setEvents: setEvents, setTeamEvents: setTeamEvents }), _jsx(Modal1, { isOpen: isMeetingRoomModalOpen, onClose: () => setMeetingRoomModalOpen(false), onSave: handleSaveMeeting, onDelete: handleDeleteMeeting, selectedEvent: selectedEvent, setMeetingRoomEvents: setMeetingRoomEvents })] }));
};
export default CalendarPage;
