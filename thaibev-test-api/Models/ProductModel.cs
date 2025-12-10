namespace thaibev_test_api.Models;

public class Product
{
    public int? id { get; set; }
    public string code { get; set; } = string.Empty;
    public DateTime? create_at { get; set; }
    public string? create_by { get; set; } = string.Empty;
}

public class ProductResponse {
    public bool result { get; set; }
    public int statusCode { get; set; }
    public string message { get; set; } = string.Empty;
    public List<Product>? data { get; set; }
}