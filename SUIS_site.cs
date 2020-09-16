﻿using Npgsql;
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
            Site_name = Query_getSiteName();
            Size_Bt = new DirectoryInfo(path).EnumerateFiles("*", SearchOption.AllDirectories).Sum(f => f.Length);
            CompareAppData();
        }

        /// <summary>
        /// returns (string)DB_name from {path}/web.config
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

        /// <summary>
        /// returns (string)Site_name from PostgreSQL
        /// </summary>
        private string Query_getSiteName()
        {
            string res = string.Empty;
            using (NpgsqlConnection connection = new NpgsqlConnection(Core.PG_connStr.Replace("{DB_name}", DB_name)))
            {
                string query = "SELECT \"Value\" FROM \"public\".\"sd4_StringSetting\" WHERE id = (SELECT id FROM \"public\".\"sd4_SettingBase\" WHERE \"Name\" = 'SiteName')";
                NpgsqlCommand command = new NpgsqlCommand(query, connection);
                connection.Open();
                res = command.ExecuteScalar().ToString();
            }
            if (string.IsNullOrEmpty(res)) throw new NpgsqlException("SiteName IsNullOrEmpty");
            return res;
        }

        /// <summary>
        /// saves new {path}/AppData/ if needed and restores missing files
        /// </summary>
        private void CompareAppData()
        {
            string[] backUps = Directory.GetDirectories(@"D:\backup_SUIS", "*", SearchOption.TopDirectoryOnly);
            foreach (string bkp in backUps)
            {
                if (Path.GetFileName(bkp) == Dir_name)
                {
                    Console.WriteLine("yee");
                }
            }
            //foreach (FileInfo f in new DirectoryInfo(Abs_path).EnumerateFiles("*", SearchOption.TopDirectoryOnly))
            //{
            //    Console.WriteLine(f.Name);
            //}
        }
    }
}
