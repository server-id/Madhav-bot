const axios = require("axios");

module.exports.config = {
  name: "pika-ai",
  version: "3.3.1",
  hasPermission: 0,
  credits: "Anurag Mishra",
  description: "PIKA AI बॉट जो सिर्फ अपने मैसेज के रिप्लाई पर जवाब देगा",
  commandCategory: "AI",
  usePrefix: false,
  usages: "[बॉट के मैसेज पर रिप्लाई करें]",
  cooldowns: 5,
};

let userMemory = {};
let isActive = true;
let userLanguage = {};

const BOSS_UID = "61583096049461"; // तुम्हारा UID
const GROQ_API_KEY = "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";

const supportedLanguages = {
  bhojpuri: "bho", urdu: "ur", punjabi: "pa", nepali: "ne",
  english: "en", hindi: "hi", french: "fr", spanish: "es", russian: "ru",
  italian: "it", arabic: "ar", german: "de", portuguese: "pt",
  korean: "ko", bengali: "bn", marathi: "mr", maithili: "mai",
  tamil: "ta", gujrati: "gu", sanskrit: "sa"
};

// Google Translate helper
async function translateText(text, targetLang) {
  try {
    const res = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    return res.data?.[0]?.[0]?.[0] || text;
  } catch {
    return text;
  }
}

// Groq API handler
async function groqAI(messages) {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "meta-llama/llama-3.1-8b-instruct",
        messages,
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    return res.data?.choices?.[0]?.message?.content?.trim() || null;
  } catch (err) {
    console.error("🌐 Groq Error:", err.response?.data || err.message);
    return null;
  }
}

// Generate AI response
async function getAIResponse(prompt, persona) {
  try {
    const messages = [
      { role: "system", content: persona },
      { role: "user", content: prompt }
    ];
    let reply = await groqAI(messages);
    if (!reply) throw new Error("AI से जवाब नहीं मिला");
    reply = reply.replace(/@[^ ]+/g, '').trim();
    return reply.length > 200 ? reply.slice(0, 200) + "..." : reply;
  } catch {
    return "❌ AI से जवाब लाने में दिक्कत हो रही है।";
  }
}

// Event handler
module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body, messageReply } = event;

  if (!isActive || !body || !messageReply || messageReply.senderID !== api.getCurrentUserID()) return;

  const lowerBody = body.toLowerCase().trim();
  const langKeys = Object.keys(supportedLanguages);

  // Language switching
  if (langKeys.includes(lowerBody)) {
    userLanguage[senderID] = supportedLanguages[lowerBody];
    const langName = lowerBody.charAt(0).toUpperCase() + lowerBody.slice(1);
    const confirm = await translateText(`अब मैं ${langName} भाषा में बात करूँगा!`, userLanguage[senderID]);
    return api.sendMessage(confirm, threadID, messageID);
  }

  // Language command "lang hindi"
  for (const lang of langKeys) {
    if (lowerBody.includes(`lang ${lang}`) || lowerBody.includes(`language ${lang}`)) {
      userLanguage[senderID] = supportedLanguages[lang];
      const confirm = await translateText(`अब मैं ${lang} भाषा में बात करूँगा!`, userLanguage[senderID]);
      return api.sendMessage(confirm, threadID, messageID);
    }
  }

  const userQuery = body.trim();
  if (!userMemory[senderID]) userMemory[senderID] = [];

  const ThreadInfo = await api.getThreadInfo(threadID).catch(() => ({}));
  const user = ThreadInfo?.userInfo?.find(u => u.id === senderID);
  const gender = user?.gender?.toUpperCase() || "UNKNOWN";

  let persona = "";
  if (senderID === BOSS_UID) {
    persona = "You are PIKA. Your master Anurag Mishra is speaking. Address him respectfully as 'Boss' or 'Shankar Sir'. Reply briefly and politely.";
  } else if (gender === "FEMALE") {
    persona = "You are PIKA (a charming male AI). Flirt playfully using emojis 💖😘, keep tone romantic but soft.";
  } else {
    persona = "You are PIKA (a funny and sarcastic male AI). Reply in a friendly roasting tone.";
  }

  const history = userMemory[senderID].join("\n");
  const prompt = `${history}\nUser: ${userQuery}\nBot:`;

  let botReply = await getAIResponse(prompt, persona);

  if (userLanguage[senderID] && userLanguage[senderID] !== "en") {
    botReply = await translateText(botReply, userLanguage[senderID]);
  }

  if (senderID === BOSS_UID) botReply = `🙏 ${botReply}`;

  userMemory[senderID].push(`User: ${userQuery}`, `Bot: ${botReply}`);
  if (userMemory[senderID].length > 15) userMemory[senderID].splice(0, 2);

  return api.sendMessage(botReply, threadID, messageID);
};

// Commands: /pika on /pika off /pika clear
module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;
  const command = args[0]?.toLowerCase();

  switch (command) {
    case "on":
      isActive = true;
      return api.sendMessage("✅ PIKA bot अब सक्रिय है।", threadID, messageID);

    case "off":
      isActive = false;
      return api.sendMessage("⚠️ PIKA bot अब बंद है।", threadID, messageID);

    case "clear":
      if (args[1]?.toLowerCase() === "all") {
        userMemory = {};
        userLanguage = {};
        return api.sendMessage("🧹 सभी यूजर्स की हिस्ट्री और भाषा सेटिंग्स क्लियर कर दी गई हैं।", threadID, messageID);
      }
      delete userMemory[senderID];
      delete userLanguage[senderID];
      return api.sendMessage("🧹 आपकी हिस्ट्री और भाषा सेटिंग्स क्लियर कर दी गई हैं।", threadID, messageID);

    case "lang":
    case "language":
      const list = Object.entries(supportedLanguages)
        .map(([lang, code]) => `• ${lang} (${code})`)
        .join("\n");
      return api.sendMessage(`🌍 समर्थित भाषाएं:\n${list}\n\nभाषा बदलने के लिए लिखें: "hindi" या "english"`, threadID, messageID);

    default:
      return api.sendMessage("⚙️ उपयोग: /pika on | off | clear | lang", threadID, messageID);
  }
};
