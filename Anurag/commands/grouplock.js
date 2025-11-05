const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "lockData.json");

// --- Helper functions ---
function loadLocks() {
  try {
    if (fs.existsSync(dataPath)) return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  } catch (e) {
    console.error("Error reading locks:", e);
  }
  return { groupNames: {}, nicknames: {} };
}

function saveLocks(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Error saving locks:", e);
  }
}

// --- CONFIG ---
module.exports.config = {
  name: "gclock",
  version: "2.5.0",
  hasPermssion: 0,
  credits: "Madhav urf 🦅Dʌ̈̌ngɛ͜͡rɵ͜͡us kɪng➳ 🩷🪽 (Modified by ChatGPT)",
  description: "GCLOCK aur NICKLOCK dono ka simple version",
  commandCategory: "ADMIN",
  usages: "gclock on <name> / off / nicklock on <nick> / nicklock off",
  cooldowns: 3
};

// --- ONLOAD ---
module.exports.onLoad = () => {
  const dir = path.join(__dirname, "..", "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify({ groupNames: {}, nicknames: {} }, null, 2));
};

// --- MAIN COMMAND ---
module.exports.run = async function({ api, event, args }) {
  const threadID = event.threadID;
  const type = (args[0] || "").toLowerCase();
  const action = (args[1] || "").toLowerCase();
  const locks = loadLocks();

  // --- Group Name Lock ---
  if (type === "on") {
    const name = args.slice(1).join(" ");
    if (!name) return api.sendMessage("⚠️ Usage: gclock on <Group Name>", threadID);

    locks.groupNames[threadID] = name;
    saveLocks(locks);
    await api.setThreadName(name, threadID);
    return api.sendMessage(`🔒 Group name locked as: "${name}"\nAgar koi badlega toh revert ho jaayega.`, threadID);
  }

  if (type === "off") {
    delete locks.groupNames[threadID];
    saveLocks(locks);
    return api.sendMessage("🔓 Group name lock removed.", threadID);
  }

  // --- Nickname Lock ---
  if (type === "nicklock") {
    if (action === "on") {
      const nick = args.slice(2).join(" ");
      if (!nick) return api.sendMessage("⚠️ Usage: gclock nicklock on <Nickname>", threadID);

      const info = await api.getThreadInfo(threadID);
      const members = info.participantIDs || [];

      locks.nicknames[threadID] = {};
      for (const uid of members) {
        locks.nicknames[threadID][uid] = nick;
        await api.changeNickname(nick, threadID, uid);
      }

      saveLocks(locks);
      return api.sendMessage(`🔐 All nicknames locked as "${nick}".`, threadID);
    }

    if (action === "off") {
      if (locks.nicknames[threadID]) {
        const users = Object.keys(locks.nicknames[threadID]);
        for (const uid of users) await api.changeNickname("", threadID, uid);
        delete locks.nicknames[threadID];
        saveLocks(locks);
      }
      return api.sendMessage("🔓 Nickname lock removed.", threadID);
    }
  }

  // --- Help ---
  return api.sendMessage(
`🧠 *GCLOCK COMMANDS* 🧠
1️⃣ gclock on <name> → Group name lock
2️⃣ gclock off → Unlock name
3️⃣ gclock nicklock on <nick> → Lock sabke nickname
4️⃣ gclock nicklock off → Unlock nicknames`,
    threadID
  );
};

// --- HANDLE EVENTS (Revert Logic) ---
module.exports.handleEvent = async function({ api, event }) {
  const locks = loadLocks();
  const threadID = event.threadID;

  // --- Group Name Revert ---
  if (event.type === "change_thread_info") {
    const lockedName = locks.groupNames?.[threadID];
    if (lockedName) {
      try {
        const info = await api.getThreadInfo(threadID);
        const currentName = info.threadName;
        if (currentName !== lockedName) {
          await api.setThreadName(lockedName, threadID);
          await api.sendMessage(`🚫 Group name locked! Wapas "${lockedName}" set kar diya gaya.`, threadID);
        }
      } catch (e) {
        console.error("Revert group name error:", e);
      }
    }
  }

  // --- Nickname Revert ---
  if (event.type === "change_nickname") {
    const targetID = event.targetID;
    const newNick = event.nickname;
    const lockedNick = locks.nicknames?.[threadID]?.[targetID];
    if (lockedNick && newNick !== lockedNick) {
      await api.changeNickname(lockedNick, threadID, targetID);
      api.sendMessage(`🚫 Nickname locked! Wapas "${lockedNick}" set kar diya gaya.`, threadID);
    }
  }
};
