import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axios from "axios";
import profileBig from "../../assets/images/chat/profileBig.png";
import chatBig from "../../assets/images/chat/chatBig.png";
import bell from "../../assets/images/chat/bell.png";
import starBig from "../../assets/images/chat/starBig.png";
import { defaultMember } from "../../type/chatType";
const MemberInfo = ({ member = defaultMember, onClose }) => {
    const [profileImage, setProfileImage] = useState(profileBig);
    // ✅ 선택한 멤버의 프로필 이미지 가져오기
    const fetchMemberProfile = async () => {
        if (!member || !member.userNo)
            return;
        try {
            const response = await axios.get(`http://localhost:8003/workly/api/user/profile/${member.userNo}`);
            console.log(`📌 ${member.userName}의 프로필 이미지:`, response.data.profileImg);
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
            console.error(`❌ ${member.userName}의 프로필 이미지 불러오기 실패:`, error);
            setProfileImage(profileBig);
        }
    };
    // ✅ 멤버 변경될 때마다 프로필 이미지 업데이트
    useEffect(() => {
        fetchMemberProfile();
    }, [member?.userNo]);
    return (_jsxs("div", { className: "meminfo", style: {
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
                }, children: "\u2190" }), _jsx("div", { className: "meminfo-profile", style: {
                    display: "flex",
                    alignItems: "center",
                    marginTop: 10,
                    paddingLeft: 55,
                }, children: _jsx("img", { style: { width: 130, height: 130, borderRadius: "50%" }, src: profileImage, alt: "profile", onError: (e) => (e.currentTarget.src = profileBig) }) }), _jsx("div", { style: { marginTop: 20, paddingLeft: 0, paddingRight: 16 }, children: [
                    { label: "이름", value: member.userName },
                    { label: "부서", value: member.deptName },
                    { label: "직급", value: member.positionName },
                    { label: "이메일", value: member.email },
                    { label: "연락처", value: member.phone },
                    { label: "내선번호", value: member.extension },
                ].map((item, index) => (_jsxs("div", { style: { display: "flex", marginBottom: 13 }, children: [_jsx("div", { style: {
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
                    marginLeft: "10px",
                    position: "relative",
                }, children: [_jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [_jsx("img", { className: "chatBig", style: { width: 28, height: 28 }, src: chatBig, alt: "chat icon" }), _jsx("span", { style: {
                                    fontSize: "14px",
                                    fontFamily: "Inter",
                                    fontWeight: "600",
                                    marginTop: "4px",
                                }, children: "1:1 \uCC44\uD305" })] }), _jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [_jsx("img", { className: "bellBig", style: { width: 28, height: 28 }, src: bell, alt: "alarm icon" }), _jsx("span", { style: {
                                    fontSize: "14px",
                                    fontFamily: "Inter",
                                    fontWeight: "600",
                                    marginTop: "4px",
                                }, children: "\uC54C\uB9BC \uC124\uC815" })] }), _jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [_jsx("img", { className: "starBig", style: { width: 28, height: 28 }, src: starBig, alt: "favorite icon" }), _jsx("span", { style: {
                                    fontSize: "14px",
                                    fontFamily: "Inter",
                                    fontWeight: "600",
                                    marginTop: "4px",
                                }, children: "\uC990\uACA8\uCC3E\uAE30" })] })] })] }));
};
export default MemberInfo;
