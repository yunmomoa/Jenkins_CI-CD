import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const AdminPolicyManager = () => {
    const companyId = useSelector((state) => state.user.companyId);
    const [category, setCategory] = useState("HR");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [policies, setPolicies] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null); // 수정 중인 항목 인덱스
    const [originalQuestion, setOriginalQuestion] = useState(""); // 원래 질문 저장
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
    const [filteredPolicies, setFilteredPolicies] = useState([]); // 검색 결과 저장
    const [originalAnswer, setOriginalAnswer] = useState(""); // 원래 답변 저장
    // 기존 사내 규정 불러오기
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/workly/api/policies/${companyId}`).then(response => {
            setPolicies(response.data);
            setFilteredPolicies(response.data); // 초기값 설정
        });
    }, [companyId]);
    // 검색 기능 추가
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredPolicies(policies);
        }
        else {
            setFilteredPolicies(policies.filter(policy => policy.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                policy.answer.toLowerCase().includes(searchTerm.toLowerCase())));
        }
    }, [searchTerm, policies]);
    // 사내 규정 저장 또는 수정
    const handleSavePolicy = async () => {
        await axios.post(`${import.meta.env.VITE_API_URL}/workly/api/policies`, { companyId, category, question, answer });
        // 기존 데이터 수정 시 목록 업데이트
        if (editingIndex !== null) {
            const updatedPolicies = [...policies];
            updatedPolicies[editingIndex] = { question, answer };
            setPolicies(updatedPolicies);
            setEditingIndex(null);
            setOriginalQuestion("");
            setOriginalAnswer("");
            setFilteredPolicies(updatedPolicies);
        }
        else {
            // 새로운 데이터 추가
            setPolicies([...policies, { question, answer }]);
        }
        alert("사내 규정이 저장되었습니다.");
        setQuestion("");
        setAnswer("");
    };
    // 기존 규정 클릭 시 수정 모드 활성화 / 비활성화
    const handleEditPolicy = (index) => {
        if (editingIndex === index) {
            // 이미 수정 중이면 취소 (원래 상태로 복구)
            setEditingIndex(null);
            setQuestion("");
            setAnswer("");
        }
        else {
            // 수정 모드 활성화
            setQuestion(policies[index].question);
            setAnswer(policies[index].answer);
            setOriginalQuestion(policies[index].question);
            setOriginalAnswer(policies[index].answer);
            setEditingIndex(index);
        }
    };
    // 삭제 기능 (DB에서도 삭제)
    const handleDeletePolicy = async (index, event) => {
        event.stopPropagation();
        const policyToDelete = policies[index]; // 삭제할 항목 가져오기
        try {
            // 백엔드에 삭제 요청 보내기
            await axios.delete(`${import.meta.env.VITE_API_URL}/workly/api/policies/delete/${companyId}`, {
                data: { question: policyToDelete.question } // 삭제할 데이터 전달 (질문 기준)
            });
            // UI에서도 삭제 반영
            const updatedPolicies = policies.filter((_, i) => i !== index);
            setPolicies(updatedPolicies);
            setFilteredPolicies(updatedPolicies);
        }
        catch (error) {
            console.error("삭제 중 오류 발생:", error);
            alert("삭제하는 동안 오류가 발생했습니다.");
        }
    };
    return (_jsxs("div", { style: styles.container, children: [_jsxs("div", { style: styles.formContainer, children: [_jsx("h2", { style: styles.title, children: "Q&A \uB4F1\uB85D" }), _jsxs("div", { style: styles.formGroup, children: [_jsx("label", { style: styles.label, children: "\uCE74\uD14C\uACE0\uB9AC" }), _jsxs("select", { style: styles.select, onChange: (e) => setCategory(e.target.value), value: category, children: [_jsx("option", { value: "HR", children: "HR" }), _jsx("option", { value: "\uC5C5\uBB34 \uC9C0\uCE68", children: "\uC5C5\uBB34 \uC9C0\uCE68" })] })] }), _jsxs("div", { style: styles.formGroup, children: [_jsx("label", { style: styles.label, children: "\uC9C8\uBB38" }), _jsx("input", { type: "text", style: styles.input, placeholder: "\uC9C8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694", value: question, onChange: (e) => setQuestion(e.target.value), disabled: editingIndex !== null })] }), _jsxs("div", { style: styles.formGroup, children: [_jsx("label", { style: styles.label, children: "\uB2F5\uBCC0" }), _jsx("textarea", { style: styles.textarea, placeholder: "\uB2F5\uBCC0\uC744 \uC785\uB825\uD558\uC138\uC694", value: answer, onChange: (e) => setAnswer(e.target.value) })] }), _jsx("button", { style: styles.button, onClick: handleSavePolicy, children: editingIndex !== null ? "수정 완료" : "저장" })] }), _jsxs("div", { style: styles.listContainer, children: [_jsx("h3", { style: styles.subtitle, children: "\uB4F1\uB85D\uB41C \uADDC\uC815" }), _jsx("input", { type: "text", style: styles.searchInput, placeholder: "\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsx("ul", { style: styles.list, children: filteredPolicies.map((policy, index) => (_jsx("li", { style: styles.listItem, children: _jsxs("div", { style: styles.textContainer, onClick: () => handleEditPolicy(index), children: [_jsx("button", { style: styles.deleteButton, onClick: (e) => handleDeletePolicy(index, e), children: "x" }), _jsx("div", { style: styles.question, children: policy.question }), _jsx("div", { style: styles.answer, children: policy.answer })] }) }, index))) })] })] }));
};
// 스타일 객체 (가로 배치 및 반응형 적용)
const styles = {
    container: {
        maxWidth: "900px",
        margin: "40px auto",
        display: "flex",
        flexDirection: "row", // 가로 배치
        gap: "20px",
        alignItems: "flex-start",
    },
    formContainer: {
        flex: 1,
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        height: "600px"
    },
    listContainer: {
        flex: 1,
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        height: "600px", // 리스트 높이 고정
        overflowY: "auto"
    },
    title: {
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "15px",
        color: "#2c3e50"
    },
    subtitle: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#34495e"
    },
    formGroup: {
        marginBottom: "15px",
        textAlign: "left"
    },
    label: {
        display: "block",
        fontSize: "14px",
        marginBottom: "5px",
        fontWeight: "bold",
        color: "#7f8c8d"
    },
    select: {
        width: "100%",
        padding: "10px",
        fontSize: "14px",
        borderRadius: "8px",
        border: "1px solid #bdc3c7",
        backgroundColor: "#ffffff"
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "14px",
        borderRadius: "8px",
        border: "1px solid #bdc3c7",
        backgroundColor: "#ffffff"
    },
    textarea: {
        width: "100%",
        height: "250px",
        padding: "10px",
        fontSize: "14px",
        borderRadius: "8px",
        border: "1px solid #bdc3c7",
        backgroundColor: "#ffffff",
        resize: "none"
    },
    button: {
        width: "100%",
        padding: "12px",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#4880ff",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "0.3s",
        marginTop: "10px"
    },
    list: {
        listStyleType: "none",
        padding: 0
    },
    listItem: {
        position: "relative",
        backgroundColor: "#ffffff",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "10px",
        boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
        transition: "0.3s",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        cursor: "pointer",
    },
    question: {
        fontWeight: "bold",
        fontSize: "16px",
        color: "#2c3e50",
        borderBottom: "1px solid #ddd",
        paddingBottom: "5px"
    },
    answer: {
        fontSize: "14px",
        color: "#7f8c8d",
        paddingTop: "5px",
        lineHeight: "1.6"
    },
    searchInput: {
        width: "100%",
        padding: "10px",
        fontSize: "12px",
        borderRadius: "8px",
        border: "1px solid #bdc3c7",
        marginBottom: "10px",
        marginTop: "10px",
    },
    deleteButton: {
        position: "absolute",
        right: "10px",
        top: "5px",
        fontSize: "15px",
        color: "#0e0f0f",
        border: "none",
        background: "none",
        cursor: "pointer",
        fontWeight: "bold"
    }
};
export default AdminPolicyManager;
