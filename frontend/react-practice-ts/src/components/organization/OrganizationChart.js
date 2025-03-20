import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "./OrganizationChart.module.css";
// 백엔드에서 업로드된 프로필 이미지가 위치하는 기본 URL
const baseProfileUrl = `${import.meta.env.VITE_API_URL}/workly`;
const OrganizationChart = () => {
    // 1) Redux user 가져오기
    const user = useSelector((state) => state.user);
    const companyId = user?.companyId;
    // 2) 상태 정의
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    // 모달 관련 상태
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // 3) 백엔드에서 조직도(Map) 데이터 가져오기
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/workly/organization/map`)
            .then((response) => {
            setDepartments(response.data);
        })
            .catch((error) => {
            console.error("🚨 조직도 불러오기 오류:", error);
        });
    }, []);
    // 4) 부서 트리에서 모든 구성원을 평면화
    const flattenEmployees = (depts) => {
        let empList = [];
        depts.forEach((dept) => {
            const deptMembers = dept.members.map((m) => {
                const name = m.userName || m.USERNAME || "";
                return {
                    userNo: m.userNo,
                    userName: name,
                    positionNo: m.positionNo,
                    positionName: m.positionName,
                    deptNo: m.deptNo, // 추가
                    deptName: dept.deptName,
                    companyId: m.companyId,
                    phone: m.phone,
                    extension: m.extension,
                    email: m.email,
                    profileImage: m.profileImage,
                };
            });
            empList = empList.concat(deptMembers);
            if (dept.children && dept.children.length > 0) {
                empList = empList.concat(flattenEmployees(dept.children));
            }
        });
        return empList;
    };
    // 5) departments가 변경될 때마다 employees 업데이트
    useEffect(() => {
        const flatList = flattenEmployees(departments);
        setEmployees(flatList);
    }, [departments]);
    // 6) 검색 + 회사ID 필터 후, deptNo → positionNo 순으로 정렬
    const filteredEmployees = employees
        .filter((emp) => {
        const name = emp.userName || "";
        return (name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            emp.companyId === companyId);
    })
        .sort((a, b) => {
        // 1) deptNo 오름차순
        if (a.deptNo !== b.deptNo) {
            return a.deptNo - b.deptNo;
        }
        // 2) positionNo 오름차순
        return a.positionNo - b.positionNo;
    });
    // 모달 닫기
    const closeModal = () => {
        setShowModal(false);
        setSelectedEmployee(null);
    };
    // 행 클릭 → 모달 열기
    const handleRowClick = (emp) => {
        setSelectedEmployee(emp);
        setShowModal(true);
    };
    return (_jsxs("div", { className: styles.orgChartContainer, children: [_jsx("h2", { className: styles.orgChartTitle, children: "\uD68C\uC0AC \uC870\uC9C1\uB3C4" }), _jsx("div", { className: styles.searchContainer, children: _jsx("input", { type: "text", placeholder: "\uC0AC\uC6D0\uC774\uB984 \uAC80\uC0C9", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: styles.searchInput }) }), _jsx("div", { className: styles.tableContainer, children: _jsxs("table", { className: styles.orgTable, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\uBD80\uC11C" }), _jsx("th", { children: "\uC9C1\uAE09" }), _jsx("th", { children: "\uC0AC\uC6D0" })] }) }), _jsx("tbody", { children: filteredEmployees.length > 0 ? (filteredEmployees.map((emp, i) => (_jsxs("tr", { onClick: () => handleRowClick(emp), style: { cursor: "pointer" }, children: [_jsx("td", { children: emp.deptName }), _jsx("td", { children: emp.positionName ?? "" }), _jsx("td", { children: emp.userName })] }, i)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 3, style: { textAlign: "center", padding: "10px" }, children: "\uB370\uC774\uD130 \uC5C6\uC74C" }) })) })] }) }), showModal && selectedEmployee && (_jsx("div", { className: styles.modalOverlay, onClick: closeModal, children: _jsxs("div", { className: styles.modalContent, onClick: (e) => e.stopPropagation(), children: [_jsx("div", { className: styles.modalProfile, children: _jsx("img", { src: selectedEmployee.profileImage
                                    ? baseProfileUrl + selectedEmployee.profileImage
                                    : "/src/assets/Images/icon/profile.png", alt: "Profile", className: styles.profileImage }) }), _jsxs("div", { className: styles.modalInfo, children: [_jsx("div", { className: styles.modalName, children: selectedEmployee.userName }), _jsxs("p", { className: styles.modalDetail, children: [_jsx("strong", { children: "\uBD80\uC11C:" }), " ", selectedEmployee.deptName] }), _jsxs("p", { className: styles.modalDetail, children: [_jsx("strong", { children: "\uC9C1\uAE09:" }), " ", selectedEmployee.positionName ?? ""] }), _jsxs("p", { className: styles.modalDetail, children: [_jsx("strong", { children: "\uB0B4\uC120\uBC88\uD638:" }), " ", selectedEmployee.extension ?? "정보 없음"] }), _jsxs("p", { className: styles.modalDetail, children: [_jsx("strong", { children: "\uC774\uBA54\uC77C:" }), " ", selectedEmployee.email ?? "정보 없음"] })] }), _jsx("button", { className: styles.modalCloseButton, onClick: closeModal, children: "\u00D7" })] }) }))] }));
};
export default OrganizationChart;
