import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
export const ChatContext = createContext(undefined);
export const ChatProvider = ({ children }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const openChat = () => setIsChatOpen(true);
    const closeChat = () => setIsChatOpen(false);
    return (_jsx(ChatContext.Provider, { value: { isChatOpen, openChat, closeChat }, children: children }));
};
export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
