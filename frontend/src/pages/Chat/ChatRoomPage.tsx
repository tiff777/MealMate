import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import ChatRoom from "../../components/Chat/ChatRoom";
import { authClient } from "../../hook/api";
import ChatRoomNav from "../../components/Chat/ChatRoomNav";
import type { ChatRoomInfo, ChatMessage } from "../../types";
import { ChatService } from "../../hook/chatService";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const ChatRoomPage = () => {
  const { pendingRoomId, setPendingId, showError } = useContext(AppContext);

  // Stores the list of chat rooms user is in
  const [userChatRooms, setUserChatRooms] = useState<ChatRoomInfo[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Reference to the real-time SignalR service
  const chatServiceRef = useRef<ChatService | null>(null);

  // Stores chat messages of the selected room
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSignalRReady, setIsSignalRReady] = useState(false);

  // Controls mobile sidebar visibility
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Find the currently selected room details
  const selectedRoom = userChatRooms.find(
    (room) => room.roomId === selectedRoomId
  );

  const { user } = useContext(AppContext);

  // Fetch chat rooms the user has joined
  const fetchUserChatRooms = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await authClient.get("/chat");

      if (response.status !== 200) {
        showError("Cannot fetch this chatroom data");
        return;
      }

      const chatRooms = response.data;
      setUserChatRooms(chatRooms);

      if (pendingRoomId) {
        setSelectedRoomId(pendingRoomId);
        setPendingId(null);
      } else if (!selectedRoomId && chatRooms.length > 0) {
        setSelectedRoomId(chatRooms[0].roomId);
      }
    } catch (error) {
      showError(`Failed to fetch chat rooms: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch previous messages when room changes
  const fetchChatHistory = useCallback(async () => {
    if (!selectedRoomId) return;

    try {
      const response = await authClient.get(`/chat/${selectedRoomId}/messages`);

      if (response.status !== 200) {
        showError("Cannot fetch message");
        return;
      }
      setMessages(response.data);
    } catch (error) {
      showError(`Fail to fetch message: ${error}`);
    }
  }, [selectedRoomId]);

  // Leave a chat room
  const handleLeaveChatRoom = async (roomId: number) => {
    try {
      const response = await authClient.post(`chat/${roomId}/leave`);
      if (response.status !== 200) {
        showError("Cannot leave the room");
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
        setShowMobileNav(false);
      }
    } catch (error) {
      showError(`Failed to leave chat room: ${error}`);
    }
  };

  // Send a message in current room
  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || !selectedRoomId || !user) {
      return;
    }

    try {
      const response = await authClient.post(
        `/chat/${selectedRoomId}/messages`,
        { content: messageContent }
      );

      if (response.status !== 200) {
        showError("Cannot send message");
      }

      setUserChatRooms((prev) =>
        prev.map((room) =>
          room.roomId === selectedRoomId
            ? {
                ...room,
                lastMessage: {
                  content: messageContent,
                  timeStamp: new Date(),
                },
                lastMessageTime: new Date(),
              }
            : room
        )
      );
    } catch (error) {
      showError("Error in sending message");
    }
  };

  // Select a chat room from sidebar
  const handleRoomSelect = (roomId: number) => {
    setSelectedRoomId(roomId);
    setShowMobileNav(false);
  };

  useEffect(() => {
    fetchUserChatRooms();
  }, []);

  // Initialize SignalR connection on mount
  useEffect(() => {
    const service = new ChatService();
    chatServiceRef.current = service;

    const init = async () => {
      await service.connect();
      setIsSignalRReady(true);

      service.onMessageReceived((message) => {
        setMessages((prev) => [...prev, message]);
      });
    };

    init();

    return () => {
      service.disconnect();
    };
  }, []);

  // Join/leave SignalR chat room when selected room changes
  useEffect(() => {
    const service = chatServiceRef.current;
    if (!service || !user || !isSignalRReady) return;

    const join = async () => {
      if (selectedRoomId) {
        await service.joinRoom(selectedRoomId, user.name);
      }
    };

    join();

    return () => {
      if (selectedRoomId) {
        service.leaveRoom(selectedRoomId, user.name);
      }
    };
  }, [selectedRoomId, user, isSignalRReady]);

  // Load chat history when room changes
  useEffect(() => {
    if (selectedRoomId) {
      fetchChatHistory();
    }
  }, [selectedRoomId]);

  // Handle navigation to new room if pending
  useEffect(() => {
    if (pendingRoomId) {
      setSelectedRoomId(pendingRoomId);
      setPendingId(null);
    }
  }, [pendingRoomId]);

  // Show loading while initializing
  if (isLoading || !user) {
    return <LoadingSpinner message="Loading Chatrooms" />;
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-5rem)] bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      {/* Mobile backdrop for sidebar */}
      {showMobileNav && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowMobileNav(false)}
        />
      )}

      {/* Sidebar: Chat Room List */}
      <div
        className={`
        ${showMobileNav ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 
        fixed lg:relative z-50 lg:z-auto
        w-80 sm:w-96 lg:w-80 xl:w-96
        transition-transform duration-300 ease-in-out
        h-full
      `}
      >
        <ChatRoomNav
          userChatRooms={userChatRooms}
          selectedRoomId={selectedRoomId}
          setSelectedRoomId={handleRoomSelect}
          handleLeaveChat={handleLeaveChatRoom}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <>
            <div className="flex-1 bg-white ">
              <ChatRoom
                room={selectedRoom}
                userName={user.name}
                handleLeave={() => handleLeaveChatRoom(selectedRoom.roomId)}
                messages={messages}
                handleSendMessage={handleSendMessage}
                onShowNav={() => setShowMobileNav(true)}
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
