import React, { useEffect, useRef, useState } from "react";
import ChatRoomAreaHeader from "./ChateAreaHeader";
import type { ChatRoomInfo, ChatMessage } from "../../types";
import MessageInput from "../Form/MessageInput";
import UserAvatar from "../User/UserAvatar";

interface ChatRoomProps {
  room: ChatRoomInfo;
  userName: string;
  messages: ChatMessage[];
  handleLeave: () => void;
  handleSendMessage: (message: string) => void;
  onShowNav?: () => void;
}

const ChatRoom = ({
  room,
  userName,
  messages,
  handleSendMessage,
  handleLeave,
  onShowNav,
}: ChatRoomProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [newMessage, setNewMessage] = useState("");

  const handleLocalSend = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(newMessage);
    setNewMessage("");
  };

  const isConsecutiveMessage = (
    currentMessage: ChatMessage,
    prevMessage: ChatMessage | undefined
  ) => {
    if (!prevMessage) return false;
    return (
      currentMessage.userName === prevMessage.userName &&
      new Date(currentMessage.timestamp).getTime() -
        new Date(prevMessage.timestamp).getTime() <
        300000 // 5 minutes
    );
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
      <ChatRoomAreaHeader
        selectedRoom={room}
        handleLeave={handleLeave}
        onShowNav={onShowNav}
      />

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 bg-gray-50 dark:bg-gray-800">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg max-w-md">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No messages yet. Start the conversation!
              </h3>
            </div>
          </div>
        ) : (
          messages.map((message, index) => {
            const isOwn = message.userName === userName;
            const prevMessage = index > 0 ? messages[index - 1] : undefined;
            const isConsecutive = isConsecutiveMessage(message, prevMessage);

            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"} ${
                  isConsecutive ? "mt-1" : "mt-4"
                }`}
              >
                <div
                  className={`
                  flex ${
                    isOwn ? "flex-row-reverse space-x-reverse" : "flex-row"
                  }
                  items-end space-x-2
                  max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]
                  `}
                >
                  {/* Avatar */}
                  {!isOwn && !isConsecutive && (
                    <UserAvatar
                      size="xs"
                      avatar={message.avatar}
                      userId={message.userId}
                      isOnline={message.isOnline}
                    />
                  )}

                  {/* Spacer for consecutive messages */}
                  {!isOwn && isConsecutive && (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"></div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`
                    relative px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-sm
                    ${
                      isOwn
                        ? "bg-orange-100 text-orange-900 dark:bg-orange-500/20 dark:text-orange-200 border border-orange-200 dark:border-orange-400"
                        : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                    }
                    ${
                      isConsecutive
                        ? isOwn
                          ? "rounded-tr-md"
                          : "rounded-tl-md"
                        : ""
                    }
                  `}
                  >
                    {/* Username (only for others' first message) */}
                    {!isOwn && !isConsecutive && (
                      <div className="text-xs sm:text-sm font-semibold mb-1 text-blue-600 dark:text-blue-400">
                        {message.userName}
                      </div>
                    )}

                    {/* Message Content */}
                    <div className="break-words text-sm sm:text-base leading-relaxed">
                      {message.content}
                    </div>

                    {/* Timestamp */}
                    <div
                      className={`
                      text-xs mt-1 
                      ${
                        isOwn
                          ? "text-orange-900 dark:text-orange-200"
                          : "text-gray-500 dark:text-gray-400"
                      }
                    `}
                    >
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>

                  {/* Own Avatar */}
                  {isOwn && !isConsecutive && (
                    <UserAvatar
                      size="xs"
                      avatar={message.avatar}
                      userId={message.userId}
                      isOnline={message.isOnline}
                    />
                  )}

                  {/* Spacer for own consecutive messages */}
                  {isOwn && isConsecutive && (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"></div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatRoom;
