import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Pagination2 from '../common/Pagination';
import SearchBar from '../common/SearchBar';
import styles from '../../styles/personnel/PersonnelTable.module.css';
import axios from '../../utils/CustomAxios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PersonnelTable = () => {
    const companyId = useSelector((state) => state.user.companyId);
    const [personnelList, setPersonnelList] = useState([]);
    const [pageInfo, setPageInfo] = useState();
    const [searchMember, setSearchMember] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState({
        cDept: "0",
        cPosi: "0",
        cStatus: "Y",
    });
    const navigate = useNavigate();
    const fetchPesonnel = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/workly/personnel`, {
            params: {
                cPage: currentPage,
                dept: category.cDept,
                position: category.cPosi,
                status: category.cStatus,
                name: searchMember,
            }
        })
            .then((response) => {
            console.log("받아온 데이터:", response.data);
            const filteredData = response.data.members.filter((member) => member.member.companyId === companyId);
            console.log(filteredData);
            setPersonnelList(filteredData);
            setPageInfo(response.data.pageInfo);
        })
            .catch(() => alert('사원 정보 조회에 실패하였습니다.'));
    };
    const handleSearch = () => {
        fetchPesonnel();
    };
    useEffect(() => {
        fetchPesonnel();
    }, [currentPage, category, searchMember]);
    ``;
    const phoneFormat = (phone) => {
        return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    };
    return (_jsxs("div", { className: styles.container, children: [_jsx(SearchBar, { category: category, setCategory: setCategory, setCurrentPage: setCurrentPage, handleSearch: handleSearch, setSearchMember: setSearchMember, searchMember: searchMember }), _jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { className: styles.headerRow, children: [_jsx("th", { className: styles.thStyle, children: "\uC0AC\uBC88" }), _jsx("th", { className: styles.thStyle, children: "\uC774\uB984" }), _jsx("th", { className: styles.thStyle, children: "\uC774\uBA54\uC77C" }), _jsx("th", { className: styles.thStyle, children: "\uB0B4\uC120\uBC88\uD638" }), _jsx("th", { className: styles.thStyle, children: "\uC5F0\uB77D\uCC98" }), _jsx("th", { className: styles.thStyle, children: "\uBD80\uC11C" }), _jsx("th", { className: styles.thStyle, children: "\uC9C1\uAE09" }), _jsx("th", { className: styles.thStyle, children: "\uC785\uC0AC\uC77C" }), _jsx("th", { className: styles.thStyle, children: "\uD1F4\uC0AC\uC77C" }), _jsx("th", { className: styles.thStyle, children: "\uC8FC\uC18C" })] }) }), _jsx("tbody", { children: personnelList.map((e, i) => (_jsxs("tr", { className: styles.rowStyle, onClick: () => navigate(`/personnel/${e.member.userNo}`), children: [_jsx("td", { className: styles.tdStyle, children: e.member.userNo }), _jsx("td", { className: styles.tdStyle, children: e.member.userName }), _jsx("td", { className: styles.tdStyle, children: e.member.email }), _jsx("td", { className: styles.tdStyle, children: e.member.extension }), _jsx("td", { className: styles.tdStyle, children: phoneFormat(e.member.phone) }), _jsx("td", { className: styles.tdStyle, children: e.department.deptName }), _jsx("td", { className: styles.tdStyle, children: e.position.positionName }), _jsx("td", { className: styles.tdStyle, children: new Date(e.member.hireDate).toISOString().split("T")[0] }), _jsx("td", { className: styles.tdStyle, children: e.member.updateDate === null ? "" : new Date(e.member.updateDate).toISOString().split("T")[0] }), _jsx("td", { className: `${styles.tdStyle} ${styles.address}`, children: e.member.address })] }, i))) })] }), _jsx(Pagination2, { pageInfo: pageInfo, setCurrentPage: setCurrentPage })] }));
};
export default PersonnelTable;
