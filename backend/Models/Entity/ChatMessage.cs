namespace backend.Models.Entity
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string ChatRoomId { get; set; }
        public bool IsDeleted { get; set; } = false;

        public virtual ChatRoom ChatRoom { get; set; }
    }
}
