using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Bots {
    class TelegramBot {
        private string api_key;
        private string chat_id;
        private HttpClient client = new HttpClient();

        public TelegramBot(string apiKey, string chatId)
        {
            api_key = apiKey;
            chat_id = chatId;
        }

        public async Task<string> SendMessageAsync(string message)
        {
            return await client.GetStringAsync("https://api.telegram.org/" + api_key + "/sendMessage?text=" + message + "&chat_id=" + chat_id);
        }
    }
}
