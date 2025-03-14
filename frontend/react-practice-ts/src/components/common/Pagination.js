import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "../../styles/common/Pagination.module.css";
const Pagination = ({ pageInfo, setCurrentPage }) => {
    if (!pageInfo)
        return null;
    const { currentPage, pageLimit, maxPage } = pageInfo;
    // 📌 표시할 페이지 범위 계산
    const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    const endPage = Math.min(maxPage, startPage + pageLimit - 1);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    return (_jsx("div", { children: _jsxs("div", { className: styles.pagination, children: [currentPage > 1 && (_jsx("button", { className: styles.moveButton, onClick: () => setCurrentPage(currentPage - 1), children: "<" })), pageNumbers.map((page) => (_jsx("button", { className: `${styles.pageButton} ${currentPage === page ? styles.activePage : ""}`, onClick: () => setCurrentPage(page), children: page }, page))), currentPage < maxPage && (_jsx("button", { className: styles.moveButton, onClick: () => setCurrentPage(currentPage + 1), children: ">" }))] }) }));
};
export default Pagination;
