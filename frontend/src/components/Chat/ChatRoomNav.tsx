import type { ChatRoomInfo } from "../../types";
import ChatRoomNavItem from "./ChatNavItem";

interface ChatRoomNavProps {
  userChatRooms: ChatRoomInfo[];
  selectedRoomId: number | null;
  setSelectedRoomId: React.Dispatch<React.SetStateAction<number | null>>;
  handleLeaveChat: (roomId: number) => void;
}

function ChatRoomNav({
  userChatRooms,
  selectedRoomId,
  setSelectedRoomId,
  handleLeaveChat,
}: ChatRoomNavProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Chat Rooms</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {userChatRooms.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <div className="mb-2">No chat rooms yet</div>
            <div className="mb-2">Find a meal or buddy to start a chat</div>
          </div>
        ) : (
          <div className="p-2">
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
