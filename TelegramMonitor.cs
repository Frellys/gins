using Bots;
using System;
using System.Configuration;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using OfficeOpenXml;

namespace TelegramMonitor {
    class Site {
        public string DB_name;
        public string ID;
        public string IIS_Name;
        public List<string> Links;
        public Site(string iis_name, string id, List<string> links)
        {
            IIS_Name = iis_name;
            ID = id;
            Links = links;
        }
    }
    class Program {
        static async Task Main(string[] args)
        {
            //TelegramBot bot = new TelegramBot(CFG("TG_APIKEY"), CFG("TG_CHATID"));
            //string response = await bot.SendMessageAsync("");
            foreach (Site site in GetSites())
            {
                foreach (string link in site.Links)
                {
                    // LOGIC HERE
                }
            }
            // await
            Console.WriteLine(string.Empty);
            Console.WriteLine("press Enter to exit ...");
            Console.ReadLine();
        }

        /// <summary>
        /// get App.config key
        /// </summary>
        /// <param name="key"></param>
        private static string CFG(string key)
        {
            return ConfigurationManager.AppSettings[key];
        }

        /// <summary>
        /// get Sites from App.config["PATH_TO_SITES"]
        /// </summary>
        /// <returns></returns>
        private static List<Site> GetSites()
        {
            List<Site> ret = new List<Site>();
            string path = Path.Combine(AppContext.BaseDirectory + CFG("PATH_TO_SITES"));
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (ExcelPackage package = new ExcelPackage(new FileInfo(path)))
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets.First();
                int totalRows = worksheet.Dimension.End.Row;
                int totalColumns = worksheet.Dimension.End.Column;
                for (int rNum = 2; rNum <= totalRows; rNum++)
                {
                    ret.Add(new Site(
                        worksheet.Cells[rNum, 3].Value.ToString(),
                        worksheet.Cells[rNum, 4].Value.ToString(),
                        worksheet.Cells[rNum, 6].Value.ToString().Split(' ').ToList()));
                }
            }
            return ret;
        }
    }
}
