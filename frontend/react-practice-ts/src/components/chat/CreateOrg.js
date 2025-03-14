import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import searchIcon from "../../assets/images/chat/search.png";
import OrgMemberPlus from './OrgMemberPlus';
const CreateOrg = ({ onComplete, onClose }) => {
    const [deptName, setDeptName] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);
    // 사원 선택 완료 핸들러
    const handleMembersComplete = (members) => {
        setSelectedMembers(members);
        setIsSearching(false);
    };
    // 부서 생성 완료 핸들러
    const handleCreateDept = () => {
        if (!deptName.trim()) {
            alert('부서 이름을 입력해주세요.');
            return;
        }
        if (selectedMembers.length === 0) {
            alert('부서원을 선택해주세요.');
            return;
        }
        const newDepartment = {
            deptName,
            members: selectedMembers,
        };
        onComplete(newDepartment);
        // 입력값 초기화
        setDeptName('');
        setSelectedMembers([]);
        onClose();
    };
    return isSearching ? (_jsx(OrgMemberPlus, { deptName: deptName, onComplete: (result) => {
            handleMembersComplete(result.selectedMembers);
        } })) : (_jsxs("div", { className: "DeptCreate", style: {
            width: 390,
            height: 600,
            position: "relative",
        }, children: [_jsx("div", { className: "DeptCreate-Background", style: {
                    width: 390,
                    height: 600,
                    left: 0,
                    top: 0,
                    position: "absolute",
                    background: "white",
                    borderRadius: 5,
                } }), _jsx("div", { className: "DeptCreate-HeaderBackground", style: {
                    width: 390,
                    height: 170.18,
                    left: 0,
                    top: 0,
                    position: "absolute",
                    background: "#E9EBF1",
                    borderRadius: 5,
                } }), _jsxs("div", { className: "DeptCreate-TitleWrapper", style: {
                    width: 95,
                    height: 19.64,
                    paddingBottom: 1.64,
                    paddingRight: 6.16,
                    left: 23,
                    top: 19.64,
                    position: "absolute",
                    borderRadius: 5,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    display: "inline-flex",
                }, children: [_jsx("div", { className: "DeptCreate-TitleText", style: {
                            width: 88.84,
                            color: "#4880FF",
                            fontSize: 16,
                            fontFamily: "Nunito Sans",
                            fontWeight: "800",
                            wordWrap: "break-word",
                        }, children: "New Dept" }), _jsx("button", { onClick: onClose, style: {
                            position: "absolute",
                            left: 325,
                            background: "transparent",
                            border: "none",
                            fontSize: 18,
                            cursor: "pointer",
                        }, children: "\u2715" })] }), _jsx("div", { className: "DeptCreate-InfoCard", style: {
                    width: 300,
                    height: 190,
                    left: 50,
                    top: 192,
                    position: "absolute",
                    background: "white",
                    borderRadius: 5,
                    border: "0.50px #979797 solid",
                } }), _jsx("div", { className: "DeptCreate-InfoHeader", style: {
                    width: 300,
                    height: 29.45,
                    left: 50,
                    top: 192,
                    position: "absolute",
                    background: "#4880FF",
                    borderRadius: "5px 5px 0 0",
                    border: "0.50px #979797 solid",
                } }), _jsx("div", { className: "DeptCreate-InfoHeaderText", style: {
                    position: "absolute",
                    left: 68,
                    top: 195.8,
                    color: "white",
                    fontSize: 16,
                    fontFamily: "Inter",
                    fontWeight: "600",
                }, children: "\uBD80\uC11C \uC815\uBCF4\uC124\uC815" }), _jsx("div", { style: {
                    position: "absolute",
                    left: 73,
                    top: 243,
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    color: "#979797",
                }, children: "\uBD80\uC11C \uC774\uB984" }), _jsx("input", { type: "text", placeholder: "\uBD80\uC11C \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694", value: deptName, onChange: (e) => setDeptName(e.target.value), style: {
                    position: "absolute",
                    left: 73,
                    top: 265,
                    width: "240px",
                    height: "25px",
                    paddingLeft: "10px",
                    border: "1px solid #B3B3B3",
                    borderRadius: "3px",
                } }), _jsx("div", { onClick: () => setIsSearching(true), style: {
                    position: "absolute",
                    left: 73,
                    top: 298,
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    color: "#979797",
                    cursor: "pointer",
                }, children: "\uC0AC\uC6D0 \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694" }), _jsxs("div", { style: {
                    cursor: "pointer",
                    position: "absolute",
                    left: 73,
                    top: 320,
                    width: "254px",
                    height: "25px",
                    backgroundColor: "#E9EBF1",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "8px",
                    borderRadius: "3px",
                    color: "#B3B3B3",
                    fontSize: "11px",
                    fontFamily: "Roboto",
                }, onClick: () => setIsSearching(true), children: [selectedMembers.length > 0
                        ? `${selectedMembers.map((m) => m.name).join(', ')}`
                        : '이름을 입력하세요', _jsx("img", { src: searchIcon, alt: "\uAC80\uC0C9", style: { width: "18px", height: "18px", marginLeft: "auto", marginRight: "8px" } })] }), _jsx("button", { onClick: handleCreateDept, style: {
                    position: "absolute",
                    bottom: "30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#4880FF",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                }, children: "\uBD80\uC11C \uC0DD\uC131 \uC644\uB8CC" })] }));
};
export default CreateOrg;
