using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using Teissier.Logic.Dtos;
using Teissier.Logic.Interfaces;
using Teissier.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Teissier.Logic.Enums;

namespace Teissier.Logic.Services
{
    public class RecordRepository : IRecordRepository
    {
        private readonly IMapper _mapper;
        private readonly TeissierContext _dbContext;

        public RecordRepository(IMapper mapper,
                            TeissierContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public RecordDto GetDto(int id)
        {
            return this.GetQueryableRecord().Where(t => t.Id == id).Select(t => _mapper.Map<RecordDto>(t)).FirstOrDefault();
        }

        public List<RecordDto> Get(int apartmentTenantId)
        {
            List<RecordDto> records = this.GetQueryableRecord()
                .Where(x => x.ApartementTenantId == apartmentTenantId)
                .Select(x => _mapper.Map<RecordDto>(x))
                .OrderBy(x => x.Date)
                .ToList();

            return this.ProcessTotal(records);
        }

        private List<RecordDto> ProcessTotal(List<RecordDto> records)
        {
            decimal total = 0;

            foreach (var record in records)
            {
                if(record.Type == (int)RecordTypeEnum.Debit)
                {
                    total -= record.Amount;
                } else if(record.Type == (int)RecordTypeEnum.Credit)
                {
                    total += record.Amount;
                }
                record.Total = total;
            }

            return records;
        }

        public RecordDto Add(RecordDto item)
        {
            Record record = _mapper.Map<Record>(item);
            _dbContext.Record.Add(record);
            _dbContext.SaveChanges();

            return GetDto(record.Id);
        }

        private IQueryable<Record> GetQueryableRecord()
        {
            return this._dbContext.Record.Include(x => x.ApartementTenant);
        }

        public void GenerateReceipt(ReceiptDto item)
        {
            List<ApartmentTenantDto> apartmentTenants = _dbContext.ApartmentTenant.Select(x => _mapper.Map<ApartmentTenantDto>(x)).ToList();

            List<Record> recordsToAdd = apartmentTenants.Select(x => new Record
            {
                Date = item.Date,
                Amount = x.Rent,
                ApartementTenantId = x.Id,
                Label = "Quittance loyer",
                Type = (int)RecordTypeEnum.Debit,
            }).ToList();

            if(recordsToAdd.Any())
            {
                _dbContext.Record.AddRange(recordsToAdd);
                _dbContext.SaveChanges();
            }
        }
    }
}
