using backend.Data;
using backend.Models.Dto.Chat;
using backend.Models.Entity;
using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;

namespace backend.Hubs
{
    public class ChatHub:Hub
    {

        public async Task JoinRoom (string roomId, string userName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
            await Clients.Group(roomId).SendAsync("UserJoined", userName, $"{userName} joined the room");
        }

        public async Task LeaveRoom (string roomId, string userName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
            await Clients.Group(roomId).SendAsync("UserLeft", userName, $"{userName} left the room");
        }

        public async Task SendMessageToRoom (string roomId, string userName, ChatMessageDto messageData)
        {
            await Clients.Group(roomId).SendAsync("ReceiveMessage", messageData);
        }

        public async Task SendPrivateMessage (string toConnectionId, string fromUserName, ChatMessageDto messageData)
        {
            await Clients.Client(toConnectionId).SendAsync("ReceivePrivateMessage", messageData);
        }

        public override async Task OnConnectedAsync ()
        {
            await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync (Exception exception)
        {
            await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
