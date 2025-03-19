import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ApprovalHeader } from "../../components/approval/approvalHeader";
import { ApprovalSearchBar } from "../../components/approval/approvalSearchBar";
import { ApprovalTempBody } from "../../components/approval/approvalTempBody";
import { ApprovalTempFooter } from "../../components/approval/approvalTempFooter";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import axios from "axios";
export const ApprovalTempPage = () => {
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const postsPerPage = 10;
    const userNo = useSelector((state) => state.user?.userNo) || sessionStorage.getItem("userNo");
    useEffect(() => {
        const fetchData = async () => {
            if (!userNo)
                return;
            try {
                console.log("✅ API 요청:", `${import.meta.env.VITE_API_URL}/workly/api/approvalTemp/list/${userNo}`);
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/workly/api/approvalTemp/list/${userNo}`);
                if (response.status === 200 && Array.isArray(response.data)) {
                    console.log("✅ 데이터 로드 성공:", response.data);
                    setPosts(response.data);
                    setFilteredPosts(response.data);
                }
                else if (response.status === 204) {
                    console.warn("⚠ 임시 저장 문서 없음");
                }
                else {
                    console.error("❌ 예상치 못한 응답:", response);
                }
            }
            catch (error) {
                console.error("🚨 임시저장 목록 조회 실패:", error.response?.data || error.message);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [userNo]);
    return (_jsxs("div", { className: "mainpageContainer", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "componentContainer", children: [_jsx(Header, {}), _jsxs("div", { className: "componentContainer1", children: [_jsx(ApprovalHeader, {}), _jsx(ApprovalSearchBar, {}), _jsx(ApprovalTempBody, { selectedPosts: selectedPosts, setSelectedPosts: setSelectedPosts, filteredPosts: filteredPosts, currentPage: currentPage, postsPerPage: postsPerPage, isLoading: isLoading }), _jsx(ApprovalTempFooter, { pageInfo: {
                                    listCount: filteredPosts.length,
                                    currentPage,
                                    pageLimit: 5,
                                    contentsLimit: postsPerPage,
                                    maxPage: Math.ceil(filteredPosts.length / postsPerPage),
                                    startPage: Math.floor((currentPage - 1) / 5) * 5 + 1,
                                    endPage: Math.min(Math.floor((currentPage - 1) / 5) * 5 + 5, Math.ceil(filteredPosts.length / postsPerPage)),
                                }, setCurrentPage: setCurrentPage, selectedPosts: selectedPosts, setSelectedPosts: setSelectedPosts, handleRefresh: () => {
                                    fetchData(); // ✅ 삭제 후 데이터 새로 불러오기
                                } })] })] })] }));
};
