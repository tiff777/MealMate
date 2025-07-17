import * as signalR from "@microsoft/signalr";
import type { ChatMessage } from "../types";

export class ChatService {
  private connection: signalR.HubConnection;
  private isConnected = false;

  constructor(baseUrl: string = "http://localhost:5050") {
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
      this.isConnected = true;
    });

    this.connection.onclose(() => {
      console.log("SignalR: Connection closed");
      this.isConnected = false;
    });
  }

  async connect(): Promise<void> {
    if (this.isConnected) return;
    await this.connection.start();
    this.isConnected = true;
    console.log("SignalR: Connected successfully");
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) return;
    await this.connection.stop();
    this.isConnected = false;
    console.log("SignalR: Disconnected");
  }

  async joinRoom(roomId: number, userName: string): Promise<void> {
    if (!this.isConnected) {
      console.warn("[SignalR] Not connected yet, connecting now…");
      await this.connect();
    }
    console.log(`[SignalR] Joining room ${roomId} as ${userName}`);
    await this.connection.invoke("JoinRoom", roomId, userName);
  }

  async leaveRoom(roomId: number, userName: string): Promise<void> {
    if (!this.isConnected) return;
    await this.connection.invoke("LeaveRoom", roomId, userName);
  }

  async sendMessage(
    roomId: number,
    userName: string,
    message: string
  ): Promise<void> {
    if (!this.isConnected) {
      throw new Error("Not connected to chat hub");
    }
    await this.connection.invoke(
      "SendMessageToRoom",
      roomId,
      userName,
      message
    );
  }

  onMessageReceived(callback: (message: ChatMessage) => void): void {
    this.connection.on("ReceiveMessage", callback);
  }

  get connectionState(): signalR.HubConnectionState {
    return this.connection.state;
  }
}
