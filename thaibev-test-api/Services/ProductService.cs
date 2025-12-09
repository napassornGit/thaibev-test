using Microsoft.EntityFrameworkCore;
using thaibev_test_api.Data;
using thaibev_test_api.Models;

namespace thaibev_test_api.Services;

public interface IProductService
{
    Task<List<Product>> GetAllProduct();
}

public class ProductService(AppDbContext context) : IProductService
{
    private readonly AppDbContext _context = context;
    
    public async Task<List<Product>> GetAllProduct()
    {
        return await _context.Products
            .OrderBy(x => x.id)
            .ToListAsync();
    }
}