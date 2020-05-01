using System;
using System.Collections.Generic;
using System.Text;
using Teissier.DAL.Entities;
using Teissier.Logic.Dtos;

namespace Teissier.Logic.Interfaces
{
    public interface ITenantRepository
    {
        Tenant Get(int id);
        TenantDto GetDto(int id);
        List<TenantDto> GetAll();
        TenantDto Add(TenantDto item);
        void Delete(int id);
        TenantDto Update(TenantDto tenant);
    }
}
