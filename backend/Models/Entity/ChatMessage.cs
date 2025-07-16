namespace backend.Models.Entity
{
    public class ChatMessage
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Content { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string ChatRoomId { get; set; }
        public bool IsDeleted { get; set; } = false;

        public virtual Chatroom ChatRoom { get; set; }
    }
}
