import type { ChatRoomInfo } from "../../types";
import ButtonFactory from "../Button/ButtonFactory";

function ChatRoomAreaHeader({
  selectedRoom,
  handleLeave,
}: {
  selectedRoom: ChatRoomInfo;
  handleLeave: () => void;
}) {
  return (
    <>
      <div className="w-full flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {selectedRoom.name}
            </h1>
            {selectedRoom.description && (
              <p className="text-sm text-gray-600 mt-1">
                {selectedRoom.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {selectedRoom.memberCount} members
            </span>
            <ButtonFactory
              type="delete"
              onClick={handleLeave}
              message="Leave"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatRoomAreaHeader;
