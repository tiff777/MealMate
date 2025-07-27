import * as signalR from "@microsoft/signalr";
import type { ChatMessage } from "../types";

// ChatService handles SignalR WebSocket-based real-time messaging
export class ChatService {
  private connection: signalR.HubConnection;

  constructor(
    baseUrl: string = import.meta.env.VITE_API_URL || "http://localhost:5050"
  ) {
    // Build SignalR connection with WebSocket transport and auto reconnect
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${baseUrl}/chathub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.connection.onreconnecting(() => {
      console.log("SignalR: Reconnecting...");
    });

    this.connection.onreconnected(() => {
      console.log("SignalR: Reconnected");
    });

    this.connection.onclose((error) => {
      console.log("SignalR: Connection closed", error);
    });
  }

  async connect(): Promise<void> {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      return;
    }

    if (this.connection.state === signalR.HubConnectionState.Connecting) {
      return new Promise((resolve, reject) => {
        const checkConnection = () => {
          if (this.connection.state === signalR.HubConnectionState.Connected) {
            resolve();
          } else if (
            this.connection.state === signalR.HubConnectionState.Disconnected
          ) {
            reject(new Error("Connection failed"));
          } else {
            setTimeout(checkConnection, 100);
          }
        };
        checkConnection();
      });
    }

    try {
      await this.connection.start();
      console.log("SignalR: Connected successfully");
    } catch (error) {
      console.error("SignalR: Connection failed", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      return;
    }

    try {
      await this.connection.stop();
      console.log("SignalR: Disconnected");
    } catch (error) {
      console.error("SignalR: Disconnect error", error);
    }
  }

  async joinRoom(roomId: number, userName: string): Promise<void> {
    try {
      await this.connect();

      console.log(`[SignalR] Joining room ${roomId} as ${userName}`);
      await this.connection.invoke("JoinRoom", roomId, userName);
    } catch (error) {
      console.error(`Failed to join room ${roomId}:`, error);
      throw error;
    }
  }

  async leaveRoom(roomId: number, userName: string): Promise<void> {
    if (this.connection.state !== signalR.HubConnectionState.Connected) {
      return;
    }

    try {
      await this.connection.invoke("LeaveRoom", roomId, userName);
    } catch (error) {
      console.error(`Failed to leave room ${roomId}:`, error);
    }
  }

  async sendMessage(
    roomId: number,
    userName: string,
    message: string
  ): Promise<void> {
    if (this.connection.state !== signalR.HubConnectionState.Connected) {
      throw new Error("Not connected to chat hub");
    }

    try {
      await this.connection.invoke(
        "SendMessageToRoom",
        roomId,
        userName,
        message
      );
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  }

  onMessageReceived(callback: (message: ChatMessage) => void): void {
    this.connection.on("ReceiveMessage", callback);
  }

  get connectionState(): signalR.HubConnectionState {
    return this.connection.state;
  }
}
