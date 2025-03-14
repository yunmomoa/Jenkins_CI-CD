import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import FormSelect from "../components/form/FormSelect";
const FormMain = () => {
    return (_jsxs("div", { className: "mainpageContainer", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "componentContainer", children: [_jsx(Header, {}), _jsx("div", { className: "componentContainer1", children: _jsx(FormSelect, {}) })] })] }));
};
export default FormMain;
