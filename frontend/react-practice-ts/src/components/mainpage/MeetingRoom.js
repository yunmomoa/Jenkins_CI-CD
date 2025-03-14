import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/mainpage/MeetingRoom.module.css';
import search from '../../assets/images/icon/search.png';
const MeetingRoom = () => {
    const [meetings, setMeetings] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA')); // 'YYYY-MM-DD' 형식으로 현재 날짜 설정
    const [meetingRooms, setMeetingRooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // 회의실명 검색 값
    // 회의실 목록 불러오기
    useEffect(() => {
        axios
            .get('http://localhost:8003/workly/meeting-rooms')
            .then((response) => {
            setMeetingRooms(response.data);
        })
            .catch((error) => {
            console.error('🚨 회의실 목록 불러오기 오류:', error);
        });
    }, []);
    // 예약 데이터 업데이트 함수
    const fetchMeetingReservations = () => {
        if (meetingRooms.length === 0) {
            return;
        }
        axios
            .get(`http://localhost:8003/workly/meeting-reservation?date=${selectedDate}`)
            .then((response) => {
            console.log('📌 가져온 회의실 예약 데이터:', response.data);
            // 예약 데이터를 필터링, 매핑 후 정렬
            const sortedMeetings = response.data
                .filter((reservation) => {
                // 예약 날짜가 selectedDate와 일치하는지 확인
                const reservationDate = new Date(reservation.startTime).toLocaleDateString('en-CA');
                return reservationDate === selectedDate;
            })
                .filter((reservation) => reservation.mrResTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                meetingRooms.some(room => room.mrName.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    room.mrNo === reservation.mrNo))
                .map((reservation) => {
                const room = meetingRooms.find((room) => room.mrNo === reservation.mrNo);
                // 시간 포맷팅: 09:00~12:00 형식으로 변환
                const formatTime = (time) => {
                    const date = new Date(time);
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    return `${hours}:${minutes}`;
                };
                return {
                    time: `${formatTime(reservation.startTime)}~${formatTime(reservation.endTime)}`,
                    title: reservation.mrResTitle,
                    room: room ? room.mrName : 'Unknown',
                };
            })
                // 정렬: 먼저 시작시간 오름차순, 시작시간이 같으면 회의실명 오름차순
                .sort((a, b) => {
                const timeA = a.time.split('~')[0];
                const timeB = b.time.split('~')[0];
                if (timeA < timeB)
                    return -1;
                if (timeA > timeB)
                    return 1;
                return a.room.localeCompare(b.room);
            });
            setMeetings(sortedMeetings);
        })
            .catch((error) => {
            console.error('🚨 회의실 예약 데이터 불러오기 오류:', error);
        });
    };
    // 날짜 변경 핸들러
    const handleChangeDate = (direction) => {
        const currentDate = new Date(selectedDate);
        if (direction === 'prev') {
            currentDate.setDate(currentDate.getDate() - 1);
        }
        else if (direction === 'next') {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        setSelectedDate(currentDate.toLocaleDateString('en-CA'));
    };
    // selectedDate, meetingRooms, searchQuery 변경 시 예약 데이터 불러오기
    useEffect(() => {
        if (meetingRooms.length > 0 && selectedDate) {
            fetchMeetingReservations();
        }
    }, [selectedDate, meetingRooms, searchQuery]);
    return (_jsxs("div", { className: styles.card, children: [_jsx("div", { className: styles.header, children: _jsx("span", { children: "\uD68C\uC758\uC2E4 \uC0AC\uC6A9 \uD604\uD669" }) }), _jsxs("div", { className: styles.datePicker, children: [_jsx("button", { className: styles.navButton, onClick: () => handleChangeDate('prev'), children: '<' }), _jsx("span", { className: styles.date, children: selectedDate }), _jsx("button", { className: styles.navButton, onClick: () => handleChangeDate('next'), children: '>' })] }), _jsxs("div", { className: styles.search, children: [_jsx("input", { type: "text", className: styles.input, placeholder: "\uD68C\uC758\uC2E4\uBA85", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) }), _jsx("button", { className: styles.searchButton, children: _jsx("img", { src: search, alt: "search" }) })] }), _jsx("div", { className: styles.meetingList, children: meetings.length === 0 ? (_jsx("span", { className: styles.meetingInfo, children: "\uC608\uC57D\uB41C \uD68C\uC758\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })) : (meetings.map((meeting, index) => (_jsxs("div", { className: styles.meetingItem, children: [_jsx("span", { className: styles.time, children: meeting.time }), _jsx("span", { className: styles.title, children: meeting.title }), _jsx("span", { className: styles.room, children: meeting.room })] }, index)))) })] }));
};
export default MeetingRoom;
