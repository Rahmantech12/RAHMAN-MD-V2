const { cmd } = require("../command");
const moment = require("moment");

let botStartTime = Date.now(); // Enregistrement de l'heure de démarrage du bot

// Array of fallback wallpaper URLs
const FALLBACK_WALLPAPERS = [
    "https://files.catbox.moe/84jssf.jpg", // Your original image
    "https://files.catbox.moe/t3p1at.jpg",
    "https://files.catbox.moe/84jssf.jpg",
    "https://files.catbox.moe/t3p1at.jpg"
];

// Function to get a random wallpaper URL
const getRandomWallpaper = () => {
    const randomIndex = Math.floor(Math.random() * FALLBACK_WALLPAPERS.length);
    return FALLBACK_WALLPAPERS[randomIndex];
};

// Array of fancy quotes
const FANCY_QUOTES = [
    "\"✨The only way to do great work is to love what you do.🩷\" - Steve Jobs",
    "\"🎀Innovation distinguishes between a leader and a followe💞r.\" - Steve Jobs",
    "\"🟢The future belongs to those who believe in the beauty of their dreams✨.\" - Eleanor Roosevelt",
    "\"✅Success is not final, failure is not fatal: It is the courage to continue that counts📊.\" - Winston Churchill",
    "\"📸The greatest glory in living lies not in never falling, but in rising every time we fall.⏳\" - Nelson Mandela"
];

// Function to get a random fancy quote
const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * FANCY_QUOTES.length);
    return FANCY_QUOTES[randomIndex];
};

cmd({
    pattern: "alive",
    desc: "Check if the bot is active.",
    category: "info",
    react: "🎀",
    filename: __filename
}, async (conn, mek, m, { reply, from }) => {
    try {
        const pushname = m.pushName || "User"; // Nom de l'utilisateur ou valeur par défaut
        const currentTime = moment().format("HH:mm:ss");
        const currentDate = moment().format("dddd, MMMM Do YYYY"); // Added YYYY for full date

        const runtimeMilliseconds = Date.now() - botStartTime;
        const runtimeSeconds = Math.floor((runtimeMilliseconds / 1000) % 60);
        const runtimeMinutes = Math.floor((runtimeMilliseconds / (1000 * 60)) % 60);
        const runtimeHours = Math.floor(runtimeMilliseconds / (1000 * 60 * 60));

        const randomQuote = getRandomQuote();
        const wallpaperUrl = getRandomWallpaper(); // Get a random wallpaper

        const formattedInfo = `
‎*_Rᴀʜᴍᴀɴ-ᴍᴅ Rᴜɴɴɪɴɢ Sɪɴᴄᴇ_*
нεү 👋🏻 ${pushname}
🕒 *тιмε*: ${currentTime}
📅 *∂αтε*: ${currentDate}
⏳ *υρтιмε*: ${runtimeHours} hours,${runtimeMinutes} ᴍɪɴᴜᴛᴇs,${runtimeSeconds} sᴇᴄᴏɴᴅs

*𝑺𝒕𝒂𝒕𝒖𝒔*: *𝑩𝒐𝒕 🤖 𝒊𝒔 𝒂𝒍𝒊𝒗𝒆 𝒂𝒏𝒅 𝒉𝒆𝒂𝒍𝒕𝒉𝒚🛠️*

"${randomQuote}"

*🔹 ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴛᴇᴄʜ 🔹*
        `.trim();

        // Envoyer le message avec image et légende
        await conn.sendMessage(from, {
            image: { url: wallpaperUrl }, // Use the random wallpaper URL
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363201214007503@newsletter',
                    newsletterName: '𝐑𝐀𝐇𝐌𝐀𝐍-𝐓𝐄𝐂𝐇',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in alive command: ", error);
        
        // Répondre avec des détails de l'erreur
        const errorMessage = `
❌ An error occurred while processing the alive command.
🛠 *Error Details*:
${error.message}

Please report this issue or try again later.
        `.trim();
        return reply(errorMessage);
    }
});
