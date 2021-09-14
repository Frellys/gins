using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;

namespace SUIS_CompressFiles
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                string root = @"C:\Hosting\region74";
                List<string> siteDirs = Directory.GetDirectories(root, "*", SearchOption.TopDirectoryOnly).Where(s => Directory.Exists(Path.Combine(s, "Upload"))).ToList();
                foreach (string siteDir in siteDirs)
                {
                    Console.WriteLine(siteDir);
                    string uploadDir = Path.Combine(siteDir, "Upload");
                    string uploadFiles = Path.Combine(uploadDir, "files");
                    string uploadImages = Path.Combine(uploadDir, "images");
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
                            string ext = Path.GetExtension(image).ToLower();
                            if (ext == ".jpg")
                            {
                                Bitmap b = new Bitmap(image);
                                ImageCodecInfo c = ImageCodecInfo.GetImageDecoders().ToList().Find(d => d.FormatID == ImageFormat.Jpeg.Guid);
                                EncoderParameters eps = new EncoderParameters(1);
                                EncoderParameter ep = new EncoderParameter(Encoder.Compression, 50L);
                                eps.Param[0] = ep;
                                string nname = "_" + Path.GetFileName(image);
                                b.Save(Path.Combine(uploadImages, nname), c, eps);
                                b.Dispose();
                            }
                            Console.WriteLine(image);
                            Console.WriteLine(ext);
                            long size = new FileInfo(image).Length;
                            Console.WriteLine(size);
                            Console.WriteLine(string.Empty);
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
            // await
            Console.WriteLine(string.Empty);
            Console.WriteLine("press enter to exit ...");
            Console.ReadLine();
        }
    }
}
