import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/myPage/MyInfomation.module.css';
import { useNavigate } from 'react-router-dom';
import defaultImg from "@/assets/images/icon/profile.png";
import axios from '../../utils/CustomAxios';
import { useSelector } from 'react-redux';
import AddressForm from '../personnel/AddressForm';
import ChangePwdModal from './ChangePwdModal';

const MyInfomation = () => {
    let user = useSelector((state) => {
        return state.user;
    });
    const [openModal, setOpenModal] = useState(false);
    const [member, setMember] = useState({
        deptNo: 0,
        positionNo: 0,
        userNo: user.userNo,
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
    const [addressApi, setAddressApi] = useState("");
    const [profileImg, setProfileImg] = useState(null); // 프로필 이미지
    const [preview, setPreview] = useState(""); // 프로필 이미지 미리보기
    const fileInputRef = useRef(null);
    const url = `${import.meta.env.VITE_API_URL}/workly/uploads/profile/`;
    const navigate = useNavigate();
    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const handleFileCancle = (e) => {
        setPreview("");
        setProfileImg(null);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file.size > 3 * 1024 * 1024) {
            alert("최대 3MB의 파일까지 전송 가능합니다.");
            return;
        }
        setProfileImg(file);
        setPreview(URL.createObjectURL(file));
    };
    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
        console.log(member);
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (confirm("내 정보를 수정하시겠습니까?")) {
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
            await axios.put(`${import.meta.env.VITE_API_URL}/workly/memberUpdate`, formData)
                .then(response => {
                console.log(response);
                navigate("/myPage");
                alert(response.data.msg);
            })
                .catch(error => {
                alert(error.data.msg);
            });
        }
        return;
    };
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/workly/personnelDetail/` + member.userNo)
            .then((response) => {
            const r = response.data.member;
            setMember({
                deptNo: r.deptNo,
                positionNo: r.positionNo, //int
                userNo: Number(member.userNo),
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
    }, [member.userNo]);
    return (_jsxs(_Fragment, { children: [openModal &&
                _jsx(ChangePwdModal, { setOpenModal: setOpenModal }), _jsxs("form", { className: styles.container, onSubmit: handleUpdate, children: [_jsxs("div", { className: styles.mainSection, children: [_jsxs("div", { className: styles.leftSection, children: [_jsxs("div", { className: styles.profileContainer, children: [_jsxs("div", { className: styles.image, children: [!preview && _jsx("img", { src: defaultImg, alt: "profile", onClick: handleImageClick, className: styles.profileImage }), preview && _jsx("img", { src: preview, alt: "preview", onClick: handleImageClick, className: styles.profileImage })] }), _jsx("label", { htmlFor: "uploadFile", children: _jsx("span", { className: styles.changeProfile, ref: fileInputRef, children: "\uD504\uB85C\uD544 \uBCC0\uACBD" }) }), profileImg && _jsx("div", { children: _jsxs("span", { className: styles.cancleProfile, onClick: handleFileCancle, children: [profileImg.name, " \u00D7"] }) }), _jsx("input", { type: "file", id: "uploadFile", className: styles.inputProfile, onChange: handleFileChange })] }), _jsx("div", { className: styles.fixedInfoContainer, children: _jsx("table", { className: styles.profileInfo, children: _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("th", { children: "\uC0AC\uBC88" }), _jsx("td", { children: member.userNo })] }), _jsxs("tr", { children: [_jsx("th", { children: "\uBD80\uC11C" }), _jsxs("td", { children: [user.deptName, "  "] })] }), _jsxs("tr", { children: [_jsx("th", { children: "\uC774\uB984/\uC9C1\uAE09" }), _jsxs("td", { children: [user.userName, " / ", user.positionName] })] }), _jsxs("tr", { children: [_jsx("th", { children: "\uC785\uC0AC\uC77C" }), _jsx("td", { children: member.hireDate })] })] }) }) })] }), _jsx("div", { className: styles.rightSection, children: _jsxs("div", { className: styles.formContainer, children: [_jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC5F0\uB77D\uCC98" }), _jsx("input", { type: "number", name: "phone", value: member.phone, className: styles.input, onChange: handleChange, placeholder: "\uC22B\uC790\uB9CC \uC785\uB825\uD574\uC8FC\uC138\uC694(- \uC81C\uC678)", required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC8FC\uC18C" }), _jsx("input", { type: "text", name: "address", value: addressApi, className: styles.input, onChange: handleChange, readOnly: true, required: true }), _jsx(AddressForm, { setAddressApi: setAddressApi })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label }), _jsx("input", { type: "text", value: member.addressDetail, name: "addressDetail", className: styles.input, onChange: handleChange, placeholder: "\uC0C1\uC138 \uC8FC\uC18C", required: true })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uC774\uBA54\uC77C" }), _jsx("input", { type: "email", value: member.email, name: "email", className: styles.input, onChange: handleChange, required: true, pattern: "[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$" })] }), _jsxs("div", { className: styles.row, children: [_jsx("label", { className: styles.label, children: "\uB0B4\uC120\uBC88\uD638" }), _jsx("input", { type: "number", value: member.extension, name: "extension", className: styles.input, onChange: handleChange, placeholder: "\uC22B\uC790\uB9CC \uC785\uB825\uD574\uC8FC\uC138\uC694(- \uC81C\uC678)" })] }), _jsx("div", { className: styles.chagnePwd, style: { cursor: "pointer" }, onClick: () => setOpenModal(true), children: "\uBE44\uBC00\uBC88\uD638 \uBCC0\uACBD" })] }) })] }), _jsx("div", { className: styles.submitSection, children: _jsx("button", { className: styles.submitButton, style: { cursor: "pointer" }, onClick: () => handleUpdate, children: "\uC815\uBCF4 \uBCC0\uACBD" }) })] })] }));
};

export default MyInfomation;
