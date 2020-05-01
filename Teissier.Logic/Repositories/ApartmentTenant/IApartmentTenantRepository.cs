using System;
using System.Collections.Generic;
using System.Text;
using Teissier.DAL.Entities;
using Teissier.Logic.Dtos;

namespace Teissier.Logic.Interfaces
{
    public interface IApartmentTenantRepository
    {
        ApartmentTenant Get(int id);
        ApartmentTenantDto GetDto(int id);
        List<ApartmentTenantDto> GetAll();
        ApartmentTenantDto Add(ApartmentTenantDto item);
        void Delete(int id);
        ApartmentTenantDto Update(ApartmentTenantDto tenant);
    }
}
