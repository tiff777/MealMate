namespace backend.Models.Dto.Chat
{
    public class CreatePrivateChatRoomDto
    {
        public int TargetUserId { get; set; }
        public string TargetUserName { get; set; }
        public string Description { get; set; }
    }
}
