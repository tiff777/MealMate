namespace backend.Models.Dto
{
    public class ParticipantDto
    {
        public int UserId { get; set; }
        public string Avatar { get; set; }
        public DateTimeOffset JoinedAt { get; set; }
    }
}
