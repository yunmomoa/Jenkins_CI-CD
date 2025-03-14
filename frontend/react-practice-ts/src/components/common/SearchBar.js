import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from '../../styles/common/SearchBar.module.css';
import search from '../../assets/images/icon/search.png';
import { useEffect, useState } from 'react';
import axios from '../../utils/CustomAxios';
// @ts-ignore
const SearchBar = ({ category, setCategory, searchMember, setSearchMember, handleSearch, setCurrentPage }) => {
    const [dept, setDept] = useState([]);
    const [position, setPosition] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8003/workly/dept-posi")
            .then((response) => {
            setDept(response.data.department);
            setPosition(response.data.position);
        });
    }, [category]);
    const handleCategoryChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        });
        setCurrentPage(1);
    };
    const handleSearchMember = (e) => {
        setSearchMember(e.target.value);
        setCurrentPage(1);
    };
    const handleReset = () => {
        setCategory({
            cDept: "0",
            cPosi: "0",
            cStatus: "Y",
        });
        setSearchMember('');
    };
    const handelEnter = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (_jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.filterGroup, children: [_jsxs("select", { name: "cDept", value: category.cDept, className: styles.select, onChange: handleCategoryChange, children: [_jsx("option", { value: "0", children: "\uBD80\uC11C\uBA85" }), dept.map(function (e) {
                                return (
                                // @ts-ignore
                                _jsx("option", { value: e.deptNo, children: e.deptName }, e.deptNo));
                            })] }), _jsxs("select", { name: "cPosi", value: category.cPosi, className: styles.select, onChange: handleCategoryChange, children: [_jsx("option", { value: "0", children: "\uC9C1\uAE09" }), position.map(function (e) {
                                return (
                                // @ts-ignore
                                _jsx("option", { value: e.positionNo, children: e.positionName }, e.positionNo));
                            })] }), _jsxs("select", { name: "cStatus", value: category.cStatus, className: styles.select, onChange: handleCategoryChange, children: [_jsx("option", { value: "0", children: "\uC804\uCCB4" }), _jsx("option", { value: "Y", children: "\uC7AC\uC9C1" }), _jsx("option", { value: "X", children: "\uD1F4\uC9C1" }), _jsx("option", { value: "Z", children: "\uD734\uC9C1" })] }), _jsx("div", { onClick: handleReset, className: styles.reset, children: "\uCD08\uAE30\uD654" })] }), _jsxs("div", { className: styles.search, onKeyDown: handelEnter, children: [_jsx("input", { type: "text", value: searchMember, onChange: handleSearchMember, className: styles.input, placeholder: "\uC0AC\uC6D0 \uAC80\uC0C9" }), _jsx("button", { onClick: handleSearch, className: styles.searchButton, children: _jsx("img", { src: search, alt: 'search' }) })] })] }));
};
export default SearchBar;
