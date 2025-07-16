namespace backend.Models.Entity
{
    public class ChatRoomMember
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string ChatRoomId { get; set; }
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
        public bool IsHost { get; set; } = false;

        public virtual ChatRoom ChatRoom { get; set; }
    }
}
