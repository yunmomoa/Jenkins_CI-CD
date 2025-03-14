import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Category from '../components/personnel/Category';
import { Outlet } from 'react-router-dom';
const PersonnelMain = () => {
    return (_jsxs("div", { className: "mainpageContainer", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "componentContainer", children: [_jsx(Header, {}), _jsxs("div", { className: "componentContainer1", children: [_jsx(Category, {}), _jsx(Outlet, {})] })] })] }));
};
export default PersonnelMain;
