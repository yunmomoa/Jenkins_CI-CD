import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import ChatContainer from "./components/chat/ChatContainer";
import ChatIconSearch from "./components/chat/ChatIconSearch";
import ChatMain from "./components/chat/ChatMain";
import SearchClick from "./components/chat/SearchClick";
import MemberInfo from "./components/chat/MemberInfo";
import "./Chat.css";
import InfoContainer from "./components/chat/InfoContainer";
import NoticeChat from "./components/chat/NoticeChat";
import MyInfo from "./components/chat/MyInfo";
import ChatNewList from "./components/chat/ChatNewList";
import ChatList from "./components/chat/ChatList";
import ChatCreate from "./components/chat/ChatCreate";
import SearchMember from "./components/chat/SearchMember";
import GroupChat from "./components/chat/GroupChat";
import OrgChart from "./components/chat/OrgChart";
import CreateOrg from "./components/chat/CreateOrg";
import { defaultMember } from "./type/chatType";
import Alarm from "./components/chat/Alarm";
import AddMemberPanel from "./components/chat/AddMemberPanel";
import axios from "axios";
import ChatModal from "./ChatModal";
const Chat = ({ currentUser, onClose }) => {
    const [chatMessages, setChatMessages] = useState([]);
    // ---------- 초기 메시지 isMine 여부 세팅 ----------
    useEffect(() => {
        console.log("📌 유저 변경 감지:", currentUser.userNo);
        setChatMessages((prevMessages = []) => prevMessages.map(msg => ({
            ...msg,
            isMine: Number(msg.userNo) === Number(currentUser.userNo),
        })));
    }, [currentUser.userNo]);
    // ---------- 여러 UI 상태 ----------
    const [isOpen, setIsOpen] = useState(true);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("비활성화");
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
    const [isFirstChatOpen, setIsFirstChatOpen] = useState(false);
    const [isChatListOpen, setIsChatListOpen] = useState(false);
    const [isCreatingChat, setIsCreatingChat] = useState(false);
    const [isSearchMemberOpen, setIsSearchMemberOpen] = useState(false);
    const [searchChatType, setSearchChatType] = useState("");
    const [searchRoomTitle, setsearchRoomTitle] = useState("");
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);
    const [isOrgOpen, setIsOrgOpen] = useState(false);
    const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [isAlarmListOpen, setIsAlarmListOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [chatList, setChatList] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [isAddMemberPanelOpen, setIsAddMemberPanelOpen] = useState(false);
    const [currentMembers, setCurrentMembers] = useState([]);
    // ---------- 공지방 or 일반방 (초기값 0번 방) ----------
    const [activeChatRoom, setActiveChatRoom] = useState({
        chatRoomNo: 0,
        roomTitle: "사내 공지 톡방",
        chatType: "NOTICE",
        bellSetting: "Y",
    });
    // ---------- 검색창 토글 ----------
    const toggleSearch = () => {
        setIsSearchVisible(prev => !prev);
    };
    // ---------- 프로필 클릭 ----------
    const handleProfileClick = (member) => {
        if (member.userNo === currentUser.userNo) {
            setIsMyInfoModalOpen(true); // 내 정보
        }
        else {
            setSelectedMember(member);
            setIsInfoModalOpen(true); // 다른사람 정보
        }
    };
    const closeInfoModal = () => {
        setIsInfoModalOpen(false);
        setSelectedMember(null);
    };
    // ---------- 채팅방 변경 ----------
    const handleRoomChange = (newRoom) => {
        setCurrentRoom(newRoom);
    };
    // ---------- 모달 전체 닫기 ----------
    const handleClose = () => {
        setIsOpen(false);
    };
    const closeMyInfoModal = () => setIsMyInfoModalOpen(false);
    // ---------- 사내공지 열기: selectedChatRoom을 0번으로 세팅 ----------
    const openNoticeChat = () => {
        setSelectedChatRoom({
            chatRoomNo: 0,
            roomTitle: "사내 공지 톡방",
            chatType: "NOTICE",
            bellSetting: "Y",
        });
    };
    // ---------- 채팅 탭 클릭 ----------
    const handleChatClick = () => {
        setIsInfoModalOpen(false);
        setIsMyInfoModalOpen(false);
        // 채팅방이 하나도 없으면 최초 채팅
        if (chatList.length === 0) {
            setIsFirstChatOpen(true);
            setIsChatListOpen(false);
        }
        else {
            setIsFirstChatOpen(false);
            setIsChatListOpen(true);
        }
        setIsCreatingChat(false);
        setIsSearchMemberOpen(false);
        setSelectedChatRoom(null);
        setIsOrgOpen(false);
        setIsCreateOrgOpen(false);
    };
    // ---------- 초대하기 (ChatCreate에서 호출) ----------
    const invitePeople = (chatType, roomTitle) => {
        console.log("Chat.tsx - invitePeople 실행됨!", chatType, roomTitle);
        setIsCreatingChat(false);
        setIsInfoModalOpen(false);
        setIsMyInfoModalOpen(false);
        setSelectedMember(null);
        setTimeout(() => {
            setIsSearchMemberOpen(true);
            setSearchChatType(chatType);
            setsearchRoomTitle(roomTitle);
        }, 0);
    };
    // ---------- 초대 완료 (SearchMember에서 호출) ----------
    const handleChatRoomComplete = (newChatRoom) => {
        setChatList(prev => [
            ...prev,
            {
                chatRoomNo: prev.length + 1,
                roomTitle: newChatRoom.roomTitle,
                chatType: newChatRoom.chatType,
                unreadCount: 0,
                isActive: true,
                bellSetting: "Y",
            },
        ]);
        setIsSearchMemberOpen(false);
        setIsChatListOpen(true);
    };
    // ---------- 왼쪽 프로필 아이콘 클릭 ----------
    const handleProfileClickIcon = () => {
        setIsInfoModalOpen(false);
        setIsMyInfoModalOpen(false);
        setIsFirstChatOpen(false);
        setIsChatListOpen(false);
        setIsCreatingChat(false);
        setIsSearchMemberOpen(false);
    };
    // ---------- 채팅방 열기 ----------
    const handleOpenChatRoom = (room) => {
        console.log(`${room.roomTitle} 채팅방 열림!`);
        setSelectedChatRoom(room);
    };
    // ---------- 조직도 열기 ----------
    const handleOpenOrg = () => {
        setIsInfoModalOpen(false);
        setIsMyInfoModalOpen(false);
        setIsFirstChatOpen(false);
        setIsChatListOpen(false);
        setIsCreatingChat(false);
        setIsSearchMemberOpen(false);
        setSelectedChatRoom(null);
        setIsOrgOpen(true);
        setIsCreateOrgOpen(false);
    };
    // ---------- 알림 패널 열기 ----------
    const handleAlarmClick = () => {
        setIsInfoModalOpen(false);
        setIsMyInfoModalOpen(false);
        setIsFirstChatOpen(false);
        setIsChatListOpen(false);
        setIsCreatingChat(false);
        setIsSearchMemberOpen(false);
        setSelectedChatRoom(null);
        setIsOrgOpen(false);
        setIsCreateOrgOpen(false);
        setIsAlarmListOpen(true);
    };
    // ---------- 벨 세팅 ----------
    const onToggleAlarm = (chatRoomNo, bellSetting) => {
        const validBellSetting = bellSetting === "Y" || bellSetting === "N" ? bellSetting : "N";
        setChatList(prev => prev.map(room => room.chatRoomNo === chatRoomNo ? { ...room, bellSetting: validBellSetting } : room));
    };
    // ---------- 특정 방의 멤버 목록 가져오기 ----------
    useEffect(() => {
        if (selectedChatRoom) {
            fetchChatMembers(selectedChatRoom.chatRoomNo);
        }
    }, [selectedChatRoom]);
    const fetchChatMembers = async (chatRoomNo) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/workly/api/chat/members/${chatRoomNo}`);
            setCurrentMembers(response.data);
        }
        catch (error) {
            console.error("❌ 채팅방 멤버 불러오기 실패", error);
        }
    };
    // ---------- chatList를 로컬스토리지에서 불러오기 ----------
    useEffect(() => {
        const savedChatList = localStorage.getItem("chatList");
        if (savedChatList) {
            setChatList(JSON.parse(savedChatList));
        }
    }, []);
    // ---------- chatList 변경 시 로컬스토리지 저장 ----------
    useEffect(() => {
        localStorage.setItem("chatList", JSON.stringify(chatList));
    }, [chatList]);
    if (!isOpen)
        return null;
    return (_jsx(ChatModal, { isOpen: isOpen, onClose: handleClose, children: isSearchMemberOpen ? (_jsx(SearchMember, { chatType: searchChatType, roomTitle: searchRoomTitle, member: selectedMember ?? defaultMember, onComplete: handleChatRoomComplete })) : /** 2) 내 정보 모달 */
            isMyInfoModalOpen ? (_jsx(InfoContainer, { children: _jsx(MyInfo, { myinfo: currentUser, onClose: closeMyInfoModal }) })) : /** 3) 채팅방이 선택된 경우 */
                selectedChatRoom ? (selectedChatRoom.chatRoomNo === 0 ? (
                // ---------- 3-A) 사내 공지 톡방 ----------
                _jsx(NoticeChat, { onClose: () => {
                        // 닫으면 목록으로 복귀
                        setSelectedChatRoom(null);
                        setIsChatListOpen(true);
                    } })) : (
                // ---------- 3-B) 일반 그룹 채팅 ----------
                _jsxs(_Fragment, { children: [_jsx(GroupChat, { room: selectedChatRoom, currentUser: currentUser, messages: chatMessages, onClose: () => {
                                setSelectedChatRoom(null);
                                setIsChatListOpen(true);
                            }, onToggleAlarm: onToggleAlarm, currentMembers: currentMembers, onChangeRoom: handleRoomChange, setIsAddMemberPanelOpen: setIsAddMemberPanelOpen }), isAddMemberPanelOpen && (_jsx(AddMemberPanel, { allEmployees: [], currentMembers: currentMembers, room: selectedChatRoom, onClose: () => setIsAddMemberPanelOpen(false), onConfirm: newMembers => {
                                console.log("✅ 멤버 추가됨:", newMembers);
                                setCurrentMembers([...currentMembers, ...newMembers]);
                                setIsAddMemberPanelOpen(false);
                            } }))] }))) : /** 4) 다른 사람 정보 모달 */
                    isInfoModalOpen ? (_jsx(InfoContainer, { children: _jsx(MemberInfo, { member: selectedMember ?? defaultMember, onClose: closeInfoModal }) })) : /** 5) 부서 생성 */
                        isCreateOrgOpen ? (_jsx(CreateOrg, { onClose: () => setIsCreateOrgOpen(false), onComplete: dept => {
                                console.log(`${dept.deptName} 부서 생성됨, 멤버:`, dept.members);
                                setDepartments(prev => [...prev, dept]);
                                setIsCreateOrgOpen(false);
                                setIsOrgOpen(true);
                            } })) : /** 6) 조직도 열림 */
                            isOrgOpen ? (_jsx(ChatContainer, { onClose: () => setIsOpen(false), onChatClick: handleChatClick, onProfileClick: handleProfileClickIcon, onOrgClick: handleOpenOrg, OnAlarmClick: handleAlarmClick, children: _jsx(OrgChart, { departments: departments, onOpenCreateOrg: () => {
                                        setIsOrgOpen(false);
                                        setIsCreateOrgOpen(true);
                                    } }) })) : /** 7) 채팅방이 0개일 때 */
                                isFirstChatOpen ? (_jsx(ChatContainer, { onClose: () => setIsOpen(false), onChatClick: handleChatClick, onProfileClick: handleProfileClickIcon, OnAlarmClick: handleAlarmClick, onOrgClick: handleOpenOrg, children: _jsx(ChatNewList, { setIsCreatingChat: setIsCreatingChat, setIsFirstChatOpen: setIsFirstChatOpen }) })) : /** 8) 새 채팅 생성중 */
                                    isCreatingChat ? (_jsx(ChatCreate, { invitePeople: invitePeople, onClose: () => setIsCreatingChat(false) })) : /** 9) 채팅방 목록 */
                                        isChatListOpen ? (_jsx(ChatContainer, { onClose: () => setIsOpen(false), onOrgClick: handleOpenOrg, OnAlarmClick: handleAlarmClick, onProfileClick: handleProfileClickIcon, children: _jsx(ChatList, { chatRooms: chatList, setChatList: setChatList, setIsCreatingChat: setIsCreatingChat, setIsFirstChatOpen: setIsFirstChatOpen, 
                                                // 사내 공지 버튼 클릭 시, roomNo=0 방을 선택
                                                openNoticeChat: () => setSelectedChatRoom({
                                                    chatRoomNo: 0,
                                                    roomTitle: "사내 공지 톡방",
                                                    chatType: "NOTICE",
                                                    bellSetting: "Y",
                                                }), openChatRoom: room => handleOpenChatRoom({ ...room, bellSetting: "Y" }) }) })) : /** 10) 알림창 */
                                            isAlarmListOpen ? (_jsx(ChatContainer, { onClose: () => setIsOpen(false), onChatClick: handleChatClick, onProfileClick: handleProfileClickIcon, onOrgClick: handleOpenOrg, OnAlarmClick: handleAlarmClick, children: _jsx(Alarm, { chatRooms: chatList, setChatList: setChatList, onNoticeClick: openNoticeChat }) })) : (
                                            /** 11) 기본 화면 (ChatMain) */
                                            _jsxs(ChatContainer, { onClose: () => setIsOpen(false), onOrgClick: handleOpenOrg, OnAlarmClick: handleAlarmClick, onChatClick: handleChatClick, onProfileClick: handleProfileClickIcon, children: [_jsx("button", { className: "chat-close-button", onClick: () => setIsOpen(false), style: { position: "absolute", top: "10px", right: "10px", zIndex: 10 }, children: "\u00D7" }), _jsxs("div", { className: "chat-containerContent", children: [_jsx("div", { className: "chat-search-section", children: _jsx("div", { onClick: toggleSearch, style: { cursor: "pointer" }, children: _jsx(ChatIconSearch, {}) }) }), isSearchVisible && _jsx(SearchClick, { onProfileClick: handleProfileClick }), _jsx(ChatMain, { selectedStatus: selectedStatus, setSelectedStatus: setSelectedStatus, onProfileClick: handleProfileClick, 
                                                                // 공지방 열기
                                                                onNoticeClick: () => setSelectedChatRoom({
                                                                    chatRoomNo: 0,
                                                                    roomTitle: "사내 공지 톡방",
                                                                    chatType: "NOTICE",
                                                                    bellSetting: "Y",
                                                                }) })] })] })) }));
};
export default Chat;
