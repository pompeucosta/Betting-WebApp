using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp.Migrations
{
    /// <inheritdoc />
    public partial class FixedBet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BetsList_UsersList_UserId",
                table: "BetsList");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "BetsList",
                newName: "UserID");

            migrationBuilder.RenameIndex(
                name: "IX_BetsList_UserId",
                table: "BetsList",
                newName: "IX_BetsList_UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_BetsList_UsersList_UserID",
                table: "BetsList",
                column: "UserID",
                principalTable: "UsersList",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BetsList_UsersList_UserID",
                table: "BetsList");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "BetsList",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_BetsList_UserID",
                table: "BetsList",
                newName: "IX_BetsList_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_BetsList_UsersList_UserId",
                table: "BetsList",
                column: "UserId",
                principalTable: "UsersList",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
