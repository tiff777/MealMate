using backend.Models.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<MealParticipant> MealParticipants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Uid);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Uid).ValueGeneratedOnAdd();


                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.Email).HasMaxLength(255);
                entity.Property(e => e.PasswordHash).HasMaxLength(255);
                entity.Property(e => e.Bio).HasMaxLength(1000);

                // Configure string arrays to be stored as comma-separated strings
                entity.Property(e => e.Interests)
                      .HasConversion(CommaSeparatedString());
                entity.Property(e => e.PreferredCuisines)
                      .HasConversion(CommaSeparatedString());
            });


            modelBuilder.Entity<Meal>(entity =>
            {
                entity.HasKey(e => e.Mid);
                entity.Property(e => e.Mid).ValueGeneratedOnAdd();


                entity.Property(e => e.Title).HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.RestaurantName).HasMaxLength(100);
                entity.Property(e => e.RestaurantAddress).HasMaxLength(200);

                // Configure Tags array to be stored as comma-separated string
                entity.Property(e => e.Tags)
                      .HasConversion(
                          v => v != null ? string.Join(',', v) : null,
                          v => !string.IsNullOrEmpty(v) ? v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList() : new());

                entity.HasOne(e => e.Host)
                      .WithMany(u => u.HostedMeals)
                      .HasForeignKey(e => e.HostId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<MealParticipant>(entity =>
            {
                entity.HasKey(e => e.Pid);
                entity.Property(e => e.Pid).ValueGeneratedOnAdd();

                entity.HasOne(e => e.Meal)
                      .WithMany(m => m.Participants)
                      .HasForeignKey(e => e.MealId)
                      .HasPrincipalKey(m => m.Mid)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.User)
                      .WithMany(u => u.ParticipatedMeals)
                      .HasForeignKey(e => e.UserId)
                      .HasPrincipalKey(u => u.Uid)
                      .OnDelete(DeleteBehavior.NoAction);

                entity.HasIndex(e => new { e.MealId, e.UserId }).IsUnique();
            });
        }

        private static ValueConverter<List<string>, string> CommaSeparatedString ()
        {
            return new ValueConverter<List<string>, string>(
            list => list.Any() ? string.Join(',', list) : "",
            str => string.IsNullOrEmpty(str)
            ? new List<string>()
            : str.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
            );
        }

    }
    
}
