import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar4.module.css"; // ✅ module.css 불러오기
function Calendar4() {
    const calendarRef = useRef(null);
    const [calendarTitle, setCalendarTitle] = useState("");
    return (_jsxs("div", { className: styles.miniCalendar1, children: [_jsxs("div", { className: styles.customToolbar, children: [_jsx("button", { className: styles.toolbarButton, onClick: () => {
                            if (calendarRef.current) {
                                const calendarApi = calendarRef.current.getApi?.();
                                if (calendarApi) {
                                    calendarApi.prev();
                                    setCalendarTitle(calendarApi.view.title);
                                }
                            }
                        }, children: "<" }), _jsx("h3", { className: styles.customTitle, children: calendarTitle }), _jsx("button", { className: styles.toolbarButton, onClick: () => {
                            if (calendarRef.current) {
                                const calendarApi = calendarRef.current.getApi?.();
                                if (calendarApi) {
                                    calendarApi.next();
                                    setCalendarTitle(calendarApi.view.title);
                                }
                            }
                        }, children: ">" }), _jsx("button", { className: styles.todayButton, onClick: () => {
                            if (calendarRef.current) {
                                const calendarApi = calendarRef.current.getApi?.();
                                if (calendarApi) {
                                    calendarApi.today();
                                    setCalendarTitle(calendarApi.view.title);
                                }
                            }
                        }, children: "\uC624\uB298" })] }), _jsx("div", { className: styles.calendarWrapper, children: _jsx(FullCalendar, { ref: calendarRef, plugins: [dayGridPlugin, interactionPlugin], initialView: "dayGridMonth", locales: allLocales, locale: "ko", firstDay: 0, headerToolbar: { left: "", center: "", right: "" }, buttonText: { today: "오늘" }, titleFormat: { year: "numeric", month: "short" }, height: 250, contentHeight: 200, dayMaxEventRows: true, stickyHeaderDates: true, datesSet: (info) => setCalendarTitle(info.view.title), dayCellContent: (info) => (_jsx("span", { style: { display: "block", fontSize: "9px", textAlign: "center" }, children: info.dayNumberText })) }) })] }));
}
export default Calendar4;
