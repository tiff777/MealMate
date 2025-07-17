namespace backend.Models.Entity
{
    public class ChatRoomMember
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int ChatRoomId { get; set; }
        public DateTimeOffset JoinedAt { get; set; } = DateTimeOffset.UtcNow;
        public bool IsHost { get; set; } = false;

        public virtual ChatRoom ChatRoom { get; set; }
    }
}
