import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import styles from "./CompanyEnroll.module.css";
import defaultImg from "../../assets/images/icon/default-profile.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeptPositionSelect from "../personnel/DeptPositionSelect";
import AddressForm from "../personnel/AddressForm";
const CompanyEnroll = () => {
    const [company, setCompany] = useState({
        companyName: "",
        companyNum: "",
    });
    const [member, setMember] = useState({
        deptNo: 2,
        positionNo: 0,
        userName: "",
        userPwd: "",
        phone: "",
        address: "",
        addressDetail: "",
        email: "",
        extension: "",
        hireDate: "",
        companyId: null, // ✅ 회사 ID 저장
    });
    const [addressApi, setAddressApi] = useState("");
    const [profileImg, setProfileImg] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
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
        fileInputRef.current.click();
    };
    // ✅ 회사 정보 입력 핸들러
    const handleCompanyChange = (e) => {
        setCompany({
            ...company,
            [e.target.name]: e.target.value,
        });
    };
    // ✅ 멤버 정보 입력 핸들러
    const handleChange = (e) => {
        setMember({
            ...member,
            [e.target.name]: e.target.value,
        });
    };
    // ✅ 회사 정보 등록 함수 (1)
    const submitCompanyInfo = async () => {
        console.log("전송하는 데이터:", company);
        try {
            const response = await axios.post("http://localhost:8003/workly/api/policies/enroll", company);
            console.log("백엔드 전체 응답:", response);
            console.log("백엔드 응답 데이터:", response.data);
            console.log("백엔드 응답의 companyId:", response.data?.companyId);
            return response.data.companyId; // 회사 ID 반환
        }
        catch (error) {
            alert(error.response?.data?.msg || "회사 정보 등록 실패");
            throw new Error("회사 등록 실패");
        }
    };
    // ✅ 멤버 정보 등록 함수 (2)
    const submitMemberInfo = async (companyId) => {
        console.log("전송되는 companyId:", companyId);
        const formData = new FormData();
        const updateMember = {
            ...member,
            hireDate: new Date(member.hireDate).toISOString().split("T")[0],
            address: addressApi,
            companyId: companyId, // ✅ 회사 ID 추가
        };
        console.log("전송되는 멤버 데이터:", updateMember); // ✅ 로그 추가
        const memberBlob = new Blob([JSON.stringify(updateMember)], { type: "application/json" });
        formData.append("member", memberBlob);
        if (profileImg) {
            formData.append("fileImg", profileImg);
        }
        await axios.post("http://localhost:8003/workly/enroll", formData)
            .then(response => {
            navigate("/");
            alert(response.data.msg);
        })
            .catch(error => {
            alert(error.response?.data?.msg || "멤버 정보 등록 실패");
        });
    };
    // ✅ 최종 등록 함수
    const handleInsert = async (e) => {
        e.preventDefault();
        try {
            // 1️⃣ 회사 정보 먼저 등록
            const companyId = await submitCompanyInfo();
            console.log("생성된 companyId:", companyId);
            // // 2️⃣ 멤버 정보에 companyId 설정
            // setMember((prevMember) => ({
            //     ...prevMember,
            //     companyId: companyId,
            // }));
            // 3️⃣ 멤버 등록 진행
            await submitMemberInfo(companyId);
        }
        catch (error) {
            console.error(error);
        }
    };
    return (_jsxs("div", { className: styles.pageWrapper, children: [_jsx("h1", { className: styles.title, children: "\uBC95\uC778 \uD68C\uC6D0\uAC00\uC785" }), _jsx("form", { className: styles.container, onSubmit: handleInsert, children: _jsxs("div", { className: styles.formWrapper, children: [_jsxs("div", { className: styles.profileContainer, children: [_jsxs("div", { children: [!preview && _jsx("img", { src: defaultImg, alt: "profile", onClick: handleImageClick, className: styles.profileImage }), preview && _jsx("img", { src: preview, alt: "preview", onClick: handleImageClick, className: styles.profileImage })] }), _jsx("label", { htmlFor: "uploadFile", children: _jsx("span", { className: styles.changeProfile, ref: fileInputRef, children: "\uD30C\uC77C \uC120\uD0DD" }) }), profileImg && _jsx("div", { children: _jsxs("span", { className: styles.cancleProfile, onClick: handleFileCancle, children: [profileImg.name, " \u00D7"] }) }), _jsx("input", { type: "file", id: "uploadFile", className: styles.inputProfile, onChange: handleFileChange })] }), _jsxs("div", { className: styles.formContainer, children: [_jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uD68C\uC0AC \uC774\uB984" }), _jsx("input", { type: "text", name: "companyName", className: styles.input, onChange: handleCompanyChange, required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC0AC\uC5C5\uC790 \uBC88\uD638" }), _jsx("input", { type: "text", name: "companyNum", className: styles.input, onChange: handleCompanyChange, required: true, placeholder: "\uC22B\uC790\uB9CC \uC785\uB825\uD574\uC8FC\uC138\uC694(- \uC81C\uC678)" })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uAD00\uB9AC\uC790 \uBD80\uC11C / \uC9C1\uAE09" }), _jsx(DeptPositionSelect, { positionNo: member.positionNo, deptNo: 2, handleChange: handleChange })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uAD00\uB9AC\uC790 \uC774\uB984" }), _jsx("input", { type: "text", name: "userName", className: styles.input, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uBE44\uBC00\uBC88\uD638" }), _jsx("input", { type: "password", name: "userPwd", className: styles.input, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uAD00\uB9AC\uC790 \uC5F0\uB77D\uCC98" }), _jsx("input", { type: "number", name: "phone", className: styles.input, onChange: handleChange, placeholder: "\uC22B\uC790\uB9CC \uC785\uB825\uD574\uC8FC\uC138\uC694(- \uC81C\uC678)", required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uD68C\uC0AC \uC8FC\uC18C" }), _jsx("input", { type: "text", name: "address", value: addressApi, className: styles.input, onChange: handleChange, readOnly: true, required: true }), _jsx(AddressForm, { setAddressApi: setAddressApi })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label }), _jsx("input", { type: "text", name: "addressDetail", className: styles.input, placeholder: "\uC0C1\uC138 \uC8FC\uC18C", onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uAD00\uB9AC\uC790 \uC774\uBA54\uC77C" }), _jsx("input", { type: "email", name: "email", className: styles.input, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uAD00\uB9AC\uC790 \uB0B4\uC120\uBC88\uD638" }), _jsx("input", { type: "number", name: "extension", className: styles.input, onChange: handleChange, placeholder: "\uC22B\uC790\uB9CC \uC785\uB825\uD574\uC8FC\uC138\uC694(- \uC81C\uC678)" })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC785\uC0AC\uC77C" }), _jsx("input", { type: "date", name: "hireDate", className: styles.input, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { type: "submit", className: styles.submitButton, children: "\uC0DD\uC131" }), _jsx("button", { type: "button", className: styles.cancleButton, onClick: () => navigate("/CompanyEnrollPage"), children: "\uCDE8\uC18C" })] })] })] }) })] }));
};
export default CompanyEnroll;
