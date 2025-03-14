import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import styles from "../../styles/personnel/ManagePermission.module.css";
const ManagePermission = () => {
    const [openSections, setOpenSections] = useState({ inhumanResources: true });
    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };
    return (_jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.treeContainer, children: [_jsxs("div", { className: styles.section, children: [_jsxs("div", { className: styles.sectionHeader, onClick: () => toggleSection("inhumanResources"), children: [openSections.inhumanResources ? "▼" : "▶", " \uC778\uC0AC\uD300"] }), openSections.inhumanResources && (_jsxs("div", { className: styles.subSection, children: [_jsx("div", { className: styles.subHeader, children: "\u21B3 \uD300\uC7A5" }), _jsx("div", { className: styles.subItem, children: "\u21B3 \uACFC\uC7A5" }), _jsx("div", { className: styles.subItem, children: "\u21B3 \uCC28\uC7A5" }), _jsx("div", { className: styles.subItem, children: "\u21B3 \uB300\uB9AC" }), _jsx("div", { className: styles.subItem, children: "\u21B3 \uC0AC\uC6D0" })] }))] }), [
                        "경영지원팀", "마케팅팀", "보안팀", "법무법인팀", "디자인팀", "개발운영팀", "서비스 운영팀",
                    ].map((team) => (_jsx("div", { className: styles.section, children: _jsxs("div", { className: styles.sectionHeader, onClick: () => toggleSection(team), children: ["\u25B6 ", team] }) }, team)))] }), _jsx("div", { className: styles.switchContainer, children: ["급여관리", "인사관리", "권한관리", "조직도관리"].map((label) => (_jsxs("div", { className: styles.switchRow, children: [_jsxs("label", { className: styles.switch, children: [_jsx("input", { type: "checkbox", defaultChecked: true }), _jsx("span", { className: styles.slider })] }), label] }, label))) })] }));
};
export default ManagePermission;
