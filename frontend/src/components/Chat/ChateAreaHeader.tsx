import { FiMenu } from "react-icons/fi";
import type { ChatRoomInfo } from "../../types";
import ButtonFactory from "../Button/ButtonFactory";
import { useState } from "react";
import DeleteModal from "../Modal/DeleteModal";

function ChatRoomAreaHeader({
  selectedRoom,
  handleLeave,
  onShowNav,
}: {
  selectedRoom: ChatRoomInfo;
  handleLeave: () => void;
  onShowNav?: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const confirmLeave = async () => {
    setIsLeaving(true);
    try {
      await handleLeave();
    } finally {
      setIsLeaving(false);
      setShowModal(false);
    }
  };
  return (
    <>
      <div className="w-full flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200 shadow-sm">
        {/* Left Section */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Mobile Menu Button */}
          {onShowNav && (
            <button
              onClick={onShowNav}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <FiMenu />
            </button>
          )}

          {/* Room Avatar */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white font-bold text-sm sm:text-lg">
              {selectedRoom.name.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Room Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white truncate">
              {selectedRoom.name}
            </h1>
            <div className="flex items-center space-x-3 mt-1">
              {/* Member Count */}
              <div className="flex items-center space-x-1">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {selectedRoom.memberCount} member
                  {selectedRoom.memberCount !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Description (Desktop only) */}
              {selectedRoom.description && (
                <span className="hidden sm:block text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                  • {selectedRoom.description}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 ml-3">
          {/* Leave Button */}
          <ButtonFactory
            type="delete"
            onClick={() => setShowModal(true)}
            message="Leave"
          />
        </div>

        {/* Mobile Description */}
        {selectedRoom.description && (
          <div className="sm:hidden absolute top-full left-0 right-0 px-4 py-2 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {selectedRoom.description}
            </p>
          </div>
        )}

        <DeleteModal
          isOpen={showModal}
          title={`Are you sure you want to leave ?`}
          para={"You cannot join the chatroom again after you leave"}
          onClose={() => setShowModal(false)}
          onConfirm={confirmLeave}
          isLoading={isLeaving}
        />
      </div>
    </>
  );
}

export default ChatRoomAreaHeader;
