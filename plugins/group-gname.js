const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "updategname",
    alias: ["upgname", "gname"],
    react: "📝",
    desc: "Change the group name.",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, args, q, reply }) => {
    try {
        if (!isGroup) return reply("❌ тнιs cσммαη∂ cαη σηℓү вε υsε∂ ιη gяσυρs..");
        if (!isAdmins) return reply("❌  σηℓү gяσυρ α∂мιηs cαη υsε тнιs cσммαη∂.");
        if (!isBotAdmins) return reply("❌ I need to be an admin to update the group name.");
        if (!q) return reply("❌ ρℓεαsε ρяσvι∂ε α ηεω gяσυρ ηαмε.");

        await conn.groupUpdateSubject(from, q);
        reply(`✅ gяσυρ ηαмε нαs вεεη υρ∂αтε∂ тσ: *${q}*`);
    } catch (e) {
        console.error("Error updating group name:", e);
        reply("❌ Failed to update the group name. Please try again.");
    }
});
