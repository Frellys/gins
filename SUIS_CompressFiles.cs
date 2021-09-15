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
            File.WriteAllLines(Path.Combine(AppContext.BaseDirectory, "log.txt"), arr, System.Text.Encoding.UTF8);
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Logger logger = new Logger();
            try
            {
                string root = @"C:\Hosting\region74";
                List<string> siteDirs = Directory.GetDirectories(root, "*", SearchOption.TopDirectoryOnly).Where(s => Directory.Exists(Path.Combine(s, "Upload"))).ToList();
                foreach (string siteDir in siteDirs)
                {
                    logger.Add(new string[] {
                        "***   SITE: " + siteDir
                    });
                    string uploadDir = Path.Combine(siteDir, "Upload");
                    string uploadFiles = Path.Combine(uploadDir, "files");
                    string uploadImages = Path.Combine(uploadDir, "images");
                    logger.Add(new string[] {
                        "***  FILES: " + Directory.GetFiles(uploadFiles, "*", SearchOption.TopDirectoryOnly).Length.ToString(),
                        "*** IMAGES: " + Directory.GetFiles(uploadImages, "*", SearchOption.TopDirectoryOnly).Length.ToString(),
                        string.Empty
                    });
                    if (Directory.Exists(uploadFiles))
                    {
                        /*
                         * maybe later
                         */
                    }
                    if (Directory.Exists(uploadImages))
                    {
                        foreach (string image in Directory.GetFiles(uploadImages, "*", SearchOption.TopDirectoryOnly))
                        {
                            long size = new FileInfo(image).Length;
                            string ext = Path.GetExtension(image).ToLower();
                            if (ext == ".png")
                            {
                                Bitmap b = new Bitmap(image);
                                ImageCodecInfo c = ImageCodecInfo.GetImageDecoders().ToList().Find(d => d.FormatID == ImageFormat.Png.Guid);
                                EncoderParameters eps = new EncoderParameters(1);
                                EncoderParameter ep = new EncoderParameter(Encoder.Quality, 50L);
                                eps.Param[0] = ep;
                                string nname = "_" + Path.GetFileName(image);
                                b.Save(Path.Combine(uploadImages, nname), c, eps);
                                b.Dispose();
                            }
                            if (ext == ".jpg")
                            {
                                Bitmap b = new Bitmap(image);
                                ImageCodecInfo c = ImageCodecInfo.GetImageDecoders().ToList().Find(d => d.FormatID == ImageFormat.Jpeg.Guid);
                                EncoderParameters eps = new EncoderParameters(1);
                                EncoderParameter ep = new EncoderParameter(Encoder.Quality, 50L);
                                eps.Param[0] = ep;
                                string nname = "_" + Path.GetFileName(image);
                                b.Save(Path.Combine(uploadImages, nname), c, eps);
                                b.Dispose();
                            }
                            logger.Add(new string[] {
                                image,
                                size.ToString(),
                                string.Empty
                            });
                        }
                    }
                    // temp
                    break;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            finally {
                // save logs
                logger.Save();
            }
            // await
            Console.WriteLine(string.Empty);
            Console.WriteLine("press enter to exit ...");
            Console.ReadLine();
        }
    }
}
