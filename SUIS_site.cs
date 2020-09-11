using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace get_SUIS_dir_volume
{
    class SUIS_site
    {
        public string Name { get; }
        public string Path { get; }
        public string DBname { get; }
        public long Size_Bt{ get; }
        public long Size_Kb { get => Size_Bt / 1024; }
        public long Size_Mb { get => Size_Kb / 1024; }
        public long Size_Gb { get => Size_Mb / 1024; }

        /// <summary>
        /// Retrieves SUIS site data
        /// </summary>
        /// <param name="path">
        /// absolute path to the site folder
        /// </param>
        public SUIS_site(string path)
        {
            Path = path;
            Name = path.Split(new char[] { '\\' }, StringSplitOptions.None).Last();
            DBname = GetDBname();
            Size_Bt = new DirectoryInfo(path).EnumerateFiles("*", SearchOption.AllDirectories).Sum(f => f.Length);
            //Size = new DirectoryInfo(System.IO.Path.Combine(path, "App_Data")).EnumerateFiles("*", SearchOption.AllDirectories).Sum(f => f.Length);
        }

        /// <summary>
        /// returns (string)DBname from {path}/web.config
        /// </summary>
        private string GetDBname()
        {
            string configPath = System.IO.Path.Combine(Path, "web.config");
            string dbName = File.ReadAllText(configPath)
                .Split(new string[] { "Database=" }, StringSplitOptions.None)[1]
                .Split(new char[] { '"' }, StringSplitOptions.None)[0]
                .Replace(";", "");
            return dbName;
        }
    }
}
