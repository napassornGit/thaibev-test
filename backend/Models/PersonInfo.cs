namespace backend.Models;

public class Person
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; }
}

public class PersonInfo
{
    public string id { get; set; } = string.Empty;
    public string name { get; set; } = string.Empty;
    public string lastName { get; set; } = string.Empty;
    public string address { get; set; } = string.Empty;
    public string birthDate { get; set; } = string.Empty;
    public string birthDateText { get; set; } = string.Empty;
    public string age { get; set; } = string.Empty;
}
