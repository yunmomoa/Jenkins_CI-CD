import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchClick from './SearchClick';
const OrgMemberPlus = ({ deptName, onComplete }) => {
    const [checkedMembers, setCheckedMembers] = useState([]);
    const [members, setMembers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [positions, setPositions] = useState([]);
    // ✅ 부서 및 직급 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 부서 정보 가져오기
                const deptResponse = await axios.get("http://localhost:8003/workly/api/chat/departments");
                setDepartments(deptResponse.data);
                // 직급 정보 가져오기
                const posResponse = await axios.get("http://localhost:8003/workly/api/chat/positions");
                setPositions(posResponse.data);
                // 부서원 목록 가져오기 (현재 부서만 필터링)
                const memberResponse = await axios.get("http://localhost:8003/workly/api/chat/members");
                const filteredMembers = memberResponse.data.filter((m) => m.deptName === deptName);
                setMembers(filteredMembers);
            }
            catch (error) {
                console.error("데이터 불러오기 실패:", error);
            }
        };
        fetchData();
    }, [deptName]);
    // ✅ 부서명 가져오기
    const getDeptName = (deptNo) => {
        return departments.find((dept) => dept.deptNo === deptNo)?.deptName || "알 수 없음";
    };
    // ✅ 체크박스 선택
    const toggleCheck = (no) => {
        setCheckedMembers((prev) => prev.includes(no) ? prev.filter((memberNo) => memberNo !== no) : [...prev, no]);
    };
    // ✅ 확인 버튼 클릭
    const handleConfirm = () => {
        if (checkedMembers.length === 0) {
            alert('부서원을 선택해주세요');
            return;
        }
        const selectedMembers = members.filter((m) => checkedMembers.includes(m.userNo));
        alert(`부서 생성 완료: ${deptName}`);
        onComplete({ deptName, selectedMembers });
    };
    // ✅ 부서별 멤버 그룹화
    const groupedMembers = members.reduce((acc, member) => {
        if (!acc[member.deptName]) {
            acc[member.deptName] = [];
        }
        acc[member.deptName].push(member);
        return acc;
    }, {});
    return (_jsxs("div", { className: "searchMember", style: {
            width: '390px',
            height: '600px',
            backgroundColor: 'white',
            position: 'relative',
            borderRadius: '3px',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            paddingTop: '5px',
            paddingLeft: '5px',
        }, children: [_jsx("div", { style: {
                    backgroundColor: '#E9EBF1',
                    height: '33px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '15px',
                    borderRadius: '3px 3px 0 0',
                }, children: _jsx("span", { style: { color: '#4880FF', fontWeight: '800', fontSize: '18px' }, children: "\uBD80\uC11C\uC6D0 \uC120\uD0DD" }) }), _jsx("div", { style: { margin: '10px 45px' }, children: _jsx(SearchClick, {}) }), _jsx("div", { style: { overflowY: 'auto', maxHeight: '500px', paddingLeft: '30px' }, children: _jsxs("table", { style: { width: '90%', borderCollapse: 'collapse' }, children: [_jsx("thead", { children: _jsxs("tr", { style: { backgroundColor: 'white', borderBottom: '2px solid #4880FF' }, children: [_jsx("th", { style: { width: '45%', color: '#4880FF', padding: '8px 0', textAlign: 'center' }, children: "\uBD80\uC11C\uBA85" }), _jsx("th", { style: { width: '55%', color: '#4880FF', padding: '8px 0', textAlign: 'center' }, children: "\uC131\uBA85" })] }) }), _jsx("tbody", { children: Object.entries(groupedMembers).map(([dept, deptMembers]) => deptMembers.map((member, index) => (_jsxs("tr", { style: { position: 'relative', height: '35px' }, children: [index === 0 && (_jsxs("td", { rowSpan: deptMembers.length, style: {
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                            fontWeight: '600',
                                            color: 'black',
                                            position: 'relative',
                                        }, children: [getDeptName(Number(dept)), _jsx("div", { style: {
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    right: '-17px',
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
                                                    left: '17px',
                                                    right: 0,
                                                    height: '1px',
                                                    backgroundColor: '#D8D8D8',
                                                } })] })] }, member.userNo)))) })] }) }), _jsx("div", { style: { display: 'flex', justifyContent: 'center', marginTop: '10px' }, children: _jsx("button", { style: {
                        backgroundColor: '#4880FF',
                        color: 'white',
                        fontWeight: '600',
                        borderRadius: '5px',
                        border: 'none',
                        padding: '8px 16px',
                        cursor: 'pointer',
                    }, onClick: handleConfirm, children: "\uD655\uC778" }) })] }));
};
export default OrgMemberPlus;
