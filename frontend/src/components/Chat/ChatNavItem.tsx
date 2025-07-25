import type { ChatRoomInfo } from "../../types";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import DeleteModal from "../Modal/DeleteModal";

interface ChatRoomNavProps {
  room: ChatRoomInfo;
  selectedRoomId: number | null;
  setSelectedRoomId: (roomId: number) => void;
  leaveChatRoom: (roomId: number) => void;
}

function ChatRoomNavItem({
  room,
  selectedRoomId,
  setSelectedRoomId,
  leaveChatRoom,
}: ChatRoomNavProps) {
  const isSelected = selectedRoomId === room.roomId;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLeaveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent room selection
    setIsModalOpen(true);
  };

  const handleConfirmLeave = () => {
    leaveChatRoom(room.roomId);
    setIsModalOpen(false);
  };

  const handleCancelLeave = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div
        key={room.roomId}
        onClick={() => setSelectedRoomId(room.roomId)}
        className={`
        relative p-3 sm:p-4 mb-2 rounded-xl cursor-pointer 
        transition-all duration-300 group
        ${
          isSelected
            ? "bg-orange-400 dark:bg-orange-800/30 border-orange-400 dark:border-orange-400 shadow-md scale-[1.01]"
            : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
        }
`}
      >
        {isSelected && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-8 bg-white rounded-r-full shadow-sm"></div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            {/* Room Header */}
            <div className="flex items-center gap-2 mb-2">
              {/* Room Name */}
              <h3
                className={`
              font-semibold text-sm sm:text-base truncate
              ${isSelected ? "text-white" : "text-gray-800 dark:text-gray-100"}
            `}
              >
                {room.name}
              </h3>
            </div>

            {/* Last Message */}
            {room.lastMessage && (
              <div
                className={`
              text-xs sm:text-sm truncate mb-3 leading-relaxed
              ${
                isSelected
                  ? "text-orange-100"
                  : "text-gray-600 dark:text-gray-400"
              }
            `}
              >
                <span className="font-medium">{room.lastMessage.content}</span>
              </div>
            )}

            {/* Footer Info */}
            <div className="flex items-center justify-between">
              {/* Left Info */}
              <div className="flex items-center space-x-3">
                {/* Member Count */}
                <div className="flex items-center space-x-1">
                  <svg
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                      isSelected
                        ? "text-orange-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span
                    className={`
                  text-xs sm:text-sm font-medium
                  ${
                    isSelected
                      ? "text-orange-100"
                      : "text-gray-500 dark:text-gray-400"
                  }
                `}
                  >
                    {room.memberCount}
                  </span>
                </div>
              </div>

              {/* Timestamp */}
              {room.lastMessage?.timeStamp && (
                <span
                  className={`
                text-xs font-medium
                ${
                  isSelected
                    ? "text-orange-200"
                    : "text-gray-400 dark:text-gray-500"
                }
              `}
                >
                  {new Date(room.lastMessage.timeStamp).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Leave Button */}
          <button
            onClick={handleLeaveClick}
            className={`
            ml-3 p-2 rounded-lg transition-all duration-200 
            opacity-0 group-hover:opacity-100 transform group-hover:scale-110
            ${
              isSelected
                ? "hover:bg-white hover:bg-opacity-20 text-orange-100 hover:text-white"
                : "hover:bg-red-500 text-gray-400 hover:text-white dark:text-gray-500 dark:hover:text-white"
            }
          `}
            title="Leave room"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {!isSelected && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        )}
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCancelLeave}
        onConfirm={handleConfirmLeave}
        title="Are you sure you want to leave?"
        isLoading={false}
        para={"You cannot join the chatroom again after you leave."}
      />
    </>
  );
}

export default ChatRoomNavItem;
