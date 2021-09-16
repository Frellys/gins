using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;

namespace SUIS_CompressFiles
{
    class Logger
    {
        /// <summary>
        /// Container to store logs
        /// </summary>
        List<string> arr;

        /// <summary>
        /// Init Logger
        /// </summary>
        public Logger()
        {
            arr = new List<string>();
        }

        /// <summary>
        /// adds row to Logger
        /// </summary>
        /// <param name="s"></param>
        public void Add(string[] data)
        {
            foreach (string s in data)
            {
                arr.Add(s);
                Console.WriteLine(s);
            }
        }

        /// <summary>
        /// Save Logger contents, obv
        /// </summary>
        public void Save()
        {
            File.WriteAllLines(Path.Combine(AppContext.BaseDirectory, $"{DateTime.Now.Ticks}.txt"), arr, System.Text.Encoding.UTF8);
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Dictionary<string, ImageFormat> iFormat = new Dictionary<string, ImageFormat>
            {
                { ".png", ImageFormat.Png },
                { ".jpg", ImageFormat.Jpeg }
            };
            Logger logger = new Logger();
            try
            {
                long cap = 4 * (int)Math.Pow(2, 20);
                string root = @"C:\Hosting\region74";
                List<string> siteDirs = Directory.GetDirectories(root, "*", SearchOption.TopDirectoryOnly).Where(s => Directory.Exists(Path.Combine(s, "Upload"))).ToList();
                foreach (string siteDir in siteDirs)
                {
                    logger.Add(new string[] {
                        "***     SITE: " + siteDir
                    });
                    string AppDataDir = Path.Combine(siteDir, "App_Data");
                    if (Directory.Exists(AppDataDir))
                    {
                        foreach (string file in Directory.GetFiles(AppDataDir, "*", SearchOption.AllDirectories))
                        {
                            long size = new FileInfo(file).Length;
                            if (size > cap)
                            {
                                string ext = Path.GetExtension(file).ToLower();
                                if (ext == ".jpg" || ext == ".png")
                                {
                                    // move original
                                    string decomp = Path.Combine(Path.GetDirectoryName(file), "_decomp_" + Path.GetFileName(file));
                                    Console.WriteLine(decomp);
                                    File.Move(file, decomp);
                                    // compress
                                    Bitmap b = new Bitmap(decomp);
                                    ImageCodecInfo c = ImageCodecInfo.GetImageDecoders().ToList().Find(d => d.FormatID == iFormat[ext].Guid);
                                    EncoderParameters eps = new EncoderParameters(1);
                                    EncoderParameter ep = new EncoderParameter(Encoder.Quality, 50L);
                                    eps.Param[0] = ep;
                                    b.Save(file, c, eps);
                                    b.Dispose();
                                    // delete old
                                    File.Delete(decomp);
                                    // log
                                    logger.Add(new string[] {
                                        file,
                                        size.ToString()
                                    });
                                }
                            }
                        }
                    }
                    else
                    {
                        logger.Add(new string[] { "*** APP_DATA: NO FOLDER" });
                    }
                    string uploadDir = Path.Combine(siteDir, "Upload");
                    if (Directory.Exists(uploadDir))
                    {
                        string uploadFiles = Path.Combine(uploadDir, "files");
                        string uploadImages = Path.Combine(uploadDir, "images");
                        if (Directory.Exists(uploadFiles))
                        {
                            /*
                             * maybe later
                             */
                        }
                        else
                        {
                            logger.Add(new string[] { "***    FILES: NO FOLDER" });
                        }
                        if (Directory.Exists(uploadImages))
                        {
                            foreach (string image in Directory.GetFiles(uploadImages, "*", SearchOption.TopDirectoryOnly))
                            {
                                long size = new FileInfo(image).Length;
                                if (size > cap)
                                {
                                    string ext = Path.GetExtension(image).ToLower();
                                    if (ext == ".jpg" || ext == ".png")
                                    {
                                        // move original
                                        string decomp = Path.Combine(uploadImages, "_decomp_" + Path.GetFileName(image));
                                        File.Move(image, decomp);
                                        // compress
                                        Bitmap b = new Bitmap(decomp);
                                        ImageCodecInfo c = ImageCodecInfo.GetImageDecoders().ToList().Find(d => d.FormatID == iFormat[ext].Guid);
                                        EncoderParameters eps = new EncoderParameters(1);
                                        EncoderParameter ep = new EncoderParameter(Encoder.Quality, 50L);
                                        eps.Param[0] = ep;
                                        b.Save(image, c, eps);
                                        b.Dispose();
                                        // delete old
                                        File.Delete(decomp);
                                        // log
                                        logger.Add(new string[] {
                                            image,
                                            size.ToString()
                                        });
                                    }
                                }
                            }
                        }
                        else
                        {
                            logger.Add(new string[] { "***   IMAGES: NO FOLDER" });
                        }
                    }
                    logger.Add(new string[] { string.Empty });
                    // temp
                    // break;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            finally
            {
                logger.Save();
            }
            // await
            Console.WriteLine(string.Empty);
            Console.WriteLine("press enter to exit ...");
            Console.ReadLine();
        }
    }
}
