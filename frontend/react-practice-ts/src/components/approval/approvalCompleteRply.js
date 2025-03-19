import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const ApprovalCompleteReply = () => {
    const userNo = useSelector((state) => state.user.userNo);
    const { approvalNo } = useParams(); // URL에서 approvalNo 가져오기
    const [approvalComments, setApprovalComments] = useState([]);
    const [error, setError] = useState(null);
    const [editingComment, setEditingComment] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    useEffect(() => {
        if (!approvalNo)
            return;
        axios.get(`${import.meta.env.VITE_API_URL}/workly/api/approval/getApprovalReply`, {
            params: {
                approvalNo: approvalNo,
                userNo: userNo
            }
        })
            .then((response) => {
            if (response.data && Array.isArray(response.data)) {
                setApprovalComments(response.data.sort((a, b) => a.MEMO_NO - b.MEMO_NO));
            }
            else {
                setApprovalComments([]);
            }
        })
            .catch((err) => {
            console.error("결재 의견 데이터 로드 실패:", err);
            setError("결재 의견을 불러오는 데 실패했습니다.");
        });
    }, [approvalNo]);
    const handleDelete = (memoNo) => {
        if (!window.confirm("정말 삭제하시겠습니까?"))
            return;
        axios
            .delete(`${import.meta.env.VITE_API_URL}/workly/api/approvalMemos/deleteApprovalReply`, {
            data: { memoNo },
        })
            .then((response) => {
            setApprovalComments(approvalComments.filter((c) => c.MEMO_NO !== memoNo));
        })
            .catch((err) => {
            console.error("삭제 실패:", err);
            alert("삭제에 실패했습니다.");
        });
    };
    const handleEdit = (memo) => {
        setEditingComment(memo.MEMO_NO);
        setEditedContent(memo.MEMO_CONTENT);
    };
    const handleSaveEdit = (memoNo) => {
        axios
            .put(`${import.meta.env.VITE_API_URL}/workly/api/approvalMemos/updateApprovalReply`, {
            memoNo,
            memoContent: editedContent,
        })
            .then(() => {
            setApprovalComments(approvalComments.map((c) => c.MEMO_NO === memoNo ? { ...c, MEMO_CONTENT: editedContent } : c));
            setEditingComment(null);
        })
            .catch((err) => {
            console.error("수정 실패:", err);
            alert("수정에 실패했습니다");
        });
    };
    return (_jsxs("div", { style: containerStyle, children: [_jsx("div", { style: titleStyle, children: "\uACB0\uC7AC \uC758\uACAC" }), _jsx("div", { style: dividerStyle }), approvalComments.length > 0 ? (approvalComments.map((comment, index) => (_jsxs("div", { style: commentContainerStyle, children: [_jsxs("div", { style: approverBoxStyle, children: [comment.DEPT_NAME, " / ", comment.USER_NAME, " ", comment.POSITION_NAME] }), editingComment === comment.MEMO_NO ? (_jsxs(_Fragment, { children: [_jsx("textarea", { value: editedContent, onChange: (e) => setEditedContent(e.target.value), style: editTextAreaStyle }), _jsxs("div", { style: buttonContainerStyle, children: [_jsx("button", { style: saveButtonStyle, onClick: () => handleSaveEdit(comment.MEMO_NO), children: "\uC800\uC7A5" }), _jsx("button", { style: cancelButtonStyle, onClick: () => setEditingComment(null), children: "\uCDE8\uC18C" })] })] })) : (_jsx("div", { style: commentTextStyle, children: comment.MEMO_CONTENT })), comment.USER_NO === userNo && (_jsxs("div", { style: buttonContainerStyle, children: [_jsx("button", { style: editButtonStyle, onClick: () => handleEdit(comment), children: "\uC218\uC815" }), _jsx("button", { style: deleteButtonStyle, onClick: () => handleDelete(comment.MEMO_NO), children: "\uC0AD\uC81C" })] })), index < approvalComments.length - 1 && _jsx("hr", { style: lineStyle })] }, index)))) : (_jsx("div", { style: noCommentsStyle, children: "\uB4F1\uB85D\uB41C \uACB0\uC7AC \uC758\uACAC\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." })), _jsx("div", { style: dividerStyle })] }));
};
// ✅ **스타일 정의**
const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    padding: "10px",
    width: "100%",
    maxWidth: "900px",
    background: "white",
    borderRadius: "8px",
    margin: "0 auto",
};
const titleStyle = {
    fontSize: "14px",
    fontWeight: "700",
    color: "#202224",
    marginBottom: "5px",
    marginTop: "5px",
};
const dividerStyle = {
    width: "100%",
    height: "1px",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    margin: "10px 0",
};
const commentContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
};
const approverBoxStyle = {
    display: "inline-block",
    backgroundColor: "white",
    border: "1px solid #A0C1FF",
    borderRadius: "5px",
    padding: "3px 8px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#4880FF",
    alignSelf: "flex-start",
};
const commentTextStyle = {
    fontSize: "12px",
    color: "#666",
};
const editTextAreaStyle = {
    width: "100%",
    height: "60px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    padding: "5px",
    fontSize: "12px",
    resize: "none",
};
const buttonContainerStyle = {
    display: "flex",
    gap: "5px",
    marginTop: "5px",
};
const editButtonStyle = {
    background: "#FFA500",
    color: "white",
    border: "none",
    padding: "5px 10px",
    fontSize: "12px",
    borderRadius: "4px",
    cursor: "pointer",
};
const deleteButtonStyle = {
    background: "#FF0000",
    color: "white",
    border: "none",
    padding: "5px 10px",
    fontSize: "12px",
    borderRadius: "4px",
    cursor: "pointer",
};
const saveButtonStyle = {
    background: "#4880FF",
    color: "white",
    border: "none",
    padding: "5px 10px",
    fontSize: "12px",
    borderRadius: "4px",
    cursor: "pointer",
};
const cancelButtonStyle = {
    background: "#888",
    color: "white",
    border: "none",
    padding: "5px 10px",
    fontSize: "12px",
    borderRadius: "4px",
    cursor: "pointer",
};
const noCommentsStyle = {
    fontSize: "12px",
    color: "#999",
    textAlign: "center",
    padding: "10px",
};
const lineStyle = {
    width: "100%",
    height: "1px",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    border: "none",
    margin: "10px 0",
};
export default ApprovalCompleteReply;
