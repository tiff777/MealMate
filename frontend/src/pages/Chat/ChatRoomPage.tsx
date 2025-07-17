import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { AppContext } from "../../context/AppContext";
import ChatRoom from "../../components/Chat/Chatroom";
import { authClient } from "../../hook/api";
import ChatRoomNav from "../../components/Chat/ChatRoomNav";
import type { ChatRoomInfo, ChatMessage } from "../../types";
import { ChatService } from "../../hook/chatService";

const ChatRoomPage = () => {
  const { pendingRoomId, setPendingId } = useContext(AppContext);
  const [userChatRooms, setUserChatRooms] = useState<ChatRoomInfo[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const chatServiceRef = useRef<ChatService | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSignalRReady, setIsSignalRReady] = useState(false);

  const selectedRoom = userChatRooms.find(
    (room) => room.roomId === selectedRoomId
  );

  const { user } = useContext(AppContext);

  const fetchUserChatRooms = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await authClient.get("/chat");

      if (response.status !== 200) {
        console.log("Cannot fetch chatroom data");
        return;
      }

      const chatRooms = response.data;
      setUserChatRooms(chatRooms);

      console.log("Test chatroom: ", chatRooms);
      if (pendingRoomId) {
        setSelectedRoomId(pendingRoomId);
        setPendingId(null);
      } else if (!selectedRoomId && chatRooms.length > 0) {
        setSelectedRoomId(chatRooms[0].roomId);
      }
    } catch (error) {
      console.error("Failed to fetch chat rooms:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchChatHistory = useCallback(async () => {
    if (!selectedRoomId) return;

    try {
      console.log(`Fetching messages for room ${selectedRoomId}`);
      const response = await authClient.get(`/chat/${selectedRoomId}/messages`);

      if (response.status !== 200) {
        console.log("Cannot fetch message");
        return;
      }
      setMessages(response.data);
    } catch (error) {
      console.log("Fail to fetch message:", error);
    }
  }, [selectedRoomId]);

  const handleLeaveChatRoom = async (roomId: number) => {
    try {
      console.log(`Leaving chat room: ${roomId}`);

      const response = await authClient.post(`chat/${roomId}/leave`);
      if (response.status !== 200) {
        console.log("Cannot leave the room");
        return;
      }

      setUserChatRooms((prev) => prev.filter((r) => r.roomId !== roomId));

      if (selectedRoomId === roomId) {
        const remainingRooms = userChatRooms.filter(
          (room) => room.roomId !== roomId
        );
        setSelectedRoomId(
          remainingRooms.length > 0 ? remainingRooms[0].roomId : null
        );
      }
    } catch (error) {
      console.error("Failed to leave chat room:", error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedRoomId || !user) {
      return;
    }

    console.log("Test new message: ", newMessage);

    try {
      const response = await authClient.post(
        `/chat/${selectedRoomId}/messages`,
        { content: newMessage }
      );

      if (response.status !== 200) {
        console.log("Cannot send message");
      }
    } catch (error) {
      console.log("Error in sending message");
    }
  };

  useEffect(() => {
    fetchUserChatRooms();
  }, []);

  useEffect(() => {
    const service = new ChatService();
    chatServiceRef.current = service;

    const init = async () => {
      await service.connect();
      setIsSignalRReady(true);

      service.onMessageReceived((message) => {
        console.log("Received new message:", message);
        setMessages((prev) => [...prev, message]);
      });
    };

    init();

    return () => {
      service.disconnect();
    };
  }, []);

  useEffect(() => {
    const service = chatServiceRef.current;
    if (!service || !user || !isSignalRReady) return;


    const join = async () => {
      if (selectedRoomId) {
        await service.joinRoom(selectedRoomId, user.name);
      }
    };

    join();

    // optional: 可以在 cleanup 時 leaveRoom
    return () => {
      if (selectedRoomId) {
        service.leaveRoom(selectedRoomId, user.name);
      }
    };
  }, [selectedRoomId, user]);

  useEffect(() => {
    fetchChatHistory();
  }, [selectedRoom?.roomId]);

  useEffect(() => {
    if (pendingRoomId) {
      setSelectedRoomId(pendingRoomId);
      setPendingId(null);
    }
  }, [pendingRoomId]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading chat rooms...</div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4.5rem)] bg-gray-100 ">
      <ChatRoomNav
        userChatRooms={userChatRooms}
        selectedRoomId={selectedRoomId}
        setSelectedRoomId={setSelectedRoomId}
        handleLeaveChat={handleLeaveChatRoom}
      />

      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <>
            <div className="flex-1 bg-white">
              <ChatRoom
                room={selectedRoom}
                userName={user.name}
                handleLeave={() => handleLeaveChatRoom(selectedRoom.roomId)}
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="text-6xl text-gray-300 mb-4">💬</div>
              <h2 className="text-xl font-medium text-gray-600 mb-2">
                Welcome to Chat
              </h2>
              <p className="text-gray-500 mb-4">
                Select a chat room to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoomPage;
