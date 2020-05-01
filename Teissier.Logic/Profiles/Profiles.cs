
using AutoMapper;
using Microsoft.EntityFrameworkCore.Internal;
using System.Text;
using Teissier.DAL.Entities;
using Teissier.Logic.Dtos;

namespace Teissier.Logic.Profiles
{
    public class Profiles: Profile
    {
        public Profiles()
        {
            CreateMap<Tenant, TenantDto>()
                .ForMember(x => x.CanBeRemoved, m => m.MapFrom(src => CanTenantBeRemoved(src)))
                .ReverseMap();
            CreateMap<Apartment, ApartmentDto>()
                .ForMember(x => x.CanBeRemoved, m => m.MapFrom(src => CanApartmentBeRemoved(src)))
                .ReverseMap();
            CreateMap<ApartmentTenant, ApartmentTenantDto>()
                .ReverseMap();
            CreateMap<Record, RecordDto>()
                .ReverseMap();
            CreateMap<LoginDto, User>();
            CreateMap<RegisterDto, User>()
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => Encoding.ASCII.GetBytes(src.Password)));
        }

        private bool CanTenantBeRemoved(Tenant tenant) => !tenant.ApartmentTenant.Any();
        private bool CanApartmentBeRemoved(Apartment apartment) => !apartment.ApartmentTenant.Any();
    }
}
