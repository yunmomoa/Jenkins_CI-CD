import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ApprovalWriteTempBody from "../../components/approval/approvalWriteTempBody";
import ApprovalWriteTempFooter from "../../components/approval/approvalWriteTempFooter";
import ApprovalWriteTempHeader from "../../components/approval/approvalWriteTempHeader";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
export const ApprovalTempUpdatePage = () => {
    const { tempNo } = useParams(); // ✅ URL에서 tempNo 가져오기
    const [approvalData, setApprovalData] = useState(null);
    const parsedTempNo = Number(tempNo);
    useEffect(() => {
        if (!parsedTempNo)
            return;
        console.log(`✅ 임시저장 데이터 요청: /api/approvalTemp/${parsedTempNo}`);
        axios.get(`http://localhost:8003/api/approvalTemp/${parsedTempNo}`)
            .then(response => {
            console.log("✅ 불러온 데이터:", response.data);
            setApprovalData(response.data);
        })
            .catch(error => {
            console.error("🚨 데이터 불러오기 실패:", error);
        });
    }, [parsedTempNo]);
    return (_jsxs("div", { className: "mainpageContainer", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "componentContainer", children: [_jsx(Header, {}), _jsx("div", { style: { overflowY: "auto", maxHeight: "calc(100vh - 100px)", paddingRight: "10px" }, children: approvalData ? (_jsxs(_Fragment, { children: [_jsx(ApprovalWriteTempHeader, { approvalData: approvalData, setApprovalData: setApprovalData }), _jsx(ApprovalWriteTempBody, { approvalData: approvalData, setApprovalData: setApprovalData }), _jsx(ApprovalWriteTempFooter, { approvalData: approvalData, setApprovalData: setApprovalData })] })) : (_jsx("p", { children: "\u23F3 \uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uB294 \uC911..." })) })] })] }));
};
