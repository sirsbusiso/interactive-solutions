using System;
using System.Collections.Generic;

namespace InteractiveSolutions.Models
{
    public partial class Document
    {
        public int Id { get; set; }
        public int? CustId { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public string FileAsBase64 { get; set; }
        public byte[] File { get; set; }
        public DateTime? DateAdded { get; set; }
    }
}
