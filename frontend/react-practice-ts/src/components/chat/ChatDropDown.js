import { jsx as _jsx } from "react/jsx-runtime";
const ChatDropdown = ({ selectedStatus, setSelectedStatus, isOpen }) => {
    const statuses = ["활성화", "비활성화", "회의중", "자리비움"];
    return (_jsx("div", { style: { position: "relative", display: "inline-block" }, children: isOpen ? (_jsx("select", { value: selectedStatus, onChange: (e) => setSelectedStatus(e.target.value), style: {
                fontSize: "11px",
                fontWeight: "500",
                color: "#202224",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "2px 6px",
                background: "white",
                cursor: "pointer",
            }, children: statuses.map((status, index) => (_jsx("option", { value: status, children: status }, index))) })) : (
        // 드롭다운이 닫혔을 때 현재 선택된 상태 표시
        _jsx("div", { style: {
                fontSize: "11px",
                fontWeight: "500",
                color: "#B3B3B3",
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "2px 6px",
                background: "white",
            }, children: selectedStatus })) }));
};
export default ChatDropdown;
