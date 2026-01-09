import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const user = useSelector((store) => store.user);
    const { targetUserId } = useParams();

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([])
    const userId = user?._id;
    const socketRef = useRef(null);

    /* ---------- FETCH CHAT ---------- */
    useEffect(() => {
        if (!userId || !targetUserId) return;

        const fetchChat = async () => {
            try {
                const res = await axios.get(BASE_URL+"/chat/"+targetUserId, {
                    withCredentials: true,
                });

                const formattedMessages = res.data.messages.map((msg) => ({
                    firstName: msg.senderId.firstName,
                    text: msg.text,
                    time: msg.createdAt, // ✅ USE DB TIME
                }));

                setMessages(formattedMessages);
            } catch (err) {
                console.error("Failed to fetch chat", err);
            }
        };

        fetchChat();
    }, [userId, targetUserId]);

    /* ---------- SOCKET ---------- */
    useEffect(() => {
        if (!userId || !targetUserId) return;

        socketRef.current = createSocketConnection();

        socketRef.current.emit("joinChat", {
            userId,
            targetUserId,
        });

        socketRef.current.on("messageReceived", ({ firstName, text, time }) => {
            setMessages((prev) => [...prev, { firstName, text, time }]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [userId, targetUserId]);

    /* ---------- SEND MESSAGE ---------- */
    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const time = new Date().toISOString(); // ✅ SEND TIME

        socketRef.current.emit("sendMessage", {
            userId,
            targetUserId,
            firstName: user.firstName,
            text: newMessage,
            time, // ✅
        });

        setNewMessage("");
    };

    /* ---------- FORMAT TIME ---------- */
    const formatTime = (time) => {
        return new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>

            <div className="flex-1 overflow-scroll p-5">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={
                            "chat " +
                            (user?.firstName === msg.firstName
                                ? "chat-end"
                                : "chat-start")
                        }
                    >
                        <div className="chat-header">
                            {msg.firstName}
                            <time className="text-xs opacity-50">
                                {" "}
                                {formatTime(msg.time)}
                            </time>
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50">Seen</div>
                    </div>
                ))}
            </div>

            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border border-gray-500 text-white rounded p-2"
                />
                <button onClick={sendMessage} className="btn btn-secondary">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
