using System;
using System.Collections.Generic;
using System.Text;
using Teissier.Logic.Dtos;
using Teissier.DAL.Entities;


namespace Teissier.Logic.Interfaces
{
    public interface IApartmentRepository
    {
        Apartment Get(int id);
        ApartmentDto GetDto(int id);
        List<ApartmentDto> GetAll();
        ApartmentDto Add(ApartmentDto item);
        void Delete(int id);
        ApartmentDto Update(ApartmentDto tenant);
    }
}
