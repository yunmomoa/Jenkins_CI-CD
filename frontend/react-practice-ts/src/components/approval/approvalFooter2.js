import { jsx as _jsx } from "react/jsx-runtime";
import Pagination from "../common/Pagination"; // body에 삭제버튼 들어가야하는 경우 사용하는 푸터
export const ApprovalFooter2 = ({ pageInfo, setCurrentPage }) => {
    return (_jsx("div", { style: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px"
        }, children: _jsx(Pagination, { pageInfo: pageInfo, setCurrentPage: setCurrentPage }) }));
};
