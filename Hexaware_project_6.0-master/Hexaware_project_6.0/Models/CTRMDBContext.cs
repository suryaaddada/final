using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Hexaware_project___WEBAPI.Models
{
    public partial class CTRMDBContext : DbContext
    {
        public CTRMDBContext()
        {
        }

        public CTRMDBContext(DbContextOptions<CTRMDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Device> Device { get; set; }
        public virtual DbSet<Nurse> Nurse { get; set; }
        public virtual DbSet<Patient> Patient { get; set; }
        public virtual DbSet<Signup> Signup { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                //optionsBuilder.UseSqlServer("Server=ASUSTUF\\MYSQLSERVER; Database=CTRMDB; integrated security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Device>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Isactive)
                    .HasColumnName("ISACTIVE")
                    .HasDefaultValueSql("((1))");
                entity.HasQueryFilter(t => t.Isactive == true);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PatientId).HasColumnName("PATIENT_ID");

                entity.Property(e => e.Patientinfo)
                    .IsRequired()
                    .HasColumnName("PATIENTINFO")
                    .HasMaxLength(100)
                    .IsUnicode(false);

             
            });

            modelBuilder.Entity<Nurse>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.DeviceId).HasColumnName("DEVICE_ID");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("EMAIL")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasColumnName("GENDER")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Isactive)
                    .HasColumnName("ISACTIVE")
                    .HasDefaultValueSql("((1))");
                entity.HasQueryFilter(t => t.Isactive == true);

                entity.Property(e => e.Mobile).HasColumnName("MOBILE");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PatientId).HasColumnName("PATIENT_ID");

                entity.Property(e => e.Result)
                    .IsRequired()
                    .HasColumnName("RESULT")
                    .HasMaxLength(100)
                    .IsUnicode(false);

              

              
            });

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("ADDRESS")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Date)
                    .HasColumnName("DATE")
                    .HasColumnType("date");

                entity.Property(e => e.Dob)
                    .HasColumnName("DOB")
                    .HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("EMAIL")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .HasColumnName("FIRSTNAME")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasColumnName("GENDER")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");
                entity.HasQueryFilter(t => t.IsActive == true);

                entity.Property(e => e.Lastname)
                    .IsRequired()
                    .HasColumnName("LASTNAME")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Mobile).HasColumnName("MOBILE");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("PASSWORD")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Signup>(entity =>
            {
                entity.ToTable("SIGNUP");

                entity.Property(e => e.Signupid).HasColumnName("SIGNUPID");

                entity.Property(e => e.ConfirmPassword)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("EMAIL")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Isactive)
                    .HasColumnName("ISACTIVE")
                    .HasDefaultValueSql("((1))");
                entity.HasQueryFilter(t => t.Isactive == true);

                entity.Property(e => e.Mobile).HasColumnName("MOBILE");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("PASSWORD")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
