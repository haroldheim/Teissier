using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using Teissier.Logic.Dtos;
using Teissier.Logic.Interfaces;
using Teissier.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Teissier.Logic.Services
{
    public class ApartmentRepository : IApartmentRepository
    {
        private readonly IMapper _mapper;
        private readonly TeissierContext _dbContext;

        public ApartmentRepository(IMapper mapper,
                            TeissierContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public Apartment Get(int id)
        {
            return this.GetQueryableApartment().Where(t => t.Id == id).FirstOrDefault();
        }

        public ApartmentDto GetDto(int id)
        {
            return this.GetQueryableApartment().Where(t => t.Id == id).Select(t => _mapper.Map<ApartmentDto>(t)).FirstOrDefault();
        }

        public List<ApartmentDto> GetAll()
        {
            return this.GetQueryableApartment().Select(t => _mapper.Map<ApartmentDto>(t)).ToList();
        }

        public ApartmentDto Add(ApartmentDto item)
        {
            Apartment tenant = _mapper.Map<Apartment>(item);
            _dbContext.Apartment.Add(tenant);
            _dbContext.SaveChanges();

            return GetDto(tenant.Id);
        }

        public void Delete(int id)
        {
            Apartment tenant = Get(id);
            if (tenant == null)
            {
                throw new Exception("Item could not be removed");
            }
            _dbContext.Apartment.Remove(tenant);
            _dbContext.SaveChanges();
        }

        public ApartmentDto Update(ApartmentDto tenant)
        {
            Apartment tenantToUpdate = Get(tenant.Id);
            _dbContext.Entry(tenantToUpdate).CurrentValues.SetValues(_mapper.Map<Apartment>(tenant));
            _dbContext.SaveChanges();
            return _mapper.Map<ApartmentDto>(tenantToUpdate);
        }

        public IQueryable<Apartment> GetQueryableApartment()
        {
            return this._dbContext.Apartment.Include(x => x.ApartmentTenant);
        }
    }
}
