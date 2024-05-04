namespace EmployeeManagerAPI.Services.Interface
{
    public interface IBCrypt
    {
        string HashPassword(string password);
        bool VerifyPassword(string password, string hashedPassword);
    }
}
