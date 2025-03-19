import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import axios from "axios";
import search from "../../assets/images/chat/search.png";
const SearchSelect = ({ onProfileClick }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // 검색 API 요청
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/workly/api/chat/search`, { params: { userName: searchTerm } });
            setSearchResults(response.data);
        }
        catch (error) {
            console.error("❌ 검색 중 오류 발생:", error);
            setSearchResults([]);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Enter 키 입력 시 검색 실행
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
    return (_jsxs("div", { className: "searchSelect", style: { width: "264px", position: "relative" }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", position: "relative" }, children: [_jsx("input", { type: "text", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), onKeyDown: handleKeyDown, placeholder: "\uC774\uB984 \uAC80\uC0C9", style: {
                            width: "255px",
                            height: "32px",
                            padding: "0 40px 0 12px",
                            borderRadius: "16px",
                            border: "1px solid #D9D9D9",
                            outline: "none",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#333",
                        } }), _jsx("img", { onClick: handleSearch, style: {
                            width: "20px",
                            height: "20px",
                            position: "absolute",
                            right: "25px",
                            cursor: "pointer",
                        }, src: search, alt: "search" })] }), searchTerm && (_jsx("ul", { style: {
                    position: "absolute",
                    top: "38px",
                    width: "255px",
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    maxHeight: "200px",
                    overflowY: "auto",
                    padding: "5px 0",
                    listStyle: "none",
                    zIndex: 10,
                    margin: 0,
                }, children: isLoading ? (_jsx("li", { style: {
                        padding: "12px 16px",
                        fontSize: "14px",
                        color: "#8C8C8D",
                        textAlign: "center",
                    }, children: "\uAC80\uC0C9 \uC911..." })) : searchResults.length > 0 ? (searchResults.map((member) => (_jsx("li", { style: {
                        padding: "12px 16px",
                        borderBottom: "1px solid #eee",
                        fontSize: "14px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transition: "background-color 0.2s",
                    }, onClick: () => onProfileClick(member), onMouseEnter: (e) => (e.currentTarget.style.backgroundColor = "#f5f5f5"), onMouseLeave: (e) => (e.currentTarget.style.backgroundColor = "white"), children: _jsxs("div", { children: [_jsx("div", { style: { fontSize: "14px", fontWeight: "600", color: "#202224" }, children: member.userName }), _jsxs("div", { style: { fontSize: "12px", color: "#8C8C8D" }, children: [member.deptName, " \u00B7 ", member.positionName] })] }) }, member.userNo)))) : (_jsx("li", { style: {
                        padding: "12px 16px",
                        fontSize: "14px",
                        color: "#8C8C8D",
                        textAlign: "center",
                    }, children: "\uC5C6\uB294 \uC0AC\uC6D0\uC785\uB2C8\uB2E4." })) }))] }));
};
export default SearchSelect;
