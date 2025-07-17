import React, { useEffect, useRef, useState } from "react";
import ChatRoomAreaHeader from "./ChateAreaHeader";
import type { ChatRoomInfo, ChatMessage } from "../../types";
import MessageInput from "../Form/MessageInput";

interface ChatRoomProps {
  room: ChatRoomInfo;
  userName: string;
  messages: ChatMessage[];
  // newMessage: string;
  // setNewMessage: (message: string) => void;
  handleLeave: () => void;
  // handleSendMessage: (e: React.FormEvent) => void;
  handleSendMessage: (message: string) => void;
}

const ChatRoom = ({
  room,
  userName,
  messages,
  // newMessage,
  // setNewMessage,
  handleSendMessage,
  handleLeave,
}: ChatRoomProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  console.log(
    "after setUserChatRooms, selectedRoomId still valid?",
    room.roomId
  );
  console.log("Test messages: ", messages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [newMessage, setNewMessage] = useState("");

  const handleLocalSend = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] max-w-full mx-auto">
      <ChatRoomAreaHeader selectedRoom={room} handleLeave={handleLeave} />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.userName === userName ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                  message.userName === userName
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {message.userName !== userName && (
                  <div className="text-xs font-semibold mb-1">
                    {message.userName}
                  </div>
                )}
                <div className="break-words">{message.content}</div>
                <div className="text-xs opacity-75 mt-1">
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;
