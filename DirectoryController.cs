using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Linq;

namespace get_SUIS_dir_volume
{
    class DirectoryController
    {
        DirectoryInfo Dir { get; }
        public DirectoryController(string path)
        {
            Dir = new DirectoryInfo(path);
            if (!Dir.Exists) throw new DirectoryNotFoundException();
        }
        public DirectoryInfo[] Folders(bool recursive = false)
        {
            var folders = Dir.GetDirectories("*", recursive ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly);
            return folders;
        }
    }
}
