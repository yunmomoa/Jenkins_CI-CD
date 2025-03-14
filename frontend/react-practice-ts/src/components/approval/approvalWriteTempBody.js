import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
const ApprovalWriteTempBody = ({ approvalData, setApprovalData }) => {
    // ✅ 모든 입력 필드의 상태를 업데이트하는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setApprovalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    useEffect(() => {
        console.log("✅ approvalData 업데이트됨:", approvalData);
    }, [approvalData]);
    return (_jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [_jsx("input", { type: "text", name: "approvalTitle", value: approvalData.approvalTitle || "", onChange: handleChange, placeholder: "\uC81C\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694", style: { width: "870px", padding: "10px", fontSize: "16px", border: "1px solid black", borderRadius: "4px" } }), _jsxs("select", { name: "approvalType", value: approvalData.approvalType || "", onChange: handleChange, style: { width: "870px", padding: "8px", fontSize: "16px", border: "1px solid black", borderRadius: "4px" }, children: [_jsx("option", { value: "", children: "-- \uACB0\uC7AC \uC720\uD615 \uC120\uD0DD --" }), _jsx("option", { value: "\uC77C\uBC18", children: "\uC77C\uBC18" }), _jsx("option", { value: "\uD734\uAC00\uC6D0", children: "\uD734\uAC00\uC6D0" }), _jsx("option", { value: "\uC9C0\uCD9C\uACB0\uC758", children: "\uC9C0\uCD9C\uACB0\uC758" })] }), _jsx("textarea", { name: "approvalContent", value: approvalData.approvalContent || "", onChange: handleChange, placeholder: "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694", style: { width: "870px", height: "440px", padding: "10px", fontSize: "16px", border: "1px solid black", borderRadius: "4px" } })] }));
};
export default ApprovalWriteTempBody;
