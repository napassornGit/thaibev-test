using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using thaibev_test_api.Data;
using thaibev_test_api.Models;

namespace thaibev_test_api.Services;

public interface IProductService
{
    Task<ProductResponse> GetAllProduct();
    Task<ProductResponse> CreateStudyPeriod(Product data);
    Task<ProductResponse> DeleteProduct(int productId);
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
                var dupCode = _context.Products.Where(w => w.code == data.code.Trim()).FirstOrDefault();
                if (dupCode != null)
                {
                    result.message = "มีรหัสสินค้านี้อยู่แล้ว";
                    result.result = false;
                    return result;
                }
                int nextId = _context.Products.AsEnumerable().Select(s => s.id).DefaultIfEmpty(0).Max().GetValueOrDefault() + 1;
                _context.Products.Add(new Product
                {
                    id = nextId,
                    code = data.code,
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

    public async Task<ProductResponse> DeleteProduct(int productId) {
        ProductResponse result = new();
        try 
        {
            result.result = false;
            string message = string.Empty;

            if (productId > 0)
            {
                var product = await _context.Products.Where(w => w.id == productId).FirstOrDefaultAsync();
                if (product != null)
                {
                    _context.Products.Remove(product);
                    _context.SaveChanges();

                    result.result = true;
                    message = "ลบรายการสินค้าสำเร็จ";
                }
                else message = "ไม่พบรายการสินค้าที่ต้องการลบ";
            }
            else message = "ไม่พบรายการสินค้าที่ต้องการลบ";

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
        if (data == null) return "ไม่พบรายการสินค้า";
        else if (string.IsNullOrEmpty(data.code)) return "กรุณาระบุรหัสสินค้า";
        else if (data.code.Length != 35 || !Regex.IsMatch(data.code, @"^[A-Z0-9]{5}(-[A-Z0-9]{5}){5}$")) return "รูปแบบรหัสสินค้าไม่ถูกต้อง";

        return string.Empty;
    }
}