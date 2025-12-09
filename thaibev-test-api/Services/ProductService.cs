using Microsoft.EntityFrameworkCore;
using thaibev_test_api.Data;
using thaibev_test_api.Models;

namespace thaibev_test_api.Services;

public interface IProductService
{
    Task<ProductResponse> GetAllProduct();
    Task<ProductResponse> CreateStudyPeriod(Product data);
}

public class ProductService(AppDbContext context) : IProductService
{
    private readonly AppDbContext _context = context;

    public async Task<ProductResponse> GetAllProduct()
    {
        ProductResponse result = new();
        var lstProduct = await _context.Products
                        .Select(s => new Product {
                            id = s.id,
                            code = s.code,
                            create_at = s.create_at,
                            create_by = s.create_by
                        })
                        .OrderBy(x => x.id)
                        .ToListAsync();
        
        result.result = lstProduct != null && lstProduct.Count > 0;
        result.message = lstProduct != null && lstProduct.Count > 0 ? "พบข้อมูล" : "ไม่พบข้อมูล";
        result.data = lstProduct;

        return result;
    }

    public async Task<ProductResponse> CreateStudyPeriod(Product data) {
        ProductResponse result = new();
        try 
        {
            var lstProduct = await _context.Products
                            .Select(s => new Product {
                                id = s.id,
                                code = s.code,
                                create_at = s.create_at,
                                create_by = s.create_by
                            })
                            .OrderBy(x => x.id)
                            .ToListAsync();

            result.result = true;
            result.message = "บันทึกสำเร็จ";
            result.data = lstProduct;

            return result;
        }
        catch (Exception)
        {
            result.result = false;
            result.message = "บันทึกไม่สำเร็จ";
            result.data = null;

            return result;
        }
    }
}