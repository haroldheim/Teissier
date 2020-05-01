using System;
using System.Collections.Generic;
using System.Text;
using Teissier.Logic.Dtos;
using Teissier.DAL.Entities;


namespace Teissier.Logic.Interfaces
{
    public interface IRecordRepository
    {
        List<RecordDto> Get(int apartmentTenantId);
        RecordDto Add(RecordDto item);
        void GenerateReceipt(ReceiptDto item);
    }
}
