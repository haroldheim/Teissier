using AutoMapper;
using AutoMapper.QueryableExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using Teissier.Logic.Dtos;
using Teissier.DAL.Entities;
using Teissier.Logic.Interfaces;
using Microsoft.EntityFrameworkCore;
using Teissier.Logic.Enums;

namespace Teissier.Logic.Services
{
    public class ApartmentTenantRepository : IApartmentTenantRepository
    {
        private readonly IMapper _mapper;
        private readonly TeissierContext _dbContext;

        public ApartmentTenantRepository(IMapper mapper,
                            TeissierContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public ApartmentTenant Get(int id)
        {
            return this.GetQueryableApartmentTenant().Where(t => t.Id == id).FirstOrDefault();
        }

        public ApartmentTenantDto GetDto(int id)
        {
            return this.GetQueryableApartmentTenant().Where(t => t.Id == id).Select(t => _mapper.Map<ApartmentTenantDto>(t)).FirstOrDefault();
        }

        public List<ApartmentTenantDto> GetAll()
        {
            List<ApartmentTenantDto> dtos = this.GetQueryableApartmentTenant().Select(t => _mapper.Map<ApartmentTenantDto>(t)).ToList();

            return this.ProcessBalance(dtos);
        }

        private List<ApartmentTenantDto> ProcessBalance(List<ApartmentTenantDto> apps)
        {
            foreach (var app in apps)
            {
                decimal balance = 0;
                foreach (var record in app.Record)
                {
                    if (record.Type == (int)RecordTypeEnum.Credit)
                    {
                        balance += record.Amount;
                    } else if(record.Type == (int)RecordTypeEnum.Debit)
                    {
                        balance -= record.Amount;
                    }
                }
                app.Balance = balance;
            }

            return apps;
        }

        public ApartmentTenantDto Add(ApartmentTenantDto item)
        {
            ApartmentTenant tenant = _mapper.Map<ApartmentTenant>(item);
            _dbContext.ApartmentTenant.Add(tenant);
            _dbContext.SaveChanges();

            return GetDto(tenant.Id);
        }

        public void Delete(int id)
        {
            ApartmentTenant tenant = Get(id);
            if (tenant == null)
            {
                throw new Exception("Item could not be removed");
            }
            _dbContext.ApartmentTenant.Remove(tenant);
            _dbContext.SaveChanges();
        }

        public ApartmentTenantDto Update(ApartmentTenantDto tenant)
        {
            ApartmentTenant tenantToUpdate = Get(tenant.Id);
            _dbContext.Entry(tenantToUpdate).CurrentValues.SetValues(_mapper.Map<ApartmentTenant>(tenant));
            _dbContext.SaveChanges();
            return _mapper.Map<ApartmentTenantDto>(tenantToUpdate);
        }

        public IQueryable<ApartmentTenant> GetQueryableApartmentTenant()
        {
            return this._dbContext.ApartmentTenant
                .Include(x => x.Apartment)
                .Include(x => x.Tenant)
                .Include(x => x.Record);
        }
    }
}
