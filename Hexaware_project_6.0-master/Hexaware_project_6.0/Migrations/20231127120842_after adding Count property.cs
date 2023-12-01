using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hexaware_project_6._0.Migrations
{
    public partial class afteraddingCountproperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Patient",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PASSWORD = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    FIRSTNAME = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    LASTNAME = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    GENDER = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    DOB = table.Column<DateTime>(type: "date", nullable: false),
                    ADDRESS = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    MOBILE = table.Column<long>(type: "bigint", nullable: false),
                    DATE = table.Column<DateTime>(type: "date", nullable: false),
                    EMAIL = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: true, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patient", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SIGNUP",
                columns: table => new
                {
                    SIGNUPID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NAME = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    EMAIL = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    PASSWORD = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    MOBILE = table.Column<long>(type: "bigint", nullable: false),
                    ISACTIVE = table.Column<bool>(type: "bit", nullable: true, defaultValueSql: "((1))"),
                    ConfirmPassword = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SIGNUP", x => x.SIGNUPID);
                });

            migrationBuilder.CreateTable(
                name: "Device",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NAME = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    PatientEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PATIENT_ID = table.Column<int>(type: "int", nullable: true),
                    PATIENTINFO = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    ISACTIVE = table.Column<bool>(type: "bit", nullable: true, defaultValueSql: "((1))"),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Count = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Device", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Device_Patient_PATIENT_ID",
                        column: x => x.PATIENT_ID,
                        principalTable: "Patient",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Nurse",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NAME = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    GENDER = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    MOBILE = table.Column<long>(type: "bigint", nullable: false),
                    EMAIL = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    PATIENT_ID = table.Column<int>(type: "int", nullable: true),
                    DEVICE_ID = table.Column<int>(type: "int", nullable: true),
                    PatientName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeviceName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RESULT = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ISACTIVE = table.Column<bool>(type: "bit", nullable: true, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nurse", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Nurse_Patient_PATIENT_ID",
                        column: x => x.PATIENT_ID,
                        principalTable: "Patient",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Device_PATIENT_ID",
                table: "Device",
                column: "PATIENT_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Nurse_PATIENT_ID",
                table: "Nurse",
                column: "PATIENT_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Device");

            migrationBuilder.DropTable(
                name: "Nurse");

            migrationBuilder.DropTable(
                name: "SIGNUP");

            migrationBuilder.DropTable(
                name: "Patient");
        }
    }
}
