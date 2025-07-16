namespace backend.Models.Entity
{
    public class ChatroomMember
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string ChatRoomId { get; set; }
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
        public bool IsAdmin { get; set; } = false;

        public virtual Chatroom ChatRoom { get; set; }
    }
}
