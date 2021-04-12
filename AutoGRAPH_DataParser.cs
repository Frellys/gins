using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;

namespace AutoGRAPH_DataParser
{
    public static class App
    {
        public class Settings
        {
            public string ENCODING { get; set; }
            public string INPUT_INI_FOLDER { get; set; }
            public string OUTPUT_FOLDER { get; set; }
            public string PATH_TO_DATA { get; set; }
        }
        public static Settings settings = JsonSerializer.Deserialize<Settings>(File.ReadAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "settings.json")));
    }
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
                foreach (string input_File in Directory.GetFiles(App.settings.INPUT_INI_FOLDER, "*", SearchOption.AllDirectories))
                {
                    List<string> rows = File.ReadAllLines(input_File, Encoding.GetEncoding(App.settings.ENCODING)).ToList();
                    string name = rows.Find(row => row.StartsWith("Name")).Split("Name=").Last().Trim();
                    List<string> ids = rows.Where(row => row.StartsWith("[")).Select(row => row[1..(row.Length - 1)]).Where(x => x.All(char.IsDigit)).ToList();
                    List<string> output_file = ids.Select(id =>
                    {
                        string target_File = Path.Combine(App.settings.PATH_TO_DATA, id);
                        if (Directory.Exists(target_File))
                        {
                            List<string> files = Directory.GetFiles(target_File, "*", SearchOption.AllDirectories).ToList();
                            if (files.Count != 0)
                            {
                                return id + "\t" + files.Select(f => File.GetLastWriteTime(f)).OrderBy(d => d).Last().ToString("dd/MM/yyyy HH:mm");
                            }
                            else
                            {
                                return (id + "\tDIRECTORY EMPTY");
                            }
                        }
                        else
                        {
                            return (id + "\tDIRECTORY DOES NOT EXIST");
                        }
                    }).Prepend(name).ToList();
                    File.WriteAllLines(Path.Combine(App.settings.OUTPUT_FOLDER, Path.GetFileNameWithoutExtension(input_File) + DateTime.Now.ToString("_yyyy_MM_dd_HH_mm") + ".txt"), output_file, Encoding.GetEncoding(App.settings.ENCODING));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            // await
            Console.WriteLine(string.Empty);
            Console.WriteLine("press enter to exit ...");
            Console.ReadLine();
        }
    }
}
