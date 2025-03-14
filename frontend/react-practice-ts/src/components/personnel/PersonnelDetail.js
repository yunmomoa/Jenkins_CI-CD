import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import axios from '../../utils/CustomAxios';
import styles from '../../styles/personnel/PersonnelDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import defaultImg from "@/assets/Images/icon/default-profile.png";
import AddressForm from './AddressForm';
import DeptPositionSelect from './DeptPositionSelect';
const PersonnelDetail = () => {
    const [member, setMember] = useState({
        deptNo: 0,
        positionNo: 0,
        userNo: 0,
        userName: "",
        phone: "",
        address: "",
        addressDetail: "",
        email: "",
        extension: "",
        hireDate: "", // Date
        updateDate: "", // Date
        status: ""
    });
    const { userNo } = useParams();
    const [addressApi, setAddressApi] = useState("");
    const [profileImg, setProfileImg] = useState(null); // 프로필 이미지
    const [preview, setPreview] = useState(""); // 프로필 이미지 미리보기
    const fileInputRef = useRef(null);
    const url = "http://localhost:8003/workly/uploads/profile/";
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8003/workly/personnelDetail/" + userNo)
            .then((response) => {
            const r = response.data.member;
            console.log(r);
            setMember({
                deptNo: r.deptNo,
                positionNo: r.positionNo, //int
                userNo: Number(userNo),
                userName: r.userName,
                phone: r.phone,
                address: r.address,
                addressDetail: r.addressDetail,
                email: r.email,
                extension: r.extension,
                hireDate: new Date(r.hireDate).toISOString().split("T")[0],
                updateDate: r.updateDate === null ? "" : new Date(r.updateDate).toISOString().split("T")[0],
                status: r.status
            });
            setAddressApi(r.address);
            response.data.attachment === null ? setPreview("") : setPreview(url + response.data.attachment.changeName);
        })
            .catch((error) => {
            alert("사원 정보 조회에 실패하였습니다.");
            console.log(error);
        });
    }, []);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file.size > 3 * 1024 * 1024) {
            alert("최대 3MB의 파일까지 전송 가능합니다.");
            return;
        }
        setProfileImg(file);
        setPreview(URL.createObjectURL(file));
    };
    const handleFileCancle = (e) => {
        setPreview("");
        setProfileImg(null);
    };
    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
        console.log(member);
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const updateMember = {
            ...member,
            hireDate: new Date(member.hireDate).toISOString().split("T")[0], // 날짜 string -> Date로 변환
            address: addressApi
        };
        setMember(updateMember);
        const memberBlob = new Blob([JSON.stringify(updateMember)], { type: "application/json" });
        formData.append("member", memberBlob);
        if (profileImg) {
            formData.append("fileImg", profileImg);
        }
        await axios.put("http://localhost:8003/workly/memberUpdate", formData)
            .then(response => {
            navigate(`/personnel/${userNo}`);
            alert(response.data.msg);
        })
            .catch(error => {
            alert(error.data.msg);
        });
    };
    return (_jsx(_Fragment, { children: _jsxs("form", { className: styles.container, onSubmit: handleUpdate, children: [_jsxs("div", { className: styles.profileContainer, children: [_jsxs("div", { className: styles.image, children: [!preview && _jsx("img", { src: defaultImg, alt: "profile", onClick: handleImageClick, className: styles.profileImage }), preview && _jsx("img", { src: preview, alt: "preview", onClick: handleImageClick, className: styles.profileImage })] }), _jsx("label", { htmlFor: "uploadFile", children: _jsx("span", { className: styles.changeProfile, ref: fileInputRef, children: "\uD30C\uC77C \uC120\uD0DD" }) }), profileImg && _jsx("div", { children: _jsxs("span", { className: styles.cancleProfile, onClick: handleFileCancle, children: [profileImg.name, " \u00D7"] }) }), _jsx("input", { type: "file", id: "uploadFile", className: styles.inputProfile, onChange: handleFileChange })] }), _jsxs("div", { className: styles.formContainer, children: [_jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uBD80\uC11C / \uC9C1\uAE09" }), _jsx(DeptPositionSelect, { positionNo: member.positionNo, deptNo: member.deptNo, handleChange: handleChange }), _jsxs("select", { name: "status", value: member.status, className: styles.input, onChange: handleChange, required: true, children: [_jsx("option", { value: "0", disabled: true, children: "\uC0C1\uD0DC" }), _jsx("option", { value: "Y", children: "\uC7AC\uC9C1" }), _jsx("option", { value: "X", children: "\uD1F4\uC9C1" }), _jsx("option", { value: "Z", children: "\uD734\uC9C1" })] })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC0AC\uBC88" }), _jsx("input", { type: "text", value: userNo, name: "userNo", className: styles.input, onChange: handleChange, readOnly: true, required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC774\uB984" }), _jsx("input", { type: "text", name: "userName", value: member.userName, className: styles.input, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC5F0\uB77D\uCC98" }), _jsx("input", { type: "number", name: "phone", value: member.phone, className: styles.input, onChange: handleChange, placeholder: "\uC22B\uC790\uB9CC \uC785\uB825\uD574\uC8FC\uC138\uC694(- \uC81C\uC678)", required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC8FC\uC18C" }), _jsx("input", { type: "text", name: "address", value: addressApi, className: styles.input, onChange: handleChange, readOnly: true, required: true }), _jsx(AddressForm, { setAddressApi: setAddressApi })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label }), _jsx("input", { type: "text", value: member.addressDetail, name: "addressDetail", className: styles.input, placeholder: "\uC0C1\uC138 \uC8FC\uC18C", onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC774\uBA54\uC77C" }), _jsx("input", { type: "email", value: member.email, name: "email", className: styles.input, onChange: handleChange, required: true, pattern: "[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$" })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uB0B4\uC120\uBC88\uD638" }), _jsx("input", { type: "number", value: member.extension, name: "extension", className: styles.input, onChange: handleChange, placeholder: "\uC22B\uC790\uB9CC \uC785\uB825\uD574\uC8FC\uC138\uC694(- \uC81C\uC678)" })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC785\uC0AC\uC77C" }), _jsx("input", { type: "date", value: member.hireDate, name: "hireDate", className: styles.input, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC0C1\uD0DC\uBCC0\uACBD\uC77C" }), _jsx("input", { type: "date", value: member.updateDate, name: "updateDate", className: styles.input, onChange: handleChange })] }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { type: "submit", className: styles.submitButton, children: "\uC218\uC815" }), _jsx("button", { type: "button", className: styles.cancleButton, onClick: () => navigate("/personnel"), children: "\uCDE8\uC18C" })] })] })] }) }));
};
export default PersonnelDetail;
