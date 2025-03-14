import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "../../styles/common/Pagination.module.css";
const Pagination2 = ({ pageInfo, setCurrentPage }) => {
    if (!pageInfo)
        return null;
    const { currentPage, maxPage } = pageInfo;
    return (_jsx("div", { children: _jsxs("div", { className: styles.pagination, children: [currentPage > 1 && (_jsx("button", { className: styles.moveButton, disabled: currentPage === 1, onClick: () => setCurrentPage(currentPage - 1), children: "<" })), Array.from({ length: maxPage }).map((_, index) => (_jsx("button", { className: `${styles.pageButton} ${currentPage === index + 1 ? styles.activePage : ""}`, onClick: () => {
                        setCurrentPage(index + 1);
                    }, children: index + 1 }, index))), currentPage < maxPage && (_jsx("button", { className: styles.moveButton, disabled: currentPage === maxPage, onClick: () => setCurrentPage(currentPage + 1), children: ">" }))] }) }));
};
export default Pagination2;
