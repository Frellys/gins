using System;
using System.IO;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Xml;

namespace Test_TcpGeodataSender
{
    class Program
    {
        static void Main(string[] args)
        {
            XmlDocument config = new XmlDocument();
            config.Load(Path.Combine(Directory.GetCurrentDirectory(), "App.config"));
            string host = config["configuration"]["host"].GetAttribute("value");
            string port = config["configuration"]["port"].GetAttribute("value");
            string message = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "testMsg.xml"));
            do
            {
                DateTime dt = DateTime.Now;
                string time = dt.ToString("yyyy-MM-ddTHH:mm:ssZ");
                int tdx = message.IndexOf("time=\"");
                StringBuilder sb = new StringBuilder(message);
                for (int i = 0; i < time.Length; i++)
                {
                    sb[tdx + i + 6] = time[i];
                }
                message = sb.ToString();
                Console.Clear();
                Console.WriteLine("host: " + host);
                Console.WriteLine("port: " + port);
                Console.WriteLine(message);
                Connect(host, int.Parse(port), message);
                Thread.Sleep(5000);
            } while (true);
        }
        static void Connect(string server, int port, string message)
        {
            TcpClient client = new TcpClient(server, port);
            NetworkStream stream = client.GetStream();
            byte[] msgArr = Encoding.ASCII.GetBytes(message);
            stream.Write(msgArr, 0, msgArr.Length);
        }
    }
}