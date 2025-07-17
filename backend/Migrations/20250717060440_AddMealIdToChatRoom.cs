using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddMealIdToChatRoom : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MealId",
                table: "ChatRooms",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChatRooms_MealId",
                table: "ChatRooms",
                column: "MealId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatRooms_Meals_MealId",
                table: "ChatRooms",
                column: "MealId",
                principalTable: "Meals",
                principalColumn: "Mid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatRooms_Meals_MealId",
                table: "ChatRooms");

            migrationBuilder.DropIndex(
                name: "IX_ChatRooms_MealId",
                table: "ChatRooms");

            migrationBuilder.DropColumn(
                name: "MealId",
                table: "ChatRooms");
        }
    }
}
