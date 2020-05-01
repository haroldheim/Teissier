using AutoMapper;
using AutoMapper.QueryableExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Teissier.Logic.Dtos;
using Teissier.Logic.Interfaces;
using Teissier.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Teissier.Logic.Services
{
    public class TenantRepository : ITenantRepository
    {
        private readonly IMapper _mapper;
        private readonly TeissierContext _dbContext;

        public TenantRepository(IMapper mapper,
                            TeissierContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public Tenant Get(int id)
        {
            return this.GetQueryableTenant().Where(t => t.Id == id).FirstOrDefault();
        }

        public TenantDto GetDto(int id)
        {
            return this.GetQueryableTenant().Where(t => t.Id == id).Select(t => _mapper.Map<TenantDto>(t)).FirstOrDefault();
        }

        public List<TenantDto> GetAll()
        {
            return this.GetQueryableTenant().Select(t => _mapper.Map<TenantDto>(t)).ToList();
        }

        public TenantDto Add(TenantDto item)
        {
            Tenant tenant = _mapper.Map<Tenant>(item);
            _dbContext.Tenant.Add(tenant);
            _dbContext.SaveChanges();

            return GetDto(tenant.Id);
        }

        public void Delete(int id)
        {
            Tenant tenant = Get(id);
            if (tenant == null)
            {
                throw new Exception("Item could not be removed");
            }
            _dbContext.Tenant.Remove(tenant);
            _dbContext.SaveChanges();
        }

        public TenantDto Update(TenantDto tenant)
        {
            Tenant tenantToUpdate = Get(tenant.Id);
            _dbContext.Entry(tenantToUpdate).CurrentValues.SetValues(_mapper.Map<Tenant>(tenant));
            _dbContext.SaveChanges();
            return _mapper.Map<TenantDto>(tenantToUpdate);
        }

        public IQueryable<Tenant> GetQueryableTenant()
        {
            return this._dbContext.Tenant.Include(x => x.ApartmentTenant);
        }
    }
}
