import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ApprovalCompleteDocument from "../../components/approval/approvalCompleteDocument";
import { ApprovalConfirmFooter } from "../../components/approval/approvalConfirmFooter";
import { ApprovalCompleteHeader } from "../../components/approval/approvalCompleteHeader";
import ApprovalCompleteReply from "../../components/approval/approvalCompleteRply";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
export const ApprovalConfirmPage = () => {
    return (_jsxs("div", { className: "mainpageContainer", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "componentContainer", children: [_jsx(Header, {}), _jsxs("div", { style: scrollableContentStyle, children: [_jsx(ApprovalCompleteHeader, {}), _jsx(ApprovalCompleteDocument, {}), _jsx(ApprovalCompleteReply, {}), _jsx(ApprovalConfirmFooter, {})] })] })] }));
};
// ✅ **스타일 정의 (TSX 내부에서 적용)**
const scrollableContentStyle = {
    overflowY: "auto", // ✅ 세로 스크롤바 적용
    maxHeight: "calc(100vh - 100px)", // ✅ 화면 높이에서 일부 여백 제외 (조정 가능)
    paddingRight: "10px", // ✅ 스크롤바 공간 확보
};
export default ApprovalConfirmPage;
