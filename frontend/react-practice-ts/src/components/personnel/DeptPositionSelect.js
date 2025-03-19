import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styles from '../../styles/personnel/DeptPositionSelect.module.css';
import axios from '../../utils/CustomAxios';
const DeptPositionSelect = ({ positionNo, deptNo, handleChange }) => {
    const [dept, setDept] = useState([]);
    const [position, setPosition] = useState([]);
    const [selectedDept, setSelectedDept] = useState(deptNo);
    const [selectedPosition, setSelectedPosition] = useState(positionNo);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/workly/dept-posi`)
            .then((response) => {
            setDept(response.data.department);
            setPosition(response.data.position);
        })
            .catch(() => alert("부서 정보 조회에 실패하였습니다."));
    }, []);
    useEffect(() => {
        setSelectedDept(deptNo);
        setSelectedPosition(positionNo);
    }, [deptNo, positionNo]);
    // value={selectedDept}
    return (_jsxs(_Fragment, { children: [_jsxs("select", { name: "deptNo", value: selectedDept, className: styles.input, onChange: handleChange, required: true, children: [_jsx("option", { value: "0", disabled: true, children: "\uBD80\uC11C\uBA85" }), dept.map(function (e, i) {
                        return (_jsx("option", { value: e.deptNo, children: e.deptName }, e.deptNo));
                    })] }), _jsxs("select", { name: "positionNo", value: selectedPosition, className: styles.input, onChange: handleChange, required: true, children: [_jsx("option", { value: "0", disabled: true, children: "\uC9C1\uAE09\uBA85" }), position.map(function (e, i) {
                        return (_jsx("option", { value: e.positionNo, children: e.positionName }, e.positionNo));
                    })] })] }));
};
export default DeptPositionSelect;
