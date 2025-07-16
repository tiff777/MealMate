using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddResetPasswordFieldsToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Users_hostId",
                table: "Meals");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "Meals",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "mealDate",
                table: "Meals",
                newName: "MealDate");

            migrationBuilder.RenameColumn(
                name: "hostId",
                table: "Meals",
                newName: "HostId");

            migrationBuilder.RenameIndex(
                name: "IX_Meals_hostId",
                table: "Meals",
                newName: "IX_Meals_HostId");

            migrationBuilder.AddColumn<string>(
                name: "ResetPasswordToken",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ResetPasswordTokenExpires",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Users_HostId",
                table: "Meals",
                column: "HostId",
                principalTable: "Users",
                principalColumn: "Uid",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Users_HostId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "ResetPasswordToken",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ResetPasswordTokenExpires",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Meals",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "MealDate",
                table: "Meals",
                newName: "mealDate");

            migrationBuilder.RenameColumn(
                name: "HostId",
                table: "Meals",
                newName: "hostId");

            migrationBuilder.RenameIndex(
                name: "IX_Meals_HostId",
                table: "Meals",
                newName: "IX_Meals_hostId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Users_hostId",
                table: "Meals",
                column: "hostId",
                principalTable: "Users",
                principalColumn: "Uid",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
