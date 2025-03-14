import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from "axios";
import profileIcon from "../../assets/Images/chat/profile.png";
import totalprofileIcon from "../../assets/Images/chat/totalprofile.png";
import dropdownIcon from "../../assets/Images/chat/dropdown2.png";
import plusIcon from "../../assets/Images/chat/Plus circle.png";
import SearchClick from "./SearchClick";
const OrgChart = ({ onOpenCreateOrg }) => {
    const [departments, setDepartments] = useState([]);
    const [openCompany, setOpenCompany] = useState(true);
    const [openDept, setOpenDept] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // ✅ 1. 부서 목록 가져오기
                const deptResponse = await axios.get("http://localhost:8003/workly/api/chat/departments");
                const allDepartments = deptResponse.data;
                // ✅ 2. 사원 목록 가져오기
                const memberResponse = await axios.get("http://localhost:8003/workly/api/chat/members");
                const members = memberResponse.data;
                // ✅ 3. 부서별 사원 매칭 및 프로필 이미지 추가 (ChatMain과 유사한 방식)
                const deptMap = {};
                allDepartments.forEach((deptName) => {
                    deptMap[deptName] = [];
                });
                // 각 사원별 프로필 이미지 요청 (Promise.all 사용)
                const membersWithProfile = await Promise.all(members.map(async (member) => {
                    try {
                        const profileResponse = await axios.get(`http://localhost:8003/workly/api/user/profile/${member.userNo}`);
                        return {
                            ...member,
                            profileImg: profileResponse.data.profileImg || profileIcon,
                        };
                    }
                    catch {
                        return { ...member, profileImg: profileIcon };
                    }
                }));
                // 사원들을 부서별로 분류
                membersWithProfile.forEach((member) => {
                    if (deptMap[member.deptName]) {
                        deptMap[member.deptName].push(member);
                    }
                });
                // ✅ 4. 최종 데이터 구조 변환
                const formattedDepartments = Object.keys(deptMap).map((deptName) => ({
                    deptName,
                    members: deptMap[deptName],
                }));
                setDepartments(formattedDepartments);
            }
            catch (err) {
                console.error("❌ 조직도 불러오기 실패", err);
            }
        };
        fetchData();
    }, []);
    const toggleDept = (deptName) => {
        setOpenDept(openDept === deptName ? null : deptName);
    };
    const toggleCompany = () => {
        setOpenCompany(!openCompany);
    };
    const handleCreateDeptClick = () => {
        onOpenCreateOrg(); // 부모 상태 변경 실행 (Chat.tsx)
    };
    return (_jsxs("div", { style: { width: '100%', background: 'white', padding: '10px', borderRadius: '8px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }, children: [_jsx("span", { style: { fontSize: '22px', fontWeight: 'bold', color: '#4880FF' }, children: "\uC870\uC9C1\uB3C4" }), _jsx("img", { src: plusIcon, alt: "add-group", style: { width: '16px', height: '16px', cursor: 'pointer' }, onClick: onOpenCreateOrg })] }), _jsx("div", { children: _jsx(SearchClick, { onProfileClick: () => console.log("프로필 클릭됨") }) }), _jsxs("div", { children: [_jsx("span", { style: { fontWeight: 'bold', color: '#4880FF' }, children: "\uADF8\uB8F9" }), _jsx("img", { src: plusIcon, onClick: handleCreateDeptClick, style: { width: '15px', height: '15px', marginLeft: '5px', marginTop: '15px', cursor: 'pointer' }, alt: "group add" })] }), _jsxs("div", { onClick: toggleCompany, style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '10px', marginBottom: "10px" }, children: [_jsx("img", { src: dropdownIcon, alt: "dropdown", style: { width: '10px', height: '10px' } }), _jsx("span", { style: { fontWeight: 'bold', color: '#4880FF' }, children: "Workly" })] }), openCompany && departments.map((dept, index) => (_jsxs("div", { style: { marginBottom: '8px', marginLeft: '18px' }, children: [_jsxs("div", { onClick: () => toggleDept(dept.deptName), style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx("img", { src: dropdownIcon, alt: "dropdown", style: { width: '10px', height: '10px' } }), _jsx("span", { children: dept.deptName })] }), _jsxs("span", { style: { fontSize: '12px', color: '#979797' }, children: [dept.members.length, "/", dept.members.length] })] }), openDept === dept.deptName && (_jsx("div", { style: { marginLeft: '18px', marginTop: '5px' }, children: dept.members.length > 0 ? (dept.members.map((member, idx) => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', marginBottom: '8px' }, children: [_jsx("div", { style: {
                                        width: '40px',
                                        height: '40px',
                                        background: '#D9D9D9',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: '8px'
                                    }, children: _jsx("img", { src: member.profileImg || profileIcon, alt: "user", style: { width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }, onError: (e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = totalprofileIcon;
                                        } }) }), _jsxs("div", { children: [_jsxs("div", { style: { fontWeight: 'bold' }, children: [member.userName, " (", member.positionName, ")"] }), _jsx("div", { style: { color: '#4880FF', fontSize: '12px' }, children: "\uD65C\uC131\uD654" })] })] }, idx)))) : (_jsx("div", { style: { fontSize: '12px', color: '#979797' }, children: "\uB4F1\uB85D\uB41C \uC0AC\uC6A9\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })) }))] }, index)))] }));
};
export default OrgChart;
