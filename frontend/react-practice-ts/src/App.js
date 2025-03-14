import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Calendar from "./pages/Calendar";
import './App.css';
import { ApprovalMain } from "./pages/approvalPage/approvalMain";
import { ApprovalWritePage } from "./pages/approvalPage/approvalWritePage";
import { ApprovalCompletePage } from "./pages/approvalPage/approvalCompletePage";
import PersonnelMain from "./pages/PersonnelMain";
import { ApprovalProgressPage } from "./pages/approvalPage/approvalProgressPage";
import { ApprovalFinishPage } from "./pages/approvalPage/approvalFinishPage";
import { ApprovalRequestPage } from "./pages/approvalPage/approvalRequestPage";
import { ApprovalReferencePage } from "./pages/approvalPage/approvalReferencePage";
import { ApprovalTempPage } from "./pages/approvalPage/approvalTempPage";
import { ApprovalRejectPage } from "./pages/approvalPage/approvalRejectPage";
import CreateEmployee from "./components/personnel/CreateEmployee";
import ManagePermission from "./components/personnel/ManagePermission";
import PersonnelTable from "./components/personnel/PersonnelTable";
import PersonnelDetail from "./components/personnel/PersonnelDetail";
import LeaveMain from "./pages/LeaveMain";
import MyLeave from "./components/leave/MyLeave";
import LeavePolicy from "./components/leave/LeavePolicy";
import ManageLeave from "./components/leave/ManageLeave";
import ApprovalConfirmPage from "./pages/approvalPage/approvalConfirmPage";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { closeChat } from "./features/sidebarSlice";
import { ApprovalCompletePage2 } from "./pages/approvalPage/approvalCompletePage2";
import { ApprovalSendPage } from "./pages/approvalPage/approvalSendPage";
import MyPage from "./pages/MyPage";
import MyInfomation from "./components/myPage/MyInfomation";
import { ApprovalRejectDetailPage } from "./pages/approvalPage/approvalRejectDetailPage";
import useFetchNotifications from "./hooks/useFetchNotifications";
import NotificationModal from "./components/approval/approvalNotification";
import AdminPolicyManagerPage from "./pages/AdminPolicyManagerPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import CompanyEnrollPage from "./pages/CompanyEnrollPage";
import RoleRoute from "./components/common/RoleRoute";
import OrganizationChartPage from "./pages/OrganizationChartPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from "./features/userSlice";
function App() {
    // 전자결재 알림서비스 추가
    const userNo = useSelector((state) => state.user.userNo);
    useFetchNotifications(userNo);
    const currentUser = useSelector((state) => state.user);
    const { isChatOpen } = useSelector((state) => state.sidebar);
    const dispatch = useDispatch();
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            // localStorage에서 파싱한 정보를 Redux에 업데이트
            dispatch(loginUser(JSON.parse(storedUser)));
        }
    }, [dispatch]);
    return (_jsxs("div", { children: [_jsx(NotificationModal, {}), isChatOpen && (_jsx(Chat, { currentUser: currentUser, onClose: () => dispatch(closeChat()) })), _jsx(ToastContainer, { position: "top-right", autoClose: 3000, hideProgressBar: false, newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, draggable: true, pauseOnHover: true }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Login, {}) }), _jsxs(Route, { element: _jsx(RoleRoute, { roles: ['ROLE_HR', 'ROLE_USER'] }), children: [_jsx(Route, { path: "/main", element: _jsx(MainPage, {}) }), _jsx(Route, { path: "/calendar", element: _jsx(Calendar, {}) }), _jsx(Route, { path: "/OrganizationChart", element: _jsx(OrganizationChartPage, {}) }), _jsx(Route, { path: "/approvalMain", element: _jsx(ApprovalMain, {}) }), _jsx(Route, { path: "/ApprovalWritePage", element: _jsx(ApprovalWritePage, {}) }), _jsx(Route, { path: "/ApprovalCompletePage/:approvalNo", element: _jsx(ApprovalCompletePage, {}) }), _jsx(Route, { path: "/approvalTempPage", element: _jsx(ApprovalTempPage, {}) }), _jsx(Route, { path: "/approvalRejectPage", element: _jsx(ApprovalRejectPage, {}) }), _jsx(Route, { path: "/ApprovalProgressPage", element: _jsx(ApprovalProgressPage, {}) }), _jsx(Route, { path: "/ApprovalFinishPage", element: _jsx(ApprovalFinishPage, {}) }), _jsx(Route, { path: "/ApprovalRequestPage", element: _jsx(ApprovalRequestPage, {}) }), _jsx(Route, { path: "/ApprovalReferencePage", element: _jsx(ApprovalReferencePage, {}) }), _jsx(Route, { path: "/ApprovalConfirmPage/:approvalNo", element: _jsx(ApprovalConfirmPage, {}) }), _jsx(Route, { path: "/ApprovalCompletepage2/:approvalNo", element: _jsx(ApprovalCompletePage2, {}) }), _jsx(Route, { path: "/ApprovalSendPage", element: _jsx(ApprovalSendPage, {}) }), _jsx(Route, { path: "/ApprovalRejectpage", element: _jsx(ApprovalReferencePage, {}) }), _jsx(Route, { path: "/ApprovalRejectDetailPage/:approvalNo", element: _jsx(ApprovalRejectDetailPage, {}) }), _jsx(Route, { path: "/AIAssistantPage", element: _jsx(AIAssistantPage, {}) }), _jsx(Route, { path: "/CompanyEnrollPage", element: _jsx(CompanyEnrollPage, {}) }), _jsxs(Route, { path: "/mypage", element: _jsx(MyPage, {}), children: [_jsx(Route, { index: true, element: _jsx(MyInfomation, {}) }), _jsx(Route, { path: "salary", element: _jsx(_Fragment, {}) })] })] }), _jsxs(Route, { element: _jsx(RoleRoute, { roles: ['ROLE_HR'] }), children: [_jsxs(Route, { path: "/personnel", element: _jsx(PersonnelMain, {}), children: [_jsx(Route, { index: true, element: _jsx(PersonnelTable, {}) }), _jsx(Route, { path: "createEmployee", element: _jsx(CreateEmployee, {}) }), _jsx(Route, { path: "managePermissions", element: _jsx(ManagePermission, {}) }), _jsx(Route, { path: ":userNo", element: _jsx(PersonnelDetail, {}) })] }), _jsx(Route, { path: "/AdminPolicyManagerPage", element: _jsx(AdminPolicyManagerPage, {}) })] }), _jsxs(Route, { path: "/leave", element: _jsx(LeaveMain, {}), children: [_jsx(Route, { element: _jsx(RoleRoute, { roles: ["ROLE_HR", "ROLE_USER"] }), children: _jsx(Route, { index: true, element: _jsx(MyLeave, {}) }) }), _jsxs(Route, { element: _jsx(RoleRoute, { roles: ["ROLE_HR"] }), children: [_jsx(Route, { path: "manage", element: _jsx(ManageLeave, {}) }), _jsx(Route, { path: "policy", element: _jsx(LeavePolicy, {}) })] })] })] })] }));
}
export default App;
