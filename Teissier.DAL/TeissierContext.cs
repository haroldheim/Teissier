using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Teissier.DAL.Entities
{
    public partial class TeissierContext : DbContext
    {
        public TeissierContext()
        {
        }

        public TeissierContext(DbContextOptions<TeissierContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Apartment> Apartment { get; set; }
        public virtual DbSet<ApartmentTenant> ApartmentTenant { get; set; }
        public virtual DbSet<Record> Record { get; set; }
        public virtual DbSet<Tenant> Tenant { get; set; }
        public virtual DbSet<User> User { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Apartment>(entity =>
            {
                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Level)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ApartmentTenant>(entity =>
            {
                entity.Property(e => e.DateIn).HasColumnType("datetime");

                entity.Property(e => e.DateOut).HasColumnType("datetime");

                entity.Property(e => e.PaymentMethod)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Rent).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.Apartment)
                    .WithMany(p => p.ApartmentTenant)
                    .HasForeignKey(d => d.ApartmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LNKApartment");

                entity.HasOne(d => d.Tenant)
                    .WithMany(p => p.ApartmentTenant)
                    .HasForeignKey(d => d.TenantId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LNKTenant");
            });

            modelBuilder.Entity<Record>(entity =>
            {
                entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Label)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.ApartementTenant)
                    .WithMany(p => p.Record)
                    .HasForeignKey(d => d.ApartementTenantId)
                    .HasConstraintName("FK__Record__Aparteme__5FB337D6");
            });

            modelBuilder.Entity<Tenant>(entity =>
            {
                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Lastname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password).HasMaxLength(128);

                entity.Property(e => e.Salt).HasMaxLength(128);
            });
        }
    }
}
