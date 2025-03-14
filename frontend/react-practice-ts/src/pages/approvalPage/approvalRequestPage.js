import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ApprovalHeader } from "../../components/approval/approvalHeader";
import { ApprovalRequestPost } from "../../components/approval/approvalRequestPost";
import { ApprovalSearchBar } from "../../components/approval/approvalSearchBar";
import { ApprovalFooter } from "../../components/approval/approvalFooter";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ApprovalRequestPage = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const postsPerPage = 10;
    // ✅ 로그인한 유저 정보 가져오기
    const userNoFromRedux = useSelector((state) => state.user.userNo);
    const userNoFromSession = sessionStorage.getItem("userNo");
    const userNo = userNoFromRedux || userNoFromSession;
    const navigate = useNavigate();
    // ✅ 진행함 문서 목록 불러오기
    useEffect(() => {
        if (!userNo) {
            console.error("❌ 로그인 정보가 없습니다.");
            return;
        }
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8003/workly/api/approval/requests/${userNo}`);
                //console.log("✅ 요청함함 응답 데이터:", response.data);
                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                    setFilteredPosts(response.data);
                    setIsLoading(false);
                }
                else {
                    console.error("❌ 응답 데이터가 배열이 아닙니다:", response.data);
                }
            }
            catch (error) {
                console.error("🚨 요청함 목록 조회 실패:", error?.response?.status, error?.response?.data);
            }
        };
        fetchData();
    }, [userNo]);
    // ✅ 서치바 필터링 기능
    const handleSearch = (searchParams) => {
        let result = [...posts];
        if (searchParams.approvalType) {
            result = result.filter(post => post.approvalType === searchParams.approvalType);
        }
        if (searchParams.year) {
            result = result.filter(post => {
                const postDate = new Date(post.startDate);
                return postDate.getFullYear().toString() === searchParams.year;
            });
        }
        if (searchParams.searchText) {
            const searchLower = searchParams.searchText.toLowerCase().trim();
            result = result.filter(post => post.approvalTitle?.toLowerCase().includes(searchLower) ||
                post.approvalNo.toString().includes(searchLower) ||
                `기안-${post.approvalNo}`.toLowerCase().includes(searchLower) ||
                post.approvalUser?.toLowerCase().includes(searchLower));
        }
        setFilteredPosts(result);
    };
    return (_jsxs("div", { className: "mainpageContainer", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "componentContainer", children: [_jsx(Header, {}), _jsxs("div", { className: "componentContainer1", children: [_jsx(ApprovalHeader, {}), _jsx(ApprovalSearchBar, { onSearch: handleSearch }), _jsx(ApprovalRequestPost, { filteredPosts: filteredPosts, currentPage: currentPage, postsPerPage: postsPerPage }), _jsx(ApprovalFooter, { pageInfo: {
                                    listCount: filteredPosts.length,
                                    currentPage,
                                    pageLimit: 5,
                                    contentsLimit: postsPerPage,
                                    maxPage: Math.ceil(filteredPosts.length / postsPerPage) || 1,
                                }, setCurrentPage: setCurrentPage })] })] })] }));
};
