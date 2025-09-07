const { cmd } = require('../command');

cmd({
    pattern: "online",
    alias: ["whosonline", "onlinemembers"],
    desc: "Check who's online in the group (Admins & Owner only)",
    category: "main",
    react: "🟢",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isGroup, isAdmins, isCreator, fromMe, reply }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply("❌ σηℓү вσт σωηεя αη∂ gяσυρ α∂мιηs cαη υsε тнιs cσммαη∂!");

        // Check if user is either creator or admin
        if (!isCreator && !isAdmins && !fromMe) {
            return reply("❌ σηℓү вσт σωηεя αη∂ gяσυρ α∂мιηs cαη υsε тнιs cσммαη∂!");
        }

        // Inform user that we're checking
        await reply("🔄𝑺𝒄𝒂𝒏𝒏𝒊𝒏𝒈 𝒇𝒐𝒓 𝒐𝒏𝒍𝒊𝒏𝒆 𝒎𝒆𝒎𝒃𝒆𝒓𝒔....");

        const onlineMembers = new Set();
        const groupData = await conn.groupMetadata(from);
        const presencePromises = [];

        // Request presence updates for all participants
        for (const participant of groupData.participants) {
            presencePromises.push(
                conn.presenceSubscribe(participant.id)
                    .then(() => {
                        // Additional check for better detection
                        return conn.sendPresenceUpdate('composing', participant.id);
                    })
            );
        }

        await Promise.all(presencePromises);

        // Presence update handler
        const presenceHandler = (json) => {
            for (const id in json.presences) {
                const presence = json.presences[id]?.lastKnownPresence;
                // Check all possible online states
                if (['available', 'composing', 'recording', 'online'].includes(presence)) {
                    onlineMembers.add(id);
                }
            }
        };

        conn.ev.on('presence.update', presenceHandler);

        // Longer timeout and multiple checks
        const checks = 3;
        const checkInterval = 5000; // 5 seconds
        let checksDone = 0;

        const checkOnline = async () => {
            checksDone++;
            
            if (checksDone >= checks) {
                clearInterval(interval);
                conn.ev.off('presence.update', presenceHandler);
                
                if (onlineMembers.size === 0) {
                    return reply("⚠️ Couldn't detect any online members. They might be hiding their presence.");
                }
                
                const onlineArray = Array.from(onlineMembers);
                const onlineList = onlineArray.map((member, index) => 
                    `${index + 1}. @${member.split('@')[0]}`
                ).join('\n');
                
                const message = `‎*┏━━━ᴏɴʟɪɴᴇ ᴍᴇᴍʙᴇʀs━━━━━━┓*
‎  (${onlineArray.length}
‎  ${groupData.participants.length})
‎  ${onlineList} *┗━━━━━━━━━━━━━━━━━━━━┛*`;
                
                await conn.sendMessage(from, { 
                    text: message,
                    mentions: onlineArray
                }, { quoted: mek });
            }
        };

        const interval = setInterval(checkOnline, checkInterval);

    } catch (e) {
        console.error("Error in online command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
