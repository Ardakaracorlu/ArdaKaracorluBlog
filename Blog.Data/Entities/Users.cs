using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Data.Entities
{
    [Table("USERS")]
    public class Users:IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int Status { get; set; }
    }
}
