import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setMemberInvite } from "../../features/chatSlice";
import axios from 'axios';
import SearchSelect from './SearchSelect';
const AddMemberPanel = ({ currentMembers, room, onClose, onConfirm, }) => {
    // 전체 사원 목록 상태
    const [allEmployees, setAllEmployees] = useState([]);
    const dispatch = useDispatch();
    const memberInvite = useSelector((state) => state.chat.memberInvite);
    // 백엔드에서 전체 사원 목록 불러오기
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/workly/api/chat/members`);
                setAllEmployees(response.data);
            }
            catch (error) {
                console.error("사원 목록 불러오기 실패:", error);
            }
        };
        fetchEmployees();
    }, []);
    // 이미 채팅방에 있는 멤버의 userNo 배열
    const currentMemberUserNos = currentMembers.map(m => m.userNo);
    // 이미 들어온 멤버는 목록에서 제외
    const filteredEmployees = allEmployees.filter((member) => !currentMemberUserNos.includes(member.userNo));
    // 새로 선택한 멤버의 userNo 배열
    const [checkedMembers, setCheckedMembers] = useState([]);
    // 만약 Redux의 memberInvite가 있다면, 그것도 체크 상태에 포함 (원하는 경우)
    // useEffect(() => {
    //   const invitedUserNos = filteredEmployees
    //     .filter(member => memberInvite.includes(member.userName))
    //     .map(member => member.userNo);
    //   setCheckedMembers(invitedUserNos);
    // }, [filteredEmployees, memberInvite]);
    // 체크박스 토글 함수
    const handleToggle = (userNo) => {
        setCheckedMembers(prev => prev.includes(userNo)
            ? prev.filter((m) => m !== userNo)
            : [...prev, userNo]);
    };
    // 확인 버튼 클릭 시, 선택된 멤버 객체 추출 후 백엔드에 요청
    const handleConfirm = async () => {
        const selectedMembersObjects = filteredEmployees.filter((member) => checkedMembers.includes(member.userNo));
        if (selectedMembersObjects.length === 0) {
            alert("추가할 멤버를 선택해주세요.");
            return;
        }
        const newUserNos = selectedMembersObjects.map(member => member.userNo);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/workly/api/chat/addMembers`, {
                chatRoomNo: room.chatRoomNo,
                userNos: newUserNos,
            });
            console.log("✅ 멤버 추가 성공");
            alert("멤버 추가에 성공했습니다.");
            dispatch(setMemberInvite(selectedMembersObjects.map(m => m.userName)));
            onConfirm(selectedMembersObjects);
            onClose();
        }
        catch (error) {
            console.error("❌ 멤버 추가 실패", error);
            alert("멤버 추가에 실패했습니다.");
        }
    };
    return (_jsxs("div", { style: {
            width: '388px',
            height: '590px',
            backgroundColor: 'white',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -45%)',
            borderRadius: '3px',
            fontFamily: 'Inter, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
        }, children: [_jsx("div", { children: currentMembers.map(member => (_jsx("span", { style: {
                        backgroundColor: '#E9F3FF',
                        color: '#4880FF',
                        padding: '5px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                    }, children: member.userName }, member.userNo))) }), _jsx("div", { style: { padding: '10px' }, children: _jsx(SearchSelect, { onProfileClick: () => console.log("프로필 클릭됨") }) }), _jsx("div", { style: { overflowY: 'auto', flex: 1, padding: '0 10px' }, children: _jsxs("table", { style: { width: '100%', borderCollapse: 'collapse' }, children: [_jsx("thead", { children: _jsxs("tr", { style: { backgroundColor: '#F5F7FA', borderBottom: '2px solid #4880FF' }, children: [_jsx("th", { style: { width: '50%', padding: '8px', textAlign: 'center', color: '#4880FF' }, children: "\uBD80\uC11C\uBA85" }), _jsx("th", { style: { width: '50%', padding: '8px', textAlign: 'center', color: '#4880FF' }, children: "\uC131\uBA85" })] }) }), _jsx("tbody", { children: filteredEmployees.map(member => {
                                const isSelected = checkedMembers.includes(member.userNo);
                                return (_jsxs("tr", { style: { borderBottom: '1px solid #E0E0E0' }, children: [_jsx("td", { style: { padding: '8px', fontWeight: "bold" }, children: member.deptName || "알 수 없음" }), _jsxs("td", { style: { padding: '8px', display: 'flex', alignItems: 'center' }, children: [_jsx("input", { type: "checkbox", checked: isSelected, onChange: () => handleToggle(member.userNo), style: { marginRight: '8px', accentColor: '#4880FF' } }), member.userName, " (", member.positionName, ")"] })] }, member.userNo));
                            }) })] }) }), _jsx("div", { style: {
                    padding: '10px',
                    borderTop: '1px solid #E0E0E0',
                    display: 'flex',
                    justifyContent: 'center',
                }, children: _jsx("button", { style: {
                        backgroundColor: '#4880FF',
                        color: 'white',
                        padding: '8px 24px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                    }, onClick: handleConfirm, children: "\uD655\uC778" }) })] }));
};
export default AddMemberPanel;
