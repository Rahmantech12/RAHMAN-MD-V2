// Give Me Credit If Using This File ✅ 
// Credits by Black Tappy

const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../config');

const getContextInfo = (sender) => ({
    mentionedJid: [sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363201214007503@newsletter',
        newsletterName: '𝐑𝐀𝐇𝐌𝐀𝐍-𝐓𝐄𝐂𝐇',
        serverMessageId: 143,
    },
});

const ppUrls = [
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
];

const GroupEvents = async (conn, update) => {
    try {
        const groupId = update?.id;
        if (!isJidGroup(groupId)) return;

        let metadata;
        try {
            metadata = await conn.groupMetadata(groupId);
        } catch (e) {
            console.warn(`Failed to fetch metadata for group ${groupId}`, e);
            return;
        }

        const desc = metadata.desc || "No Description";
        const groupMembersCount = metadata.participants.length;

        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(groupId, 'image');
        } catch {
            ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
        }

        const timestamp = new Date().toLocaleString('en-US', { timeZone: config.TIME_ZONE || 'UTC' });

        for (const participant of update.participants) {
            const userJid = participant;
            const userName = userJid.split('@')[0];

            if (update.action === 'add' && config.WELCOME === 'true') {
                const WelcomeText = `*╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──*\n` +
`*│  ̇─̣─̇─̣〘 ωєℓ¢σмє 〙̣─̇─̣─̇*\n` +
`*├┅┅┅┅┈┈┈┈┈┈┈┈┈┅┅┅◆*\n` +
`*│❀ нєу* @${userName}\n` +
`*│❀ gʀσᴜᴘ* ${metadata.subject}\n` +
`*├┅┅┅┅┈┈┈┈┈┈┈┈┈┅┅┅◆*\n` +
`*│● ѕтαу ѕαfє αɴ∂ fσℓℓσω*\n` +
`*│● тнє gʀσυᴘѕ ʀᴜℓєѕ!*\n` +
`*│● ᴊσιɴє∂ ${groupMembersCount}*\n` +
`*│● ©ᴘσωєʀє∂ ву яαнмαη-м∂*\n` +
`*╰┉┉┉┉┈┈┈┈┈┈┈┈┉┉┉᛫᛭*\n` +
`${desc}`;

                await conn.sendMessage(groupId, {
                    image: { url: ppUrl },
                    caption: WelcomeText,
                    mentions: [userJid],
                    contextInfo: getContextInfo(userJid),
                });

            } else if (update.action === 'remove' && config.WELCOME === 'true') {
                const GoodbyeText = `*╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──*\n` +
`*│  ̇─̣─̇─̣〘 gσσ∂вує 〙̣─̇─̣─̇*\n` +
`*├┅┅┅┅┈┈┈┈┈┈┈┈┈┅┅┅◆*\n` +
`*│❀ ᴜѕєʀ* @${userName}\n` +
`*│● мємвєʀѕ ιѕ ℓєfт тнє gʀσᴜᴘ*\n` +
`*│● мємвєʀs ${groupMembersCount}*\n` +
`*│● ©ᴘσωєʀє∂ ву яαнмαη-м∂*\n` +
`*╰┉┉┉┉┈┈┈┈┈┈┈┈┉┉┉᛫᛭*`;

                await conn.sendMessage(groupId, {
                    image: { url: ppUrl },
                    caption: GoodbyeText,
                    mentions: [userJid],
                    contextInfo: getContextInfo(userJid),
                });

            } else if (update.action === 'demote' && config.ADMIN_EVENTS === 'true') {
                const demoter = update.author.split('@')[0];
                await conn.sendMessage(groupId, {
                    text: `*╭────⬡ αᴄтισɴ-ѕтαтᴜs ⬡────* \n` +
`*├▢ @${demoter} нαѕ ∂ємσтє∂*\n` +
`*├▢ @${userName} fʀσм α∂мιɴ*\n` +
`*├▢ тιмє : ${timestamp}*\n` +
`*├▢ gʀσᴜᴘ :* ${metadata.subject}\n` +
`*╰────────────────────*`,
                    mentions: [update.author, userJid],
                    contextInfo: getContextInfo(update.author),
                });

            } else if (update.action === 'promote' && config.ADMIN_EVENTS === 'true') {
                const promoter = update.author.split('@')[0];
                await conn.sendMessage(groupId, {
                    text: `*╭────⬡ αᴄтισɴ-ѕтαтᴜs ⬡────* \n` +
`*├▢ @${promoter} нαѕ ᴘʀσмσтє∂*\n` +
`*├▢ @${userName} тσ α∂мιɴ*\n` +
`*├▢ тιмє : ${timestamp}*\n` +
`*├▢ gʀσᴜᴘ : ${metadata.subject}*\n` +
`*╰────────────────────*`,
                    mentions: [update.author, userJid],
                    contextInfo: getContextInfo(update.author),
                });
            }
        }
    } catch (err) {
        console.error('❌ Error in GroupEvents:', err);
    }
};

module.exports = GroupEvents;
