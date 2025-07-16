namespace backend.Models.Dto.Chat
{
    public class ChatMessageDto
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string ChatRoomId { get; set; }
    }
}
