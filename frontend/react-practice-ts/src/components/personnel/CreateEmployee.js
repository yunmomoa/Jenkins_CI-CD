import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import styles from "../../styles/personnel/CreateEmployee.module.css";
import defaultImg from "@/assets/Images/icon/default-profile.png";
import axios from "../../utils/CustomAxios";
import { useNavigate } from "react-router-dom";
import AddressForm from "./AddressForm";
import DeptPositionSelect from "./DeptPositionSelect";
import { useSelector } from "react-redux";
const CreateEmployee = () => {
    const [member, setMember] = useState({
        deptNo: 0, // int
        positionNo: 0, //int
        userName: "",
        userPwd: "",
        phone: "",
        address: "",
        addressDetail: "",
        email: "",
        extension: "",
        hireDate: "", // Date
    });
    const [addressApi, setAddressApi] = useState("");
    const [profileImg, setProfileImg] = useState(null); // 프로필 이미지
    const [preview, setPreview] = useState(null); // 프로필 이미지 미리보기
    const fileInputRef = useRef(null);
    const companyId = useSelector((state) => state.user.companyId);
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file.size > 3 * 1024 * 1024) {
            alert("최대 3MB의 파일까지 전송 가능합니다.");
            return;
        }
        setProfileImg(file);
        setPreview(URL.createObjectURL(file));
    };
    const handleFileCancle = () => {
        setPreview(null);
        setProfileImg(null);
    };
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    const handleChange = (e) => {
        setMember({
            ...member,
            [e.target.name]: e.target.value
        });
        console.log(member);
    };
    const handleInsert = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const updateMember = {
            ...member,
            companyId: companyId,
            hireDate: new Date(member.hireDate).toISOString().split("T")[0], // 날짜 string -> Date로 변환
            address: addressApi,
        };
        setMember(updateMember);
        const memberBlob = new Blob([JSON.stringify(updateMember)], { type: "application/json" });
        formData.append("member", memberBlob);
        if (profileImg) {
            formData.append("fileImg", profileImg);
        }
        await axios.post("http://localhost:8003/workly/enroll", formData)
            .then(response => {
            navigate("/personnel");
            console.log("등록 성공");
            alert(response.data.msg);
        })
            .catch(error => {
            navigate("/personnel");
            console.log("등록 실패");
            alert(error.response.data.msg);
        });
    };
    return (_jsxs("form", { className: styles.container, onSubmit: handleInsert, children: [_jsxs("div", { className: styles.profileContainer, children: [_jsxs("div", { children: [!preview && _jsx("img", { src: defaultImg, alt: "profile", onClick: handleImageClick, className: styles.profileImage }), preview && _jsx("img", { src: preview, alt: "preview", onClick: handleImageClick, className: styles.profileImage })] }), _jsx("label", { htmlFor: "uploadFile", children: _jsx("span", { className: styles.changeProfile, ref: fileInputRef, children: "\uD30C\uC77C \uC120\uD0DD" }) }), profileImg && _jsx("div", { children: _jsxs("span", { className: styles.cancleProfile, onClick: handleFileCancle, children: [profileImg.name, " \u00D7"] }) }), _jsx("input", { type: "file", id: "uploadFile", className: styles.inputProfile, onChange: handleFileChange })] }), _jsxs("div", { className: styles.formContainer, children: [_jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uBD80\uC11C / \uC9C1\uAE09" }), _jsx(DeptPositionSelect, { positionNo: member.positionNo, deptNo: member.deptNo, handleChange: handleChange })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC774\uB984" }), _jsx("input", { type: "text", name: "userName", className: styles.input, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uBE44\uBC00\uBC88\uD638" }), _jsx("input", { type: "password", name: "userPwd", className: styles.input, required: true, onChange: handleChange, pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,20}$", placeholder: "\uC601\uBB38, \uC22B\uC790, \uD2B9\uC218\uBB38\uC790 \uD3EC\uD568 8~20\uC790 \uC785\uB825" })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC5F0\uB77D\uCC98" }), _jsx("input", { type: "number", name: "phone", className: styles.input, onChange: handleChange, placeholder: "\uC22B\uC790\uB9CC \uC785\uB825\uD574\uC8FC\uC138\uC694(- \uC81C\uC678)", required: true, pattern: "^01(0|1|[6-9])[0-9]{3,4}[0-9]{4}$" })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC8FC\uC18C" }), _jsx("input", { type: "text", name: "address", value: addressApi, className: styles.input, onChange: handleChange, readOnly: true, required: true }), _jsx(AddressForm, { setAddressApi: setAddressApi })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label }), _jsx("input", { type: "text", name: "addressDetail", className: styles.input, placeholder: "\uC0C1\uC138 \uC8FC\uC18C", onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC774\uBA54\uC77C" }), _jsx("input", { type: "email", name: "email", className: styles.input, onChange: handleChange, required: true, pattern: "[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$" })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uB0B4\uC120\uBC88\uD638" }), _jsx("input", { type: "number", name: "extension", className: styles.input, onChange: handleChange, placeholder: "\uC22B\uC790\uB9CC \uC785\uB825\uD574\uC8FC\uC138\uC694(- \uC81C\uC678)" })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC785\uC0AC\uC77C" }), _jsx("input", { type: "date", name: "hireDate", className: styles.input, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { type: "submit", className: styles.submitButton, children: "\uC0DD\uC131" }), _jsx("button", { type: "button", className: styles.cancleButton, onClick: () => navigate("/personnel"), children: "\uCDE8\uC18C" })] })] })] }));
};
export default CreateEmployee;
