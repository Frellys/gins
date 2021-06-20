using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace SUIS_FileReplace
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                List<string> siteDirs = Directory.GetDirectories(@"C:\Hosting\region74").ToList();
                List<string> itemsToAdd = new List<string>(new string[] {
                    "<!--override-start-->",
                    @"<script src=""https://mitis74.eps74.ru/override/SUIS_override.js""></script>",
                    @"<script src=""https://mitis74.eps74.ru/override/jquery-min.js""></script>",
                    @"<script src=""https://mitis74.eps74.ru/override/jquery.lbslider.js""></script>",
                    @"<script src=""https://mitis74.eps74.ru/override/jquery.colorbox-min.js""></script>",
                    @"<script src=""https://mitis74.eps74.ru/override/validateInternetReception.js""></script>",
                    @"<script src=""https://mitis74.eps74.ru/override/bootstrap.min.js""></script>",
                    @"<link href=""https://mitis74.eps74.ru/override/bootstrap.min.css"" rel=""stylesheet""></link>",
                    @"<link href=""https://mitis74.eps74.ru/override/colorbox.css"" rel=""stylesheet"" media=""print,screen,projection""></link>",
                    @"<link href=""https://mitis74.eps74.ru/override/font-awesome.min.css"" rel=""stylesheet"" media=""screen""></link>",
                    "<!--override-end-->"
                });
                foreach (string siteDir in siteDirs)
                {
                    Console.WriteLine(siteDir);
                    //if (siteDir == @"C:\Hosting\region74\authority74")
                    //{
                    //}
                    string masterPath = Path.Combine(siteDir, "Areas", "Base", "Site.master");
                    if (File.Exists(masterPath))
                    {
                        List<string> masterContent = File.ReadAllLines(masterPath).ToList();
                        int headStartIndex = -1;
                        int prevOverrideStart = -1;
                        int prevOverrideEnd = -2;
                        List<int> rmdx = new List<int>();
                        for (int ldx = 0; ldx < masterContent.Count; ldx++)
                        {
                            string line = masterContent[ldx];
                            // get head index
                            if (line.Contains("<head>")) headStartIndex = ldx;
                            // get previous override start
                            if (line.Contains("<!--override-start-->")) prevOverrideStart = ldx;
                            // get previous override end
                            if (line.Contains("<!--override-end-->")) { prevOverrideEnd = ldx; break; }
                        }
                        // remove previous override
                        if (prevOverrideStart != -1 && prevOverrideEnd != -1)
                        {
                            for (int i = prevOverrideEnd; i >= prevOverrideStart; i--)
                            {
                                masterContent.RemoveAt(i);
                            }
                        }
                        for (int ldx = 0; ldx < masterContent.Count; ldx++)
                        {
                            string line = masterContent[ldx];
                            // remove bootstrap
                            if (line.Contains("bootstrap")) { rmdx.Insert(0, ldx); continue; }
                            // remove colorbox
                            if (line.Contains("colorbox.css")) { rmdx.Insert(0, ldx); continue; }
                            // remove colorbox
                            if (line.Contains("font-awesome.min.css")) { rmdx.Insert(0, ldx); continue; }
                            // remove jquery
                            if (line.Contains("jquery")) { rmdx.Insert(0, ldx); continue; }
                            // remove old override
                            if (line.Contains("SUIS_override.js")) { rmdx.Insert(0, ldx); continue; }
                            // stop at </head>
                            if (line.Contains("</head>")) break;
                        }
                        // actually remove
                        foreach (int index in rmdx)
                        {
                            masterContent.RemoveAt(index);
                        }
                        // insert override
                        if (headStartIndex != -1)
                        {
                            foreach (string item in itemsToAdd)
                            {
                                masterContent.Insert(++headStartIndex, "\t" + item);
                            }
                        }
                        // write changes
                        File.WriteAllLines(masterPath, masterContent, Encoding.UTF8);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            // await
            Console.WriteLine(string.Empty);
            Console.WriteLine("press Enter to exit ...");
            Console.ReadLine();
        }
    }
}