using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace torMacro
{
    static class KeyboardController
    {
        // arrows
        public const byte VK_LEFT = 0x25;
        public const byte VK_UP = 0x26;
        public const byte VK_RIGHT = 0x27;
        public const byte VK_DOWN = 0x28;
        // numbers
        public const byte VK_0 = 0x30;
        public const byte VK_1 = 0x31;
        public const byte VK_2 = 0x32;
        public const byte VK_3 = 0x33;
        public const byte VK_4 = 0x34;
        public const byte VK_5 = 0x35;
        public const byte VK_6 = 0x36;
        public const byte VK_7 = 0x37;
        public const byte VK_8 = 0x38;
        public const byte VK_9 = 0x39;
        /// <summary>
        /// Emulates keyboard input
        /// </summary>
        /// <param name="keys">array of keys, which will bi pressed in direct order and released in reverse</param>
        /// <param name="interval">time in milliseconds between pressing and releasing buttons</param>
        public static void Press(char[] keys, int interval = 100)
        {
        }
    }
}
