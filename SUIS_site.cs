using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace backupSites
{
    class SUIS_site
    {
        public string Abs_path { get; }
        public string Dir_name { get; }
        public string DB_name { get; }
        public string Site_name { get; }
        public decimal Size_Bt { get; }
        public decimal Size_Kb { get => Math.Round(Size_Bt / 1024, 0); }
        public decimal Size_Mb { get => Math.Round(Size_Kb / 1024, 0); }
        public decimal Size_Gb { get => Math.Round(Size_Mb / 1024, 1); }

        /// <summary>
        /// Retrieves SUIS site data
        /// </summary>
        /// <param name="path">
        /// absolute path to the site folder
        /// </param>
        public SUIS_site(string path)
        {
            Abs_path = path;
            Dir_name = path.Split(new char[] { '\\' }, StringSplitOptions.None).Last();
            DB_name = GetDBname();
            Site_name = "";
            Size_Bt = new DirectoryInfo(path).EnumerateFiles("*", SearchOption.AllDirectories).Sum(f => f.Length);
        }

        /// <summary>
        /// returns (string)DBname from {path}/web.config
        /// </summary>
        private string GetDBname()
        {
            string configPath = Path.Combine(Abs_path, "web.config");
            string dbName = File.ReadAllText(configPath)
                .Split(new string[] { "Database=" }, StringSplitOptions.None)[1]
                .Split(new char[] { '"' }, StringSplitOptions.None)[0];
            if (dbName.Contains(';'))
            {
                dbName = dbName.Split(new char[] { ';' }, StringSplitOptions.None)[0];
            }
            return dbName;
        }
    }
}
