import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SearchClick from './SearchClick';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//import { filter } from 'lodash';
import axios from 'axios';
;
const SearchMember = ({ chatType, roomTitle, member, onComplete, }) => {
    const [checkedMembers, setCheckedMembers] = useState([]);
    const [members, setMembers] = useState([]);
    // 🔹 현재 로그인한 사용자 정보 가져오기 (Redux에서 가져옴)
    const loggedInUser = useSelector((state) => state.user);
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/workly/api/chat/members`);
                const filteredMembers = response.data.filter((m) => m.userNo !== loggedInUser.userNo);
                setMembers(filteredMembers);
            }
            catch (error) {
                console.error("멤버 목록 불러오기 실패:", error);
            }
        };
        fetchMembers();
    }, [loggedInUser.userNo]); // 로그인한 사용자가 변경될 때 다시 가져오기
    const toggleCheck = (no) => {
        if (chatType === '1:1') {
            setCheckedMembers((prev) => (prev.includes(no) ? [] : [no])); // ✅ 1:1 채팅 - 한 명만 선택
        }
        else {
            setCheckedMembers((prev) => prev.includes(no) ? prev.filter((memberNo) => memberNo !== no) : [...prev, no] // ✅ 그룹 채팅 - 여러 명 선택 가능
            );
        }
    };
    const handleConfirm = async () => {
        if (checkedMembers.length === 0) {
            alert("대화 상대를 선택해주세요");
            return;
        }
        const requestData = {
            roomTitle,
            chatType: chatType,
            participants: [loggedInUser.userNo, ...checkedMembers], // ✅ 로그인한 사용자 포함
        };
        console.log("📡 보내는 데이터:", JSON.stringify(requestData, null, 2)); // ✅ 디버깅 추가
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/workly/api/chat/createChatRoom`, requestData, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.status === 200) {
                alert("채팅방 생성 완료되었습니다.");
                const newChatRoomNo = response.data.chatRoomNo;
                console.log("새 채팅방 번호:", newChatRoomNo);
                onComplete({ roomTitle, chatType, selectedMembers: members.filter((m) => checkedMembers.includes(m.userNo)) });
            }
        }
        catch (error) {
            console.error("채팅방 생성 오류:", error);
            alert("채팅방 생성 중 오류가 발생했습니다.");
        }
    };
    // const handleConfirm = async () => {
    //   if (checkedMembers.length === 0) {
    //     alert("대화 상대를 선택해주세요");
    //     return;
    //   }
    //   alert('채팅방 생성 완료되었습니다.');
    //   const selectedMembers = members.filter((m) => checkedMembers.includes(m.userNo));
    //   // 부모 컴포넌트로 새 방 정보 전달
    //   onComplete({ roomTitle, chatType, selectedMembers });
    // };
    const groupedMembers = members.reduce((acc, member) => {
        if (!acc[member.deptName]) {
            acc[member.deptName] = [];
        }
        acc[member.deptName].push(member);
        return acc;
    }, {});
    // 검색창 열림
    const [isSearchOpen, setIsSearchOpen] = useState(true); // ✅ 검색창 열림/닫힘 관리 추가
    return (_jsxs("div", { className: "searchMember", style: {
            width: '390px',
            height: '560px',
            backgroundColor: 'white',
            position: 'relative',
            borderRadius: '3px',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            paddingTop: '5px',
            paddingLeft: '5px',
        }, children: [_jsx("div", { style: { margin: '15px 28px' }, children: _jsx(SearchClick, { onProfileClick: (member) => {
                        toggleCheck(member.userNo);
                        setIsSearchOpen(false);
                    } }) }), _jsx("div", { style: { overflowY: 'auto', maxHeight: '420px', paddingLeft: '30px' }, children: _jsxs("table", { style: {
                        width: '95%',
                        borderCollapse: 'collapse',
                    }, children: [_jsx("thead", { children: _jsxs("tr", { style: { backgroundColor: 'white', borderBottom: '2px solid #4880FF' }, children: [_jsx("th", { style: { width: '45%', color: '#4880FF', padding: '8px 0', textAlign: 'center' }, children: "\uBD80\uC11C\uBA85" }), _jsx("th", { style: { width: '55%', color: '#4880FF', padding: '8px 0', textAlign: 'center' }, children: "\uC131\uBA85" })] }) }), _jsx("tbody", { children: Object.entries(groupedMembers).map(([dept, deptMembers]) => deptMembers.map((member, index) => (_jsxs("tr", { style: { position: 'relative', height: '35px' }, children: [index === 0 && (_jsxs("td", { rowSpan: deptMembers.length, style: {
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                            fontWeight: '600',
                                            color: 'black',
                                            position: 'relative',
                                        }, children: [dept, _jsx("div", { style: {
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    right: '-17px', // 50%가 아니라 세로 구분선에 딱 맞게
                                                    left: 0,
                                                    height: '1px',
                                                    backgroundColor: '#D8D8D8',
                                                } })] })), _jsxs("td", { style: { position: 'relative', paddingLeft: '25px', height: '35px' }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center' }, children: [_jsx("input", { type: "checkbox", checked: checkedMembers.includes(member.userNo), onChange: () => toggleCheck(member.userNo), style: {
                                                            marginRight: '10px',
                                                            marginLeft: '10px',
                                                            accentColor: '#4880FF',
                                                            cursor: 'pointer',
                                                        } }), member.userName, " (", member.positionName, ")"] }), _jsx("div", { style: {
                                                    position: 'absolute',
                                                    top: 0,
                                                    bottom: 0,
                                                    left: '17px',
                                                    width: '1px',
                                                    backgroundColor: '#D8D8D8',
                                                } }), _jsx("div", { style: {
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: '17px', // 세로 구분선에 딱 맞게 조정
                                                    right: 0,
                                                    height: '1px',
                                                    backgroundColor: '#D8D8D8',
                                                } })] })] }, member.userNo)))) })] }) }), _jsx("div", { style: { display: 'flex', justifyContent: 'center', marginTop: '10px' }, children: _jsx("button", { style: {
                        marginTop: '10px',
                        backgroundColor: '#4880FF',
                        color: 'white',
                        fontWeight: '600',
                        borderRadius: '5px',
                        border: 'none',
                        padding: '8px 16px',
                        cursor: 'pointer',
                    }, onClick: handleConfirm, children: "\uD655\uC778" }) })] }));
};
export default SearchMember;
