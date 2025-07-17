import type { ChatRoomInfo } from "../../types";

interface ChatRoomNavProps {
  room: ChatRoomInfo;
  selectedRoomId: number | null;
  setSelectedRoomId: React.Dispatch<React.SetStateAction<number | null>>;
  leaveChatRoom: (roomId: number) => void;
}

function ChatRoomNavItem({
  room,
  selectedRoomId,
  setSelectedRoomId,
  leaveChatRoom,
}: ChatRoomNavProps) {
  return (
    <div
      key={room.roomId}
      onClick={() => setSelectedRoomId(room.roomId)}
      className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
        selectedRoomId === room.roomId
          ? "bg-blue-100 border border-blue-200"
          : "hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-800 truncate">{room.name}</h3>
          </div>
          {room.lastMessage && (
            <div className="text-sm text-gray-500 truncate mt-1">
              {room.lastMessage.content}
            </div>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-400">
              {room.memberCount} members
            </span>
            {room.lastMessage?.timeStamp && (
              <span className="text-xs text-gray-400">
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

        <button
          onClick={(e) => {
            e.stopPropagation();
            leaveChatRoom(room.roomId);
          }}
          className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
          title="Leave room"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatRoomNavItem;
