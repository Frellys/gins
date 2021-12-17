using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace transportMonitor {
    internal class Program {
        private static void Main(string[] args)
        {
            try
            {
                HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create("http://transport.gis.inf74.ru/getroutes");
                httpWebRequest.Method = "GET";
                string end = new StreamReader(httpWebRequest.GetResponse().GetResponseStream()).ReadToEnd();

                DateTime dt = DateTime.Parse(new Regex("^.*\r\n").Match(end).ToString());
                TimeSpan ts = DateTime.Now - dt;
                if (ts.TotalMinutes >= 15.0)
                {
                    MailMessage message = new MailMessage();
                    message.IsBodyHtml = true;
                    message.Subject = "Данные от ГЛОНАСС для Я.Транспорта не поступают!";
                    message.Body = "Данные о перемещениях транспорта не поступали в течение " + Convert.ToInt32(ts.TotalMinutes) + " минут(ы)<br>";
                    message.Body += "Текущее время: " + DateTime.Now + "<br>";
                    message.Body += "Время последнего поступления координат: " + dt;
                    message.To.Add(Config("message_to"));
                    message.From = new MailAddress(Config("SMTP_username"));
                    SmtpSend(message);
                }
            }
            catch (Exception ex)
            {
                MailMessage message = new MailMessage();
                message.IsBodyHtml = true;
                message.Subject = "Сервер глонасс не отвечает!";
                message.Body = "Текущее время: " + DateTime.Now + "<br>" + ex.Message;
                message.To.Add(Config("message_to"));
                message.From = new MailAddress(Config("SMTP_username"));
                SmtpSend(message);
            }
        }

        /// <summary>
        /// Creates temporary SmtpClient and sends passed MailMessage
        /// </summary>
        /// <param name="message"></param>
        private static void SmtpSend(MailMessage message)
        {
            SmtpClient smtpClient = new SmtpClient(Config("SMTP_host"));
            smtpClient.Credentials = new NetworkCredential(Config("SMTP_username"), Config("SMTP_password"));
            smtpClient.EnableSsl = true;
            smtpClient.Send(message);
        }

        /// <summary></summary>
        /// <param name="key"></param>
        /// <returns>App.config key value</returns>
        private static string Config(string key) {
            return ConfigurationManager.AppSettings[key];
        }
    }
}
