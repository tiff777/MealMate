using backend.Data;
using backend.Models.Dto.Chat;
using backend.Models.Entity;
using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;

namespace backend.Hubs
{
    public class ChatHub:Hub
    {

        public async Task JoinRoom (int roomId, string userName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId.ToString());
            await Clients.Group(roomId.ToString()).SendAsync("UserJoined", userName, $"{userName} joined the room");
        }

        public async Task LeaveRoom (int roomId, string userName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId.ToString());
            await Clients.Group(roomId.ToString()).SendAsync("UserLeft", userName, $"{userName} left the room");
        }

        public async Task SendMessageToRoom (int roomId, string userName, ChatMessageDto messageData)
        {
            await Clients.Group(roomId.ToString()).SendAsync("ReceiveMessage", messageData);
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
