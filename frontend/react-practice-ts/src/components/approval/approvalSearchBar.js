import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export const ApprovalSearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("");
    const [approvalType, setApprovalType] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    // 년도 옵션 생성 (2021~2025년)
    const getYearOptions = () => {
        const endYear = 2025;
        const startYear = 2021;
        const years = [];
        for (let year = endYear; year >= startYear; year--) {
            years.push(year);
        }
        return years;
    };
    // 검색 실행
    const handleSearch = () => {
        onSearch({
            approvalType,
            year: selectedYear,
            searchText
        });
    };
    // 엔터키 검색 지원
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (_jsxs("div", { style: containerStyle, children: [_jsxs("div", { style: selectContainerStyle, children: [_jsxs("select", { value: approvalType, onChange: (e) => {
                            setApprovalType(e.target.value);
                            onSearch({
                                approvalType: e.target.value,
                                year: selectedYear,
                                searchText
                            });
                        }, style: selectBoxStyle, children: [_jsx("option", { value: "", children: "\uAD6C\uBD84" }), _jsx("option", { value: "\uC77C\uBC18", children: "\uC77C\uBC18" }), _jsx("option", { value: "\uD734\uAC00\uC6D0", children: "\uD734\uAC00\uC6D0" })] }), _jsxs("select", { value: selectedYear, onChange: (e) => {
                            setSelectedYear(e.target.value);
                            onSearch({
                                approvalType,
                                year: e.target.value,
                                searchText
                            });
                        }, style: selectBoxStyle, children: [_jsx("option", { value: "", children: "\uB144\uB3C4" }), getYearOptions().map((year) => (_jsx("option", { value: year, children: year }, year)))] })] }), _jsx("div", { style: searchContainerStyle, children: _jsx("input", { type: "text", value: searchText, onChange: (e) => {
                        setSearchText(e.target.value);
                        // 실시간 검색을 위해 onChange에서 바로 검색 실행
                        onSearch({
                            approvalType,
                            year: selectedYear,
                            searchText: e.target.value
                        });
                    }, onKeyPress: (e) => {
                        if (e.key === 'Enter') {
                            onSearch({
                                approvalType,
                                year: selectedYear,
                                searchText
                            });
                        }
                    }, placeholder: "\uBB38\uC11C \uC81C\uBAA9/\uAE30\uC548 \uBC88\uD638/\uAE30\uC548\uC790 \uC785\uB825", style: searchInputStyle }) })] }));
};
// :흰색_확인_표시: 컨테이너 스타일 (가운데 정렬 및 좌우 배치)
const containerStyle = {
    display: "flex",
    justifyContent: "center", // :흰색_확인_표시: 왼쪽(셀렉트 박스)과 오른쪽(검색창) 정렬
    alignItems: "center",
    width: "100%", // 전체 폭 설정
    padding: "50px 0px 10px", // 위아래 패딩 추가
};
// :흰색_확인_표시: 왼쪽 셀렉트 박스 컨테이너
const selectContainerStyle = {
    display: "flex",
    gap: "10px", // :흰색_확인_표시: 셀렉트 박스 간 간격 조정
};
// :흰색_확인_표시: 검색 컨테이너 (오른쪽 배치)
const searchContainerStyle = {
    width: "220px",
    display: "flex",
    alignItems: "center",
    marginLeft: "60%",
};
// :흰색_확인_표시: 검색 입력 필드 스타일
const searchInputStyle = {
    width: "100%",
    height: "25px",
    paddingLeft: "35px", // 플레이스홀더 오른쪽 이동
    opacity: 0.8,
    color: "#202224",
    fontSize: "10px",
    fontFamily: "Nunito Sans",
    fontWeight: 400,
    borderRadius: "20px",
    border: "1px solid #D5D5D5",
    background: "#F5F6FA",
    outline: "none",
};
// :흰색_확인_표시: 셀렉트 박스 스타일
const selectBoxStyle = {
    width: "80px", // :흰색_확인_표시: 버튼 크기에 맞게 조정
    height: "25px", // :흰색_확인_표시: 버튼 높이와 맞춤
    background: "white",
    border: "1px solid black",
    borderRadius: "4px",
    fontSize: "10px",
    padding: "5px",
    cursor: "pointer",
};
