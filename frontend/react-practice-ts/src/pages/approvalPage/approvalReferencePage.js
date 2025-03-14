import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ApprovalHeader } from "../../components/approval/approvalHeader";
import { ApprovalSearchBar } from "../../components/approval/approvalSearchBar";
import { ApprovalReferencePost } from "../../components/approval/approvalReferencePost";
import { ApprovalFooter } from "../../components/approval/approvalFooter";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import { format, addHours } from "date-fns";
import { ko } from "date-fns/locale";
export const ApprovalReferencePage = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const userNo = useSelector((state) => state.user.userNo);
    useEffect(() => {
        const fetchApprovalPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:8003/workly/api/approval/referenceList/${userNo}`);
                if (!response.data || response.data.length === 0) {
                    console.warn("✅ 가져온 참조 문서 목록이 없습니다.");
                    setPosts([]);
                    setFilteredPosts([]);
                    return;
                }
                console.log("✅ 가져온 참조 문서:", response.data);
                const filteredData = response.data.map((post) => ({
                    ...post,
                    startDate: formatKST(post.startDate),
                }));
                setPosts(filteredData);
                setFilteredPosts(filteredData);
            }
            catch (error) {
                console.error("🚨 참조 문서 목록을 불러오는 데 실패했습니다", error);
            }
        };
        if (userNo) {
            fetchApprovalPosts();
        }
    }, [userNo]);
    // ✅ 한국 시간(KST) 변환 함수
    const formatKST = (timestamp) => {
        if (!timestamp)
            return "N/A";
        let ts = Number(timestamp);
        if (ts.toString().length === 10) {
            ts *= 1000;
        }
        const date = addHours(new Date(ts), 9);
        return format(date, "yyyy. MM. dd. a hh:mm", { locale: ko });
    };
    return (_jsxs("div", { className: "mainpageContainer", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "componentContainer", children: [_jsx(Header, {}), _jsxs("div", { className: "componentContainer1", children: [_jsx(ApprovalHeader, {}), _jsx(ApprovalSearchBar, { onSearch: (params) => {
                                    let result = [...posts];
                                    if (params.approvalType) {
                                        result = result.filter(post => post.approvalType === params.approvalType);
                                    }
                                    if (params.year) {
                                        result = result.filter(post => {
                                            const postDate = new Date(post.startDate);
                                            return postDate.getFullYear().toString() === params.year;
                                        });
                                    }
                                    if (params.searchText) {
                                        const searchLower = params.searchText.toLowerCase().trim();
                                        result = result.filter(post => post.approvalTitle?.toLowerCase().includes(searchLower) ||
                                            post.approvalNo.toString().includes(searchLower) ||
                                            `기안-${post.approvalNo}`.toLowerCase().includes(searchLower) ||
                                            post.approvalUser?.toLowerCase().includes(searchLower));
                                    }
                                    setFilteredPosts(result);
                                } }), _jsx(ApprovalReferencePost, { filteredPosts: filteredPosts, currentPage: currentPage, postsPerPage: postsPerPage, setCurrentPage: setCurrentPage }), _jsx(ApprovalFooter, { pageInfo: {
                                    listCount: filteredPosts.length,
                                    currentPage,
                                    pageLimit: 5,
                                    contentsLimit: postsPerPage,
                                    maxPage: Math.ceil(filteredPosts.length / postsPerPage) || 1,
                                }, setCurrentPage: setCurrentPage })] })] })] }));
};
