import type { ChatRoomInfo } from "../../types";
import { BsChatDots } from "react-icons/bs";
import ChatRoomNavItem from "./ChatNavItem";

interface ChatRoomNavProps {
  userChatRooms: ChatRoomInfo[];
  selectedRoomId: number | null;
  setSelectedRoomId: (roomId: number) => void;
  handleLeaveChat: (roomId: number) => void;
}

function ChatRoomNav({
  userChatRooms,
  selectedRoomId,
  setSelectedRoomId,
  handleLeaveChat,
}: ChatRoomNavProps) {
  return (
    <div className="h-full w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-200 shadow-lg lg:shadow-none">
      <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-500 to-red-500 dark:from-gray-700 dark:to-gray-800 transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
              Chat Rooms
            </h2>
            <p className="text-orange-100 dark:text-gray-300 text-sm transition-colors duration-200">
              {userChatRooms.length} room{userChatRooms.length !== 1 ? "s" : ""}{" "}
              available
            </p>
          </div>
          <div className="bg-white bg-opacity-20 dark:bg-gray-600 dark:bg-opacity-50 rounded-full p-2 transition-colors duration-200">
            <BsChatDots className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {userChatRooms.length === 0 ? (
          <div className="p-4 sm:p-6 text-center">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 sm:p-8 transition-colors duration-200">
              <div className="text-4xl sm:text-5xl mb-4">🍽️</div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                No chat rooms yet
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Find a meal or buddy to start chatting and making new
                connections!
              </p>
            </div>
          </div>
        ) : (
          <div className="p-2 sm:p-3 space-y-2">
            {userChatRooms.map((room) => (
              <ChatRoomNavItem
                room={room}
                selectedRoomId={selectedRoomId}
                setSelectedRoomId={setSelectedRoomId}
                leaveChatRoom={handleLeaveChat}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatRoomNav;
