import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import profileBig from "../../assets/images/chat/profileBig.png";
import chatBig from "../../assets/images/chat/chatBig.png";
import edit from "../../assets/images/chat/edit.png";
import axios from "axios";
const MyInfo = ({ myinfo, onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [profileImage, setProfileImage] = useState(profileBig);
    // ✅ 서버에서 프로필 이미지 가져오기
    const fetchProfileImage = async () => {
        try {
            const response = await axios.get(`http://localhost:8003/workly/api/user/profile/${myinfo.userNo}`);
            console.log("📌 서버에서 받은 프로필 이미지:", response.data.profileImg);
            if (response.data.profileImg) {
                const imageUrl = response.data.profileImg.startsWith("http")
                    ? response.data.profileImg
                    : new URL(response.data.profileImg, "http://localhost:8003").href;
                setProfileImage(imageUrl);
            }
            else {
                setProfileImage(profileBig);
            }
        }
        catch (error) {
            console.error("❌ 프로필 이미지 불러오기 실패:", error);
            setProfileImage(profileBig);
        }
    };
    // ✅ 처음 렌더링될 때 DB에서 프로필 이미지 가져오기 (새로고침해도 유지됨)
    useEffect(() => {
        fetchProfileImage();
    }, [myinfo.userNo]);
    // ✅ 파일 선택 핸들러
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };
    // ✅ 프로필 이미지 업로드 핸들러
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("변경할 이미지를 선택하세요.");
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("userNo", myinfo.userNo.toString());
        try {
            const response = await axios.post("http://localhost:8003/workly/api/user/uploadProfile", formData);
            console.log("📌 서버 응답:", response.data);
            if (response.data.profileImg) {
                setProfileImage(new URL(response.data.profileImg, "http://localhost:8003").href);
                alert("프로필 이미지가 변경되었습니다.");
            }
        }
        catch (error) {
            console.error("❌ 프로필 이미지 업로드 실패:", error);
            alert("프로필 이미지 업로드에 실패했습니다.");
        }
    };
    return (_jsxs("div", { className: "myinfo", style: {
            width: 300,
            height: 500,
            backgroundColor: "white",
            paddingBottom: 10,
            marginLeft: "-10px",
            position: "relative",
        }, children: [_jsx("button", { onClick: onClose, style: {
                    position: "absolute",
                    top: -30,
                    right: 5,
                    background: "transparent",
                    border: "none",
                    fontSize: 18,
                    cursor: "pointer",
                }, children: "\u2190" }), _jsxs("div", { className: "meminfo-profile", style: {
                    display: "flex",
                    alignItems: "center",
                    marginTop: 10,
                    paddingLeft: 55,
                }, children: [_jsx("label", { htmlFor: "profile-upload", style: { cursor: "pointer" }, children: _jsx("img", { style: { width: 130, height: 130, borderRadius: "50%" }, src: profileImage, alt: "profile", onError: (e) => {
                                e.currentTarget.src = profileBig;
                            } }) }), _jsx("input", { id: "profile-upload", type: "file", accept: "image/*", style: { display: "none" }, onChange: handleFileChange })] }), _jsx("div", { style: { marginTop: 20, paddingLeft: 0, paddingRight: 16 }, children: [
                    { label: "이름", value: myinfo.userName },
                    { label: "부서", value: myinfo.deptName },
                    { label: "직급", value: myinfo.positionName },
                    { label: "이메일", value: myinfo.email },
                    { label: "연락처", value: myinfo.phone },
                    { label: "내선번호", value: myinfo.extension },
                ].map((item, index) => (_jsxs("div", { style: { display: "flex", marginBottom: 15 }, children: [_jsx("div", { style: {
                                width: 90,
                                color: "#979797",
                                fontSize: 18,
                                fontWeight: "600",
                                fontFamily: "Inter",
                            }, children: item.label }), _jsx("div", { style: {
                                color: "#202224",
                                fontSize: 18,
                                fontWeight: "600",
                                fontFamily: "Inter",
                            }, children: item.value })] }, index))) }), _jsxs("div", { style: {
                    display: "flex",
                    gap: "35px",
                    paddingTop: "10px",
                    marginLeft: "40px",
                    position: "relative",
                }, children: [_jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [_jsx("img", { className: "chatBig", style: { width: 28, height: 28 }, src: chatBig, alt: "chat icon" }), _jsx("span", { style: {
                                    fontSize: "14px",
                                    fontFamily: "Inter",
                                    fontWeight: "600",
                                    marginTop: "4px",
                                }, children: "1:1 \uCC44\uD305" })] }), _jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, onClick: handleUpload, children: [_jsx("img", { className: "edit", style: { width: 28, height: 28 }, src: edit, alt: "edit icon" }), _jsx("span", { style: {
                                    fontSize: "14px",
                                    fontFamily: "Inter",
                                    fontWeight: "600",
                                    marginTop: "4px",
                                }, children: "\uC774\uBBF8\uC9C0 \uC800\uC7A5" })] })] })] }));
};
export default MyInfo;
