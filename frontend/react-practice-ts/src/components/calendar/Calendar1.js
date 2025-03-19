import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar1.module.css";
function Calendar1({ events, setEvents, setSelectedEvent, setModalOpen }) {
    const user = useSelector((state) => state.user);
    const userNo = user?.userNo;
    const calendarRef = useRef(null);
    const [calendarTitle, setCalendarTitle] = useState("");
    useEffect(() => {
        if (userNo) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/workly/schedule/user/${userNo}`)
                .then((response) => {
                console.log("📌 [내 일정] 백엔드에서 가져온 데이터:", response.data);
                const formattedEvents = response.data.map((event) => ({
                    id: event.calNo,
                    title: event.title,
                    start: event.startDate,
                    end: event.endDate,
                    content: event.content || "",
                    backgroundColor: event.color || "#000000",
                    borderColor: event.color || "#000000",
                }));
                setEvents(prevEvents => JSON.stringify(prevEvents) !== JSON.stringify(formattedEvents) ? formattedEvents : prevEvents);
            })
                .catch((error) => console.error("내 일정 불러오기 오류:", error));
        }
    }, [userNo, events]);
    const handleEventClick = (clickInfo) => {
        setSelectedEvent({
            id: clickInfo.event.id,
            title: clickInfo.event.title,
            start: clickInfo.event.startStr,
            end: clickInfo.event.endStr || clickInfo.event.startStr,
            content: clickInfo.event.extendedProps.content || "",
            backgroundColor: clickInfo.event.backgroundColor,
            type: clickInfo.event.extendedProps.category === "T" ? "팀 일정" : "내 일정", // ✅ 일정 유형 추가
        });
        setModalOpen(true);
    };
    const handlePrev = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi?.();
            if (calendarApi) {
                calendarApi.prev();
                setCalendarTitle(calendarApi.view.title);
            }
        }
    };
    const handleNext = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi?.();
            if (calendarApi) {
                calendarApi.next();
                setCalendarTitle(calendarApi.view.title);
            }
        }
    };
    const handleToday = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi?.();
            if (calendarApi) {
                calendarApi.today();
                setCalendarTitle(calendarApi.view.title);
            }
        }
    };
    return (_jsxs("div", { className: styles.calendarContainer, children: [_jsxs("div", { className: styles.customToolbar, children: [_jsx("button", { className: styles.toolbarButton, onClick: handlePrev, children: "<" }), _jsx("h3", { className: styles.customTitle, children: calendarTitle }), _jsx("button", { className: styles.toolbarButton, onClick: handleNext, children: ">" }), _jsx("button", { className: styles.todayButton, onClick: handleToday, children: "\uC624\uB298" })] }), _jsx(FullCalendar, { ref: calendarRef, plugins: [dayGridPlugin, interactionPlugin], initialView: "dayGridMonth", editable: true, events: events, eventClick: handleEventClick, locales: allLocales, locale: "ko", firstDay: 0, height: "auto", headerToolbar: { left: "", center: "", right: "" }, datesSet: (info) => setCalendarTitle(info.view.title) })] }));
}
export default Calendar1;
