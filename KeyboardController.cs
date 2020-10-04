using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;

namespace torMacro
{
    static class KeyboardController
    {
        [DllImport("user32.dll")]
        private static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);
        // keyup
        public const int EVT_KEYUP = 0x02;
        private static Dictionary<string, byte> keys = new Dictionary<string, byte>
        {
            // arrows
            { "VK_LEFT", 0x25 },
            { "VK_UP", 0x26 },
            { "VK_RIGHT", 0x27 },
            { "VK_DOWN", 0x28 },
            // numbers
            { "VK_0", 0x30 },
            { "VK_1", 0x31 },
            { "VK_2", 0x32 },
            { "VK_3", 0x33 },
            { "VK_4", 0x34 },
            { "VK_5", 0x35 },
            { "VK_6", 0x36 },
            { "VK_7", 0x37 },
            { "VK_8", 0x38 },
            { "VK_9", 0x39 },
            // keys
            { "KEY_K", 0x4B },
            { "KEY_T", 0x54 },
            { "KEY_V", 0x56 },
        };
        // arrows
        //public const byte VK_LEFT = 0x25;
        //public const byte VK_UP = 0x26;
        //public const byte VK_RIGHT = 0x27;
        //public const byte VK_DOWN = 0x28;
        // numbers
        //public const byte VK_0 = 0x30;
        //public const byte VK_1 = 0x31;
        //public const byte VK_2 = 0x32;
        //public const byte VK_3 = 0x33;
        //public const byte VK_4 = 0x34;
        //public const byte VK_5 = 0x35;
        //public const byte VK_6 = 0x36;
        //public const byte VK_7 = 0x37;
        //public const byte VK_8 = 0x38;
        //public const byte VK_9 = 0x39;
        // keys
        //public const byte KEY_K = 0x4B;
        //public const byte KEY_T = 0x54;
        //public const byte KEY_V = 0x56;
        // functrion keys
        public const byte VK_F1 = 0x70;
        public const byte VK_F2 = 0x71;
        public const byte VK_F3 = 0x72;
        public const byte VK_F4 = 0x73;
        public const byte VK_F5 = 0x74;
        public const byte VK_F6 = 0x75;
        public const byte VK_F7 = 0x76;
        public const byte VK_F8 = 0x77;
        public const byte VK_F9 = 0x78;
        public const byte VK_F10 = 0x79;
        public const byte VK_F11 = 0x7A;
        public const byte VK_F12 = 0x7B;
        public const byte VK_F13 = 0x7C;
        public const byte VK_F14 = 0x7D;
        public const byte VK_F15 = 0x7E;
        public const byte VK_F16 = 0x7F;
        public const byte VK_F17 = 0x80;
        public const byte VK_F18 = 0x81;
        public const byte VK_F19 = 0x82;
        public const byte VK_F20 = 0x83;
        public const byte VK_F21 = 0x84;
        public const byte VK_F22 = 0x85;
        public const byte VK_F23 = 0x86;
        public const byte VK_F24 = 0x87;
        // specials
        public const byte VK_ESCAPE = 0x1B;
        public const byte VK_LCONTROL = 0xA2;
        public const byte VK_LSHIFT = 0xA0;
        public const byte VK_LWIN = 0x5B;
        public const byte VK_RETURN = 0x0D;
        public const byte VK_TAB = 0x09;
        /// <summary>
        /// Emulates keyboard input
        /// </summary>
        /// <param name="keys">array of keys, which will be pressed in direct order and released in reverse</param>
        /// <param name="interval">time in milliseconds between pressing and releasing buttons</param>
        //public static void Press(string[] keys, int interval = 100)
        //{
        //    for (int k = 0; k < keys.Length; k++)
        //    {
        //        keybd_event((byte)typeof(KeyboardController).GetField(keys[k]).GetValue(null), 0x45, 0, (UIntPtr)0);
        //    }
        //    Thread.Sleep(interval);
        //    for (int k = keys.Length; k > 0; k--)
        //    {
        //        keybd_event((byte)typeof(KeyboardController).GetField(keys[k - 1]).GetValue(null), EVT_KEYUP, 0, (UIntPtr)0);
        //    }
        //}
        public static void Press(string[] keys)
        {
            //for (int k = 0; k < keys.Length; k++)
            //{
            //    keybd_event((byte)typeof(KeyboardController).GetField(keys[k]).GetValue(null), 0x45, 0, (UIntPtr)0);
            //}
            //for (int k = keys.Length; k > 0; k--)
            //{
            //    keybd_event((byte)typeof(KeyboardController).GetField(keys[k - 1]).GetValue(null), EVT_KEYUP, 0, (UIntPtr)0);
            //}
            for (int k = 0; k < keys.Length; k++)
            {
                keybd_event((byte)typeof(KeyboardController).GetField(keys[k]).GetValue(typeof(KeyboardController)), 0x45, 0, (UIntPtr)0);
            }
            for (int k = keys.Length; k > 0; k--)
            {
                keybd_event((byte)typeof(KeyboardController).GetField(keys[k - 1]).GetValue(typeof(KeyboardController)), EVT_KEYUP, 0, (UIntPtr)0);
            }
        }
    }
}
