module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.1",
    credits: "**prince**", // ⬅️ UPDATED
    description: "Notification of bots or people entering groups with random gif/photo/video",
    dependencies: {
        "fs-extra": "",
        "path": "",
        "pidusage": ""
    }
};
 
module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
 
    const path = join(__dirname, "cache", "joinvideo");
    if (existsSync(path)) mkdirSync(path, { recursive: true }); 
 
    const path2 = join(__dirname, "cache", "joinvideo", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });
 
    return;
}
 
 
module.exports.run = async function({ api, event }) {
    const { join } = global.nodemodule["path"];
    const { threadID } = event;
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? " " : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        const fs = require("fs");

        // 👑 NEW, SHORTER, AND UNIQUE BOT WELCOME MESSAGE (prince) 👑
        const botJoinMsg = `
━━━━━━━━━━━━━━━
🎉 🥳 [ 𝐁𝐎𝐓 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 ] 🥳 🎉
━━━━━━━━━━━━━━━

Hello everyone! I'm **${(!global.config.BOTNAME) ? "Your Bot" : global.config.BOTNAME}** and I'm now active in this group!

✨ My Prefix is: **${global.config.PREFIX}**

⚙️ Get Started:
- Type **${global.config.PREFIX}help** for my main command list.
- Type **${global.config.PREFIX}info** for Admin details.

⚠️ For any serious issues or custom development:
Owner: **prince** 👑
Telegram: **@prince**

Enjoy your time! Have fun! 🤖
`.trim(); // Using .trim() to clean up whitespace

        return api.sendMessage("", event.threadID, () => api.sendMessage({body: botJoinMsg, attachment: fs.createReadStream(__dirname + "/cache/botjoin.mp4")} ,threadID));
    }
    else {
        try {
            const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);
 
            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const path = join(__dirname, "cache", "joinvideo");
            const pathGif = join(path, `${threadID}.video`);
 
            var mentions = [], nameArray = [], memLength = [], i = 0;
            
            for (id in event.logMessageData.addedParticipants) {
                const userName = event.logMessageData.addedParticipants[id].fullName;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);
            }
            memLength.sort((a, b) => a - b);
            
            // 🚨 OWNER NAME UPDATED IN DEFAULT USER WELCOME MESSAGE 🚨
            (typeof threadData.customJoin == "undefined") ? msg = "Hello Mr/Miss {name},\n─────────────────\n You're The {soThanhVien}Member ─────────────────\nOf {threadName} Group\n─────────────────\nPlease Enjoy Your Stay\n─────────────────\nAnd Make Lots Of Friends =)\n──────-°°__𝗧𝗿𝘂𝘀𝘁 𝗺e 🔐 °__!!>☁️✨❤️ My Owner  ✦͙͙͙͙❥⃝∗⁎.ʚ **prince** ɞ.⁎∗❥⃝**͙✦͙͙͙ ❤️ Love you 😘 ummmma ❤️😍" : msg = threadData.customJoin;
            
            msg = msg
            .replace(/\{name}/g, nameArray.join(', '))
            .replace(/\{type}/g, (memLength.length > 1) ?  'Friends' : 'Friend')
            .replace(/\{soThanhVien}/g, memLength.join(', '))
            .replace(/\{threadName}/g, threadName);
 
            if (existsSync(path)) mkdirSync(path, { recursive: true });
 
            const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));
 
            if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathvideo), mentions }
            else if (randomPath.length != 0) {
                const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
                formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
            }
            else formPush = { body: msg, mentions }
 
            return api.sendMessage(formPush, threadID);
        } catch (e) { return console.log(e) };
    }
}
