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
        public long Size { get; }

        public SUIS_site(string path)
        {
            Path = path;
            Name = path.Split(new char[] { '\\' }, StringSplitOptions.None).Last();
            DBname = GetDBname();
            Size = new DirectoryInfo(path).EnumerateFiles("*", SearchOption.AllDirectories).Sum(f => f.Length);
            //Size = new DirectoryInfo(System.IO.Path.Combine(path, "App_Data")).EnumerateFiles("*", SearchOption.AllDirectories).Sum(f => f.Length);
        }

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
