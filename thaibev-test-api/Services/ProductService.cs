using Microsoft.EntityFrameworkCore;
using thaibev_test_api.Data;
using thaibev_test_api.Models;

namespace thaibev_test_api.Services;

public interface IProductService
{
    Task<ProductResponse> GetAllProduct();
    Task<ProductResponse> CreateStudyPeriod(Product data);
    Task<ProductResponse> DeleteProduct(Product data);
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
            result.result = false;
            //validate
            string message = validateProduct(data);
            
            if (string.IsNullOrEmpty(message))
            {
                _context.Products.Add(new Product
                {
                    code = data.code,
                    is_active = 1,
                    create_at = DateTime.Now,
                    create_by = "test"
                });

                await _context.SaveChangesAsync();
                message = "บันทึกรายการสินค้าสำเร็จ";
                result.result = true;
            }

            result.message = message;

            return result;
        }
        catch (Exception)
        {
            result.result = false;
            result.message = "บันทึกรายการสินค้าไม่สำเร็จ";
            result.data = null;

            return result;
        }
    }

    public async Task<ProductResponse> DeleteProduct(Product data) {
        ProductResponse result = new();
        try 
        {
            result.result = false;

            //validate
            string message = validateProduct(data);
            
            if (string.IsNullOrEmpty(message))
            {
                var product = await _context.Products.Where(w => w.id == data.id).FirstOrDefaultAsync();
                if (product != null)
                {
                    product.is_active = 0;

                    _context.Products.Update(product);
                    _context.SaveChanges();

                    result.result = true;
                    message = "ลบรายการสินค้าสำเร็จ";
                }
                else
                {
                    message = "ไม่พบรายการสินค้าที่ต้องการลบ";
                }
            }
            result.message = message;

            return result;
        }
        catch (Exception)
        {
            result.result = false;
            result.message = "ลบรายการสินค้าไม่สำเร็จ";
            result.data = null;

            return result;
        }
    }

    private string validateProduct(Product data)
    {
        string msg = string.Empty;
        if (data == null) msg = "ไม่พบรายการสินค้า";
        else if (string.IsNullOrEmpty(data.code)) msg = "กรุณาระบุรหัสสินค้า";
        //else if (!string.IsNullOrEmpty(data.code) && )

        return msg;
    }
}