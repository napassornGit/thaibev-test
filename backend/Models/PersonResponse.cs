public class PersonResponse
{
    public int Code { get; set; }
    public string Message { get; set; } = string.Empty;
    public int Total { get; set; }
    public bool Result { get; set; }
}

public class PersonResponse<T> : PersonResponse
{
    public T? Data { get; set; }
}