import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import styles from "./MeetingRoom.module.css";
const MeetingRoom = () => {
    const [meetingRooms, setMeetingRooms] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [calendarTitle, setCalendarTitle] = useState("");
    const calendarRef = useRef(null);
    // 회의실 목록 및 예약 데이터를 불러옵니다.
    useEffect(() => {
        // 회의실 목록 불러오기
        axios
            .get(`${import.meta.env.VITE_API_URL}/workly/meeting-rooms`)
            .then((response) => {
            console.log("📌 [MeetingRoom.tsx] 가져온 회의실 목록:", response.data);
            setMeetingRooms(response.data);
        })
            .catch((error) => {
            console.error("🚨 회의실 목록 불러오기 오류:", error);
        });
        // 회의실 예약 목록 불러오기
        axios
            .get(`${import.meta.env.VITE_API_URL}/workly/meeting-reservation`)
            .then((response) => {
            console.log("📌 [MeetingRoom.tsx] 가져온 예약 데이터:", response.data);
            setReservations(response.data);
        })
            .catch((error) => {
            console.error("🚨 회의실 예약 데이터 불러오기 오류:", error);
        });
    }, []);
    // FullCalendar의 resource 형식으로 변환 (id는 문자열이어야 합니다)
    const resources = meetingRooms.map((room) => ({
        id: room.mrNo.toString(),
        title: room.mrName,
        capacity: room.capacity,
    }));
    // FullCalendar의 event 형식으로 변환 (extendedProps에 추가 정보 포함)
    const events = reservations.map((reservation) => ({
        id: reservation.mrResNo.toString(),
        resourceId: reservation.mrNo.toString(),
        title: reservation.mrResTitle,
        start: reservation.startTime,
        end: reservation.endTime,
        extendedProps: {
            reason: reservation.reason,
            mrStatus: reservation.mrStatus,
            mrResDate: reservation.mrResDate,
        },
    }));
    // 커스텀 툴바 핸들러
    const handlePrev = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.prev();
            setCalendarTitle(calendarApi.view.title);
        }
    };
    const handleNext = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.next();
            setCalendarTitle(calendarApi.view.title);
        }
    };
    const handleToday = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.today();
            setCalendarTitle(calendarApi.view.title);
        }
    };
    return (_jsxs("div", { className: styles.meetingRoomContainer, children: [_jsxs("div", { className: styles.customToolbar, children: [_jsx("button", { className: styles.toolbarButton, onClick: handlePrev, children: "<" }), _jsx("h3", { className: styles.customTitle, children: calendarTitle }), _jsx("button", { className: styles.toolbarButton, onClick: handleNext, children: ">" }), _jsx("button", { className: styles.todayButton, onClick: handleToday, children: "\uC624\uB298" })] }), _jsx(FullCalendar, { ref: calendarRef, plugins: [resourceTimelinePlugin, interactionPlugin], initialView: "resourceTimelineDay", resources: resources, events: events, locales: allLocales, locale: "ko", firstDay: 0, height: "auto", headerToolbar: false, datesSet: (info) => setCalendarTitle(info.view.title) })] }));
};
export default MeetingRoom;
