namespace backend.Models.Dto.Chat
{
    public class ChatMessageDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int ChatRoomId { get; set; }
    }
}
