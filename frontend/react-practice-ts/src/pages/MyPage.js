import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import MyPageCategory from '../components/myPage/MyPageCategory';
const MyPage = () => {
    return (_jsxs("div", { className: "mainpageContainer", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "componentContainer", children: [_jsx(Header, {}), _jsxs("div", { className: "componentContainer1", children: [_jsx(MyPageCategory, {}), _jsx(Outlet, {})] })] })] }));
};
export default MyPage;
