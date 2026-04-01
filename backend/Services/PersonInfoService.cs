using System.Globalization;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public interface IPersonInfoService
{
    Task<PersonResponse<List<PersonInfo>>> GetAllPersonInfo();
    Task<PersonResponse> CreatePersonInfo(PersonInfo data);
}

public class PersonInfoService(AppDbContext context) : IPersonInfoService
{
    private readonly AppDbContext _context = context;

    public async Task<PersonResponse<List<PersonInfo>>> GetAllPersonInfo()
    {
        var result = new PersonResponse<List<PersonInfo>>();

        try
        {
            var currentYear = DateTime.Now.Year;

            var data = await _context.Persons.Select(s => new PersonInfo
            {
                id = EncodeId(s.Id),
                name = s.Name,
                lastName = s.LastName,
                address = s.Address,
                birthDate = s.BirthDate.ToString("dd/MM/yyyy"),
                birthDateText = s.BirthDate.ToString("dd MMM yyyy", new CultureInfo("th-TH")),
                age = (currentYear - s.BirthDate.Year).ToString()
            }).ToListAsync();

            result.Code = 200;
            result.Message = "Success";
            result.Result = data.Count > 0;
            result.Total = data.Count;
            result.Data = data;
        }
        catch (Exception)
        {
            result.Code = 500;
            result.Result = false;
            result.Message = "Get Person Info Error!";
            result.Data = new List<PersonInfo>();
        }

        return result;
    }

    public async Task<PersonResponse> CreatePersonInfo(PersonInfo data)
    {
        var result = new PersonResponse();

        try
        {
            //validate
            result = validateProduct(data);
            if (!result.Result) return result;

            if (data != null)
            {
                DateTime birthDate;
                bool isValidDate = DateTime.TryParseExact(
                   data.birthDate,
                   "dd/MM/yyyy",
                   CultureInfo.InvariantCulture,
                   DateTimeStyles.None,
                   out birthDate
               );
                _context.Persons.Add(new Person
                {
                    Name = data.name,
                    LastName = data.lastName,
                    Address = data.address,
                    BirthDate = birthDate
                });
                await _context.SaveChangesAsync();
            }
            else
            {
                result.Code = 200;
                result.Message = "Invalid Data.";
                result.Result = false;
                return result;
            }

            result.Code = 200;
            result.Message = "Save Person Info Success";
            result.Result = true;
            result.Total = 0;
        }
        catch (Exception)
        {
            result.Code = 500;
            result.Result = false;
            result.Message = "Create Person Info Error!";
        }

        return result;
    }

    private PersonResponse validateProduct(PersonInfo data)
    {
        var result = new PersonResponse();
        result.Result = true;
        if (string.IsNullOrEmpty(data.name))
        {
            result.Code = 200;
            result.Message = "Invalid Name.";
            result.Result = false;
        }
        else if (string.IsNullOrEmpty(data.lastName)) {
            result.Code = 200;
            result.Message = "Invalid Last Name.";
            result.Result = false;
        }
        else if (string.IsNullOrEmpty(data.birthDate))
        {
            result.Code = 200;
            result.Message = "Invalid BirthDate.";
            result.Result = false;
        }
        else if (string.IsNullOrEmpty(data.address))
        {
            result.Code = 200;
            result.Message = "Invalid Address.";
            result.Result = false;
        }
        return result;
    }

    public static string EncodeId(int id)
    {
        var bytes = System.Text.Encoding.UTF8.GetBytes(id.ToString());
        return Convert.ToBase64String(bytes);
    }

    public static int DecodeId(string encodedId)
    {
        var bytes = Convert.FromBase64String(encodedId);
        var stringId = System.Text.Encoding.UTF8.GetString(bytes);
        return int.Parse(stringId);
    }
}
