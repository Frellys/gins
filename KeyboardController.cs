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
        public const uint EVT_KEYUP = 0x2;
        private static Dictionary<string, byte> Keyboard = new Dictionary<string, byte>
        {
            // mouse
            { "VK_LBUTTON", 0x01 },
            { "VK_RBUTTON", 0x02 },
            // nav
            { "VK_PRIOR", 0x21 },
            { "VK_NEXT", 0x22 },
            { "VK_END", 0x23 },
            { "VK_HOME", 0x24 },
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
            { "KEY_U", 0x55 },
            { "KEY_V", 0x56 },
            { "KEY_W", 0x57 },
            { "KEY_X", 0x58 },
            { "KEY_Y", 0x59 },
            { "KEY_Z", 0x5A },
            // functrion keys
            { "VK_F1", 0x70 },
            { "VK_F2", 0x71 },
            { "VK_F3", 0x72 },
            { "VK_F4", 0x73 },
            { "VK_F5", 0x74 },
            { "VK_F6", 0x75 },
            { "VK_F7", 0x76 },
            { "VK_F8", 0x77 },
            { "VK_F9", 0x78 },
            { "VK_F10", 0x79 },
            { "VK_F11", 0x7A },
            { "VK_F12", 0x7B },
            { "VK_F13", 0x7C },
            { "VK_F14", 0x7D },
            { "VK_F15", 0x7E },
            { "VK_F16", 0x7F },
            { "VK_F17", 0x80 },
            { "VK_F18", 0x81 },
            { "VK_F19", 0x82 },
            { "VK_F20", 0x83 },
            { "VK_F21", 0x84 },
            { "VK_F22", 0x85 },
            { "VK_F23", 0x86 },
            { "VK_F24", 0x87 },
            // specials
            { "VK_ESCAPE", 0x1B },
            { "VK_LCONTROL", 0xA2 },
            { "VK_LSHIFT", 0xA0 },
            { "VK_LWIN", 0x5B },
            { "VK_RETURN", 0x0D },
            { "VK_TAB", 0x09 }
        };
        /// <summary>
        /// Emulates keyboard input
        /// </summary>
        /// <param name="keys">array of keys, which will be pressed in direct order and released in reverse</param>
        public static void Press(string[] keys)
        {
            for (int k = 0; k < keys.Length; k++)
            {
                keybd_event(Keyboard[keys[k]], 0x45, 0, (UIntPtr)0);
            }
            Thread.Sleep(100);
            for (int k = keys.Length; k > 0; k--)
            {
                keybd_event(Keyboard[keys[k - 1]], 0x45, EVT_KEYUP, (UIntPtr)0);
            }
        }
    }
}
