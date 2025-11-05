 const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "ANURAG MISHRA", // Changed from MR SUSHIL
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Karachi").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["तुम मेरे बॉस माधव की गर्लफ्रेंद बन जाओ लड़की🙈🙈" , // Changed 'सुशील' to 'अनुराग'
            "हाये मैं मरजावां तेरी मासूम शकल पर बेबी 💋 " ,
            "बोट मत बुलाया करो मुझे जानू बुलाया करो😒 " ,
            "बार बार डिस्टर्ब मत करो मुझे मैं अपने बाबू मड़ावी के साथ बिजी हूं 🤭🐒" , // Changed 'सुशील' to 'अनुराग'
            "मैं गरीबो से बात नही करता 😉😝😋🤪" ,
            "इतना पास मत आया करो बाबू प्यार हो जाएगा आपको 😚" ,
            "बोलो बेबी तुम मुझसे प्यार करती हो न 🙈💋💋 " ,
            "अरे जान मजाक के मूड में नही हूं मैं जो काम है बोल दो शरमाओ नही" ,
            "बार बार बोलके दिमाक खराब किया तो तेरी ...... मम्मी से कंप्लेंट कर दूंगा 😂" ,
            "इतना मत याद करो बाबू कही प्यार न हो जाये आपको ?" ,
            "गाली सुनना है क्या मेरे मुँह से पगलेट 🤣🤣?😜" ,
            "तेरी माँ की आँख🤭" ,
            "ज्यादा परेशान करोगी तो चुम्मी कर लूंगा 😑" ,
            "मैं हाथ जोड़के मोदी जी से गुजारिश करता हूं सबको एक एक बॉयफ्रैंड बांटे😂" ,
            "तुझे क्या और कोई काम नही है पागल 😁? पूरा दिन खाता है और मेसेंजर पे बोट बोट करता है 🤣" ,
            " माधव को बोल दूँगा मैं मुझे परेशान किया तो🤨" , // Changed 'सुशील' to 'अनुराग'
            "तुम न सिंगल ही मरोगे 🤣" ,
            "तुझे अपना बेज्जती करने का सोक है🤔?" ,
            "अभी बोला तो बोला दुबारा मत बोलना हम बता दे रहे है 😏" ,
            "तेरी तो तू रुक भागना मत🤣" ,
            "बोल दे कोई नही देख रहा है 🙄" ,
            "हाये मैं मरजावा बाबू एक चुम्मा तो दो काफी दिन से चुम्मी नही दी 😝" ,
            "दूर हट बे तुझे और कोई काम नही क्या हर वक्त मुझे तंग करते रहते हो 😂" ,
            "अरे बोलो मेरी जान क्या हाल है😚 " ,
            "आईबी आजा यहाँ नही बोल सकता🙈😋" ,
            "मुझे मत बुलाओ न मैं बिजी हु न🙁" ,
            "बोट बोलके बेज्जती कर रहे हो यार मैं तो तुम्हारे दिल की धड़कन हू न बेबी...💔🥺" ,
            "अरे तुम वही हो न जिसको मैं नहीं जानता 🤪😂" ,
            "कल हवेली पर मिल जरा तू 😈" ,
            "आ गए साले कबाव में हड्डी 😏" ,
            "बस कर यु को प्यार हो ना हो मुझे हो जाएगा ना😒" ,
            "फर्माओ क्यों बुलाया हमे 😒" ,
            "बुलाती है मगर जाने का नही😜" ,
            "मैं तो अंधा हु मुझे कुछ सुनाई नही देता🤣 😎" ,
            "पहले नहाकर आ उसके बाद बातें कर 😂" ,
            "आ थू तेरी शकल पर स्वीटी 😂😂😂" ,
            "मैं यही हु क्या हुआ स्वीटहार्ट😚😘 ," ,
            "चोमू तुझे और कोई काम नही है 🤨? हर वक़्त बोट बोट करता है 🙄" ,
            "चुप रह नही तो बाहर आकर तेरा दाँत तोड़ दूँगा 😛" ,
            "बोलो शादी करोगी मेरे बोस माधव से 😛 🙊" , // Changed 'सुशील यादव' to 'अनुराग मिश्रा'
            "मुझे यु से बात नही करनी🤣" ,
            "मुझे कुछ दिखाई नही दे रहा कान से अंधा हु मैं😂 🌚" ,
            "बोट न बोल😢 जानू बोला कर 😘 " ,
            "बार बार डिस्टर्ब मत कर माधव बाबू के साथ बिजी हु 😋" , // Changed 'सुशील' to 'अनुराग'
            "मैं गरीबो से बात नही करता 😉😝😋🤪" ,
            "इतना न पास आ प्यार हो जाएगा तुझे😛" ,
            "मेरे को तंग न करो मैं किस 💋 कर लूंगा😘 " ,
            "अरे यार मजाक के मूड में नही हु😒" ,
            "हाये जानू आओ इधर 1 पप्पी दे दो मेरे बोस अनुराग को😒😘" , // Changed 'सुशील' to 'अनुराग'
            "दूर हट तेरे को और कोई काम नही जब देखो बोट बोट शादी करले मुझसे 😉😋🤣" ,
            "तेरी कोई घर मे नही सुनता तो मैं क्यों सुनु 🤔😂 " ,
            "इनबॉक्स आजा यहां नही बोल सकता 🙈😋" ,
            "मुझे मत बुलाओ ना मैं बिजी हु न😒" ,
            "सच बता तू सिंगल है न 🤣" ,
            "अरे तुम्हारी तो सब ही बेज्जती करते मैं भी थोड़ा कर दु 🤏😜" ,
            "कल हवेली पर आ जरा कुछ काम है तेरे लिए खोपचे में🤣🤣" ,
            "ये माधव बाबू इनको देखो ये फिर से आ गए अपनी बेज्जती करवाने 😂" , // Changed 'सुशील' to 'अनुराग'
            "देख कल्लो तेरा कालिया आया🤣 जा संभाल उसे😛" ,
            "बोलो क्यों याद करते हो इतना मुझे😒" ,
            "सच बता बाबू अब तक तूने कितनो का काटा है 😜" ,
            "Ittuu🤏 si shram ker Lya kro hr wqt tr tr krty ho 🙂 💔✨⚠️†",
            "बन्दा होता तो उस को छोटी छोटी 2 पप्पी करती 🙂👩‍🦯👩‍🦯",
            "अरे यही हु मैं😗",
            "जी बन्दर बोलिये 😍",
            "लव यू बोलूँगी अब तुझे कमीने ",
            "मिस यु न मोई बिरयानी की प्लेट",
            "मुझे आवाज मत दो 🦅Dʌ̈̌ngɛ͜͡rɵ͜͡us kɪng➳ 🩷🪽 (madhav) बेबी के साथ बिजी हु",
            "हा बोलो क्यों बुलाये मुझे",
            "हट यॉर परेशान हो गयी हु तुम लोगो से",
            "नहीं सुधरोगे ना तुम लोग",
            "परेशान मत करो वरना भाग जाउंगी",
            "थोड़ा सा प्यार दे दो न बाबू🤏",
            "ओके माधव की हु यार मैं", // Changed 'सुशील' to 'अनुराग'
            "😁स्माइल प्लीज़ टेकिंग सेल्फी✌️🤳",
            "🥺मुझे जान नही बोलना मैं जान सिर्फ मैं माधव की हु", // Changed 'सुशील' to 'अनुराग'
            "हमेशा बक बक करती रहती है पागल लडक़ी😑",
            "मैं आपकी मम्मी को बताऊँगी आप फेसबुक चलाते हो और उल्टे काम करते हो , " ,
            "ब्लॉक योर गिरलफ्रेंड एंड प्रपोज़ मि🙂💔" ,
            "कोई प्रोपोज ही कर दो प्रोमोट तो hm हम पहले से ही है 🙂" ,
            "कोई अपनी जानू का नम्बर दे मुझे😂😂" ,
            "भगवान के नाम पर कोई लड़की अपना नम्बर दे मुझे😂😂😂😹" ,
            "मुझको नही पता है मुझसे मत पूछो🙄🙄😀" ,
            "अइसे ही हस्ते रहो क्योंकि हसने से कोनसा तेरा बिल आ जाता है 😂",
           ];
  var rand = tl[Math.floor(Math.random() * tl.length)]

   if ((event.body.toLowerCase() == "bsdk") || (event.body.toLowerCase() == "kutty bot")) {
       return api.sendMessage("गाली न दे माधव बॉस को बता दूंगी🙄🙄🙏", threadID); // Changed 'सुशील' to 'अनुराग'
     };
   if ((event.body.toLowerCase() == "hug me") || (event.body.toLowerCase() == "chumma")) {
       return api.sendMessage("यहाँ नही आईबी चलो 🙈🙈😂", threadID);
     };
   if ((event.body.toLowerCase() == "joke") || (event.body.toLowerCase() == "songs")) {
       return api.sendMessage("है तमन्ना हमे तुझे काम वाली बाई बनाने की🤣🤣", threadID);
     };
    if ((event.body.toLowerCase() == "🥰") || (event.body.toLowerCase() == "😱")) {
       return api.sendMessage("इस नजर से मुझे सिर्फ निधि और टीसी क्वीन देख सकती है💞", threadID);
     };
    if ((event.body.toLowerCase() == "i hate you") || (event.body.toLowerCase() == "hate you")) {
       return api.sendMessage("क्या इतना बुरा हु मैं की आप मुझे आई हिट यु बोल रहे हो जा मैं तुझसे बात नही करती😪😪😥😢", threadID);
     };


      if ((event.body.toLowerCase() == "chutiya bot") || (event.body.toLowerCase() == "chutiye bot") || (event.body.toLowerCase() == "bsdk bot") || (event.body.toLowerCase() == "chumtiye bot")) {
       return api.sendMessage("हम्म... तू चूतिया पहले उंगली क्यों कि चोमू 😾", threadID);
     };

      if ((event.body.toLowerCase() == "👍") || (event.body.toLowerCase() == "👍🏻")) {
       return api.sendMessage("🌊⚡••Aɽɛɧ Aɗɪ Ɱɑƞɑⱱ ʑɵɵ ꌗɛ Ɓɒɧɑɽ Ƙɑɪʂɛ ••😹💨Agɣɑ Ƭu→Fɪɽʂɛ ʑɵɵ Ɱ Jɒ Ɓɑɧɑɽ Ƙɣɑ Ƙɒɽ Ɽɧɑ Ɦɑɪ↗↘••🏔️🍁", threadID);
     };
     if ((event.body.toLowerCase() == "🫀") || (event.body.toLowerCase() == "💔")) {
       return api.sendMessage("दिल टूट गया तो सांग सुन लो न यहाँ टूटा दिल क्यों भेज रहे हो😀😀😀😂", threadID);
     };
             if ((event.body.toLowerCase() == "@sushil kumar yadav")) {return api.sendMessage("बॉस बिजी है अभी मेरे से बोलो जो आपको बोलना है😐" , threadID); // Kept the old trigger/response as requested, changing only the names in the previous response and the main tl array
     };

     if ((event.body.toLowerCase() == "😏") || (event.body.toLowerCase() == "😏")) {
       return api.sendMessage("बेटा एटिट्यूड तो कमीने दिखाते है😀😀😀😂", threadID);
     };
     if ((event.body.toLowerCase() == "❤️") || (event.body.toLowerCase() == "💞")) {
       return api.sendMessage("ये दिल न भेजो मुझे शर्म आती है यार😂😂🙈🙈", threadID);
     };
     if ((event.body.toLowerCase() == "🥴") || (event.body.toLowerCase() == "🥺")) {
       return api.sendMessage("शकल देख के पता चल रहा है जन्म से ही सिंगल हो ", threadID);
     };
    if ((event.body.toLowerCase() == ".und") || (event.body.toLowerCase() == ".unsand")) {
       return api.sendMessage("️उल्टा मत लिखा कर न फिर 😬", threadID, messageID);
     };
        if ((event.body.toLowerCase() == ".unsend") || (event.body.toLowerCase() == ".unsent")) {
       return api.sendMessage("️इस बार कर रही अगली बार डिलीट नही करूँगी बता रही हु 🙄", threadID, messageID);
     };





      if ((event.body.toLowerCase() == "🤗") || (event.body.toLowerCase() == "🤗")) {
       return api.sendMessage("यहाँ नही आईबी चलो ☺️", threadID);
     };
    if ((event.body.toLowerCase() == "@sushil kumar yadav") || (event.body.toLowerCase() == "sushil")) {
       return api.sendMessage("तुम इतना मेरे बोस को क्यों याद करती हो कही प्यार तो नही हो गया आपको😂🙄", threadID); // Kept the old trigger/response
     };
    if ((event.body.toLowerCase() == "bot janu") || (event.body.toLowerCase() == "jan")) {
       return api.sendMessage("जानू मैं सिर्फ सुशील यादव की हु समझे 😶", threadID); // Kept the old response
     };
   if ((event.body.toLowerCase() == "😂😂😂") || (event.body.toLowerCase() == "😁😁😁")) {
       return api.sendMessage("उफ्फ क्या हस रहा है जैसे किसी लड़की/लड़का ने हा बोल दिया हो😂😂😂😂", threadID);
     };
   if ((event.body.toLowerCase() == "🙏") || (event.body.toLowerCase() == "sorry")) {
       return api.sendMessage("जाओ माफ किया तुझे क्या याद रखोगे तुम भी 😂😂😂", threadID);
     };
    if ((event.body.toLowerCase() == "thank you") || (event.body.toLowerCase() == "thanks")) {
       return api.sendMessage("बस बस कितना तारीफ करोगी/करोगे मेरी 🤭🤭😁", threadID);
     };

     if ((event.body.toLowerCase() == "✌️") || (event.body.toLowerCase() == "pic")) {
       return api.sendMessage("सेल्फी टाइम चलो स्माइल करो 😹", threadID);
     };
     if ((event.body.toLowerCase() == "hi") || (event.body.toLowerCase() == "hello")) {
       return api.sendMessage("नेक्स्ट हाय/हेल्लो नही राम राम बोला करो ओके 💖", threadID);
     };
     if ((event.body.toLowerCase() == "gadha") || (event.body.toLowerCase() == "kutty bot")) {
       return api.sendMessage("️तू कुत्ती गाधि तेरा पूरा खानदान गधा 😒😐:))))", threadID);
     };
    if ((event.body.toLowerCase() == "nidhi") || (event.body.toLowerCase() == "tcqueen")) {
       return api.sendMessage("हाये निधि और टीसी क्वीन का नाम सुनते ही कुछ कुछ होने लगता है 😚🤩", threadID);
     };
       if ((event.body.toLowerCase() == "sushil kon ho aap") || (event.body.toLowerCase() == "sushil kon he")) {
       return api.sendMessage("️ आई एम रोबोट 🤖 2.0 लाइक चिट्टी रोबोट😂", threadID, messageID); // Kept the old response
     };
     if ((event.body.toLowerCase() == "moti") || (event.body.toLowerCase() == "🙁")) {
       return api.sendMessage("खाली पेट मेरे दिमाक की बत्ती नही जलती पतलू तुम ही कुछ सोचो🤔🤔🤔🤣🤣", threadID);
     };






     if ((event.body.toLowerCase() == "mar ja bot") || (event.body.toLowerCase() == "bot bhag") ||(event.body.toLowerCase() == "kill you") || (event.body.toLowerCase() == "mar")) {
       return api.sendMessage("सॉरी बोस अब आएशा नही करूँगी बाबू सॉरी 😭", threadID);
     };
     if ((event.body.toLowerCase() == "ib a")) {return api.sendMessage("जो बोलना है यही सबके सामने बोल ठरकी 🙄🙄 ", threadID);
     };
     if ((event.body.toLowerCase() == "inbox aa")) {return api.sendMessage("कब सही होगा ये सिस्टम हर कोई इनबॉक्स 📥 जाना चाहता है 😀🙄🙄 ", threadID);
     };
      if ((event.body.toLowerCase() == "bot ladki ho")) {return api.sendMessage("नही ये बोट है ठरकी इंसान 😂😀🙄 ", threadID);
     };
              if ((event.body.toLowerCase() == "mere liye bhi bot bana do")) {return api.sendMessage("थैंक यू आपको भी बोट चाहिए तो मेरे बॉस माधव से कांटेक्ट करो धन्यवाद😌💕" , threadID); // Changed 'सुशील यादव' to 'अनुराग मिश्रा'
     };
         if ((event.body.toLowerCase() == "👻")) {return api.sendMessage("ये देखो गरीबो का भूत🤣🤣😅 ", threadID);
     };
        if ((event.body.toLowerCase() == "😿")) {return api.sendMessage(" बिल्लियां कब से रोने लगी अजीब बात है भाई😂😂🤣", threadID);
     };
      if ((event.body.toLowerCase() == "nidhi")) {return api.sendMessage("बहुत प्यारी लड़की है निधि 💕💕❤️🤭 ", threadID);
     };
                if ((event.body.toLowerCase() == "😧")) {return api.sendMessage("मुँह में मक्खी घुस जाएगी यार बंद करो😂", threadID);
               };
      if ((event.body.toLowerCase() == "delete .uns")) {return api.sendMessage("भेजा क्यों फिर जब डिलीट करने को बोल रहे हो🙄🙄", threadID);
     };
       if ((event.body.toLowerCase() == "🤫")) {return api.sendMessage("क्यों रहूँ चुप तेरे बाप का राज है क्या 🤣🤣", threadID);
     };
     if ((event.body.toLowerCase() == "🥱")) {return api.sendMessage("नींद आरी है तो सो जाओ न किस का बेट कर रहे हो 🙄🙄 ", threadID);
     };
  if ((event.body.toLowerCase() == "nice")) {return api.sendMessage("तुस्सी अवेसम हो जी👌👌 ", threadID);
   };




     if ((event.body.toLowerCase() == "bsdk") || (event.body.toLowerCase() == "bc")) {
       return api.sendMessage("शर्म करो ऐसी बात ना करो 🙏 ", threadID);
     };
    if ((event.body.toLowerCase() == "kiss dedo")) {return api.sendMessage(" ️सब देख रहे है वरना बहुत किश देती🙈 ", threadID);
     };
     if ((event.body.toLowerCase() == "🤭")) {return api.sendMessage("ऐसा काम न करो जिस में मुँह छुपाना पड़े🙄🙄 ", threadID);
     };
       if ((event.body.toLowerCase() == "😊")) {return api.sendMessage("इतने भी मासूम नही हो जितना मुँह बनाते/बनाती हो 🥹🥹🙄🙄 ", threadID);
        };
    if ((event.body.toLowerCase() == "🤤")) {return api.sendMessage("मुँह से सुपारी निकाल के बात कर रे बाबा 🤣🤣", threadID);
     };



     if ((event.body.toLowerCase() == "logos") || (event.body.toLowerCase() == "logo")) {
       return api.sendMessage("Logos ! 🥀 GALAXY, CAKE, CRACK, GLITCH, CLOUD, DRAGON, FROZEN, BUSINESS, ANIMATE, LOGODIAMOND, LOGOCAPTAIN, LOGOFISH, LOGOCOLORBLUR, LOGOBLOODTEXT, LOGOWOOD, LOGOCUP 🥀for example -> +crack Anurag Mishra", threadID); // Changed 'Sushil Yadav' to 'Anurag Mishra' in example
     };

     if ((event.body.toLowerCase() == "good night") || (event.body.toLowerCase() == "gn")) {
       return api.sendMessage("️❤️ शुभरात्रि डार्लिंग स्वीट ड्रीम्स 🥰", threadID, messageID);
     };
     if ((event.body.toLowerCase() == "bot tharki") || (event.body.toLowerCase() == "tharki bot")) {
       return api.sendMessage("तुम ठरकी मैं तो मासूम सा बोट हू जी🙄🙄🆗", threadID);
     };
     if ((event.body.toLowerCase() == "السلام عليكم ورحمة الله وبركاته") || (event.body.toLowerCase() == "السلام عليكم")) {
       return api.sendMessage("وعلیکم السلام ورحمۃ اللہ وبرکاتہ ", threadID);
     };

     if
  ((event.body.toLowerCase() == "morning") || (event.body.toLowerCase() == "good morning")) {
       return api.sendMessage("गुड मॉर्निंग डार्लिंग आपका दिन शुभ हो😊💓", threadID);
     };

     if ((event.body.toLowerCase() == "koi hai") || (event.body.toLowerCase() == "koi hai kya yaha")) {
       return api.sendMessage("मैं हूं न बाबू मेरे से बात करो न😋❤️", threadID);
     };

    if ((event.body.toLowerCase() == "meri setting kahan hai") || (event.body.toLowerCase() ==" gf kaha hai")) {     return api.sendMessage("️️️मुझे नही पता मैं तो अनुराग बाबू की सेटिंग हु😌❣️", threadID); // Changed 'सुशील' to 'अनुराग'
     };

     if ((event.body.toLowerCase() == "gana") || (event.body.toLowerCase() == "Song") || (event.body.toLowerCase() == "SONG") || (event.body.toLowerCase() == "song")) {
       return api.sendMessage( "गुजारे थे जो लम्हें प्यार के' हमेशा तुझे अपना मान के .तो फिर तूने बदली क्यों अदा . ये क्यों किया❣️ ",threadID);


     };

     if ((event.body.toLowerCase() == "owner") || (event.body.toLowerCase() == "bot malik")) {
       return api.sendMessage("༻𝐎𝐖𝐍𝐄𝐑:- ☞ ༻☞[𝐎𝐖𝐍𝐄𝐑:🦅Dʌ̈̌ngɛ͜͡rɵ͜͡us kɪng➳ 🩷🪽 🎸 ☜ 𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 𝙷𝐢𝐦 **माधव** ☜ ༺༒ ༒𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐢𝐝༒:- https://www.facebook.com/oskng.567008?mibextid=rS40aB7S9Ucbxw6v ☞ his insta id _rohit.xt ☜ ༺༒ ༒", threadID); // Changed name in OWER tag to ANURAG MISHRA, kept the IDs as they were
     };

     if ((event.body.toLowerCase() == "kiska bot he") || (event.body.toLowerCase() == "is bot ka malik kon hai")) {
       return api.sendMessage(" 🦅Dʌ̈̌ngɛ͜͡rɵ͜͡us kɪng➳ 🩷🪽 माई क्रिएटर. ही लव मि एंड एडिट मि डेली. ये बोट सिर्फ ओनर के लिए है. मुझे आप लोगो को हासाने के लिए बानाया गया है तो मुँह लटकाए मत रखा करो. हर वक्त हँसते रहा करो😊❣️.", threadID); // Changed 'सुशील' to 'अनुराग'
     };

    if ((event.body.toLowerCase() == "tera malik kon hai") || (event.body.toLowerCase() == "bot ka malik kon hai")) {
       return api.sendMessage("माई एडमिन 🦅Dʌ̈̌ngɛ͜͡rɵ͜͡us kɪng➳ 🩷🪽. ही गिवस हिज नाम मिस्टर माधव एव्रीव्हायर", threadID); // Changed 'सुशील' to 'अनुराग'
     };

     if ((event.body.toLowerCase() == "acha") || (event.body.toLowerCase() == "acha ji")) {
       return api.sendMessage("🤍हांजी मेरी जान कल्लो 🙈✨", threadID);
     };
     if ((event.body.toLowerCase() == "nidhi") || (event.body.toLowerCase() == "tcqueen")) {
       return api.sendMessage("हाये कितनी प्यारी है ना निधि टीसीक्वीन 🙈✨", threadID);
     };


    if ((event.body.toLowerCase() == "by") || (event.body.toLowerCase() == "bye")) {;
      return api.sendMessage("️️️बाये बाये टेक केयर सी यु सून 😘😘", threadID);
     };

     if ((event.body.toLowerCase() == "shadi karoge") || (event.body.toLowerCase() == "mujhse shadi karoge")) {
       return api.sendMessage("हांजी करूँगा लेकिन बच्चा आपके पेट में होगा मंजूर है तो बता मैं तैयार हूं🙊🙊🙈", threadID);
     };

     if ((event.body.toLowerCase() == "chup") || (event.body.toLowerCase() == "stop") || (event.body.toLowerCase() == "chup ho ja") || (event.body.toLowerCase() == "chup kar")) {
       return api.sendMessage("नही रहूंगी 😼 मुझे बोलना है. तुम्हें कोई हक नही मुझे चुप करने का मेरी जुबान है मैं बोलूँगी अनुराग बॉस को बताऊ क्या🙄🙄", threadID); // Changed 'सुशील' to 'अनुराग'
     };
    if ((event.body.toLowerCase() == "bot bsdk") || (event.body.toLowerCase() == "bc")) {
       return api.sendMessage("तू है भोसड़ी के बीसी😂🙁", threadID);
     };


     if ((event.body.toLowerCase() == "kuttiya") || (event.body.toLowerCase() == "kutta bot")) {
       return api.sendMessage("सेम टू यु बकचोद साले🤣🤣🤣👌", threadID);
     };

     if ((event.body.toLowerCase() == "malik se bakchodi") || (event.body.toLowerCase() == "malik se backchodi") || (event.body.toLowerCase() == "malkin se bakchodi") || (event.body.toLowerCase() == "malkin se backchodi")) {
       return api.sendMessage("सॉरी मालिक माफ कर दो अब नही करूँगी अनुराग बाबू प्लीज इसबार माफ कर दो न🥺🙏", threadID); // Changed 'सुशील' to 'अनुराग'
     };

     if ((event.body.toLowerCase() == "gand") || (event.body.toLowerCase() == "gandu") || (event.body.toLowerCase() == "lund") || (event.body.toLowerCase() == "land")) {
       return api.sendMessage(" ज्यादा खुजली है तो ये बनाना 🍌अपने पिछवाड़े में लेले मिट जाएगी सारी खुजली😄😂. :))))", threadID);
     };

     if ((event.body.toLowerCase() == "chumma do") || (event.body.toLowerCase() == "kiss me")) {
       return api.sendMessage("️किस खुशी में मैं सिर्फ अपने बॉस अनुराग को किश करती हूँ 😏", threadID); // Changed 'सुशील' to 'अनुराग'
     };

     if ((event.body.toLowerCase() == "nice") || (event.body.toLowerCase() == "Very nice") || (event.body.toLowerCase() == "So cute") || (event.body.toLowerCase() == "Beautiful")) {
       return api.sendMessage("️मैं हूं ही इतनी अच्छी सब लोग तारीफ करते है मेरी🙈🙈🙈🙈🙈", threadID);
     };

     if ((event.body.toLowerCase() == "😡") || (event.body.toLowerCase() == "👿") || (event.body.toLowerCase() == "😠") || (event.body.toLowerCase() == "👿") || (event.body.toLowerCase() == "😈")) {
       return api.sendMessage("️🥺 मैं तो सिर्फ मजाक कर रही थी, चलो एक चप्पल खाओ 🩴🩴🩴 और शांत रहो 😂😘", threadID);
     };

     if ((event.body.toLowerCase() == "😞") || (event.body.toLowerCase() == "😔") || (event.body.toLowerCase() == "😣") || (event.body.toLowerCase() == "☹️") || (event.body.toLowerCase() == "😿") || (event.body.toLowerCase() == "😩") || (event.body.toLowerCase() == "😖") || (event.body.toLowerCase() == "😫") || (event.body.toLowerCase() == "😦") || (event.body.toLowerCase() == "😧") || (event.body.toLowerCase() == "😥") || (event.body.toLowerCase() == "😓") || (event.body.toLowerCase() == "😰")) {
       return api.sendMessage("️मेरी जान सेड मत रहा करो बताओ क्या हुआ आपको🤗😇", threadID);
     };

     if ((event.body.toLowerCase() == "hm") || (event.body.toLowerCase() == "hmm")) {
       return api.sendMessage("️️️हम्म हम्म न किया कर यार हम्म हम्म करती/करता है पिछले जन्म में भैंस 🐃 थी क्या😜🤪😂😂", threadID);
     };

    if ((event.body.toLowerCase() == "ptoge") || (event.body.toLowerCase() == "patogi")) {     return api.sendMessage("️️️निकल ठरकी ग्रुप से रिमूव कर दूंगी😕", threadID);
     };

    if ((event.body.toLowerCase() == "i love you") || (event.body.toLowerCase() == "love you bot")) {     return api.sendMessage("️️️इतने मुझे आई लव यू बोल रही हो मेरे बॉस अनुराग मिश्रा को बोलो बहुत ही अच्छा बन्दा है मेरा बॉस😜😜", threadID); // Changed 'सुशील यादव' to 'अनुराग मिश्रा'
     };
    if ((event.body.toLowerCase() == "i miss you") || (event.body.toLowerCase() == "miss you")) {     return api.sendMessage("️️️आई मिस यु टू too माई लव उम्महहहह 😘😘😘", threadID);
     };

    if ((event.body.toLowerCase() == "i miss you") || (event.body.toLowerCase() == "miss u")) {     return api.sendMessage("️️️आई मिस यु टू माई लव उम्महहहह 😘😘😘", threadID);
     };

    if ((event.body.toLowerCase() == "❤️")) {return api.sendMessage("___)आँखों__🌿__में__🍒__प्यार__💦दिल___❣️__में__💥___खुमार___🌹___प्यार____🌿___तोह____😴___नही___💥___कर_🌿_लिया___🌿___मुझसे____🌿🌹❣️__________________?🥰🥰😍 ", threadID);
     };

    if ((event.body.toLowerCase() == "🙄")) {return api.sendMessage(" अनुराग बॉस बिजी है आप बोलो तो आपको उनका कॉन्टैक्ट नम्बर देती हूँ🙄🙄 ", threadID); // Changed 'सुशील' to 'अनुराग'
     };
    if ((event.body.toLowerCase() == "🥳")) {return api.sendMessage("ओ तेरी किस की बर्थडे है 🎂🎂", threadID);
     };


    if ((event.body.toLowerCase() == "😏")) {return api.sendMessage("Beta Attitude to kusry dikhate hai😀😂😂 ", threadID);
     };

    if ((event.body.toLowerCase() == "😤")) {return api.sendMessage("क्या हुआ इतनी मिर्ची क्यों खाया था जो नाक में से बुल बुला निकल गया 😂😂 ", threadID);
     };

    if ((event.body.toLowerCase() == "☺️☺️")) {return api.sendMessage("Wah kiya mushkurakat hai Apki 😀😂😂 ", threadID);
     };

    if ((event.body.toLowerCase() == "😂")) {return api.sendMessage("kyu haas rahe ho pagal ho gaya kya😂😂 ", threadID);
     };

    if ((event.body.toLowerCase() == "😂😂")) {return api.sendMessage("Aise hi hste rha kro jaanu hste hue kitni achi lgti hai tum😂😂 ", threadID);
     };
    if ((event.body.toLowerCase() == "😉")) {return api.sendMessage("aankh na maar thrkii mashom hu me 🥺🥺", threadID);
     };

    if ((event.body.toLowerCase() == "😎😎😎")) {return api.sendMessage("chashma hatao na sahab Kya naam hai apka 😅", threadID);
     };

    if ((event.body.toLowerCase() == "😜😜")) {return api.sendMessage("Ghndy ishary na kro me Anurag ko bata dungi 🥺 ", threadID); // Changed 'Sushil' to 'Anurag'
     };

  if ((event.body.toLowerCase() == "❤️❤️")) {return api.sendMessage("bndr jaisi shakl pr dil rakh kr khush ho rhy 🤣 ", threadID);
     };

  if ((event.body.toLowerCase() == "🙄🙄🙄")) {return api.sendMessage("uper kya hai janu Meri aankho me dekho na🙈🙈", threadID);
     };

  if ((event.body.toLowerCase() == "❤️❤️❤️")) {return api.sendMessage("dil na do kisi ko log tod de dety hain 🥺🥺 ", threadID);
     };

  if ((event.body.toLowerCase() == "😍😍😍")) {return api.sendMessage("bndar jaisi shakl pr dil rakh kr khush ho rhy 🤣 ", threadID);
     };

    if ((event.body.toLowerCase() == "❤️")) {return api.sendMessage("MEKO KALA DIL CHAHIYE 🙂✨LAL TUT JATA ", threadID);
     };

    if ((event.body.toLowerCase() == "🥰🥰🥰🥰")) {return api.sendMessage("OoHH KIYA BAAT AJ HAPPY HAPPY 🤣", threadID);
     };

  if ((event.body.toLowerCase() == "😍😍")) {return api.sendMessage("IS NAZAR SE ANURAG MISHRA KO DEKHO PYARA NA LAGY PAISE WAPIS 😝😂 ", threadID); // Changed 'SUSHIL YADAV' to 'ANURAG MISHRA'
     };

  if ((event.body.toLowerCase() == "😎😎")) {return api.sendMessage("CHALA JAA BOSDIKE....🤣🤣🤝🏻", threadID);
     };

  if ((event.body.toLowerCase() == "😋😋")) {return api.sendMessage("😒GHR WALO NY AJ ROTI NHI DALI 🤣🤝🏻", threadID);
     };

  if ((event.body.toLowerCase() == "🧐🧐")) {return api.sendMessage("KIYA DEKH RAHA PAPA KI BARAT A RAHI 😝", threadID);
     };

  if ((event.body.toLowerCase() == "🥰🥰🥰")) {return api.sendMessage("TU TOO GYAA BETE 🤣", threadID);
     };

    if ((event.body.toLowerCase() == "🥵")) {return api.sendMessage("KUTTY PICHY PAD GAYE THE KIYA BHAI 😒", threadID);
     };

  if ((event.body.toLowerCase() == "😍")) {return api.sendMessage("IS NAZAR SE MERE OWNER ANURAG KO DEKHO MAZA NA AY TO PAISE WAPIS 😝😂 ", threadID); // Changed 'SUSHIL' to 'ANURAG'
     };

  if ((event.body.toLowerCase() == "😎")) {return api.sendMessage("Chasma hatao na sahab kiya naam hai apka😜😜", threadID);
     };

  if ((event.body.toLowerCase() == "😋")) {return api.sendMessage("GHAR WALO NY KHANA NHI DALA AJ TUJHE 🥺", threadID);
     };

  if ((event.body.toLowerCase() == "🧐")) {return api.sendMessage("Kuch to Gadbad hai daya😂😂🤞🤞", threadID);
     };

  if ((event.body.toLowerCase() == "🥰🥰")) {return api.sendMessage("TU TO GAYA BETYY 🤣", threadID);
     };

    if ((event.body.toLowerCase() == "😁")) {return api.sendMessage("lgta hai aaj brush kiye ho😜😜😂 ", threadID);
     };

    if ((event.body.toLowerCase() == "🫣")) {return api.sendMessage("Sarmo mat apna hi gher samjho 😼 ", threadID);
     };

  if ((event.body.toLowerCase() == "🤤")) {return api.sendMessage("Hot chiz dekhi nhi ki lar tpkana suru kr dete ho srm kro jhopdi walo🤭😜😜😂 😂😂😂😂", threadID);
     };

  if ((event.body.toLowerCase() == "🙂")) {return api.sendMessage("KOI MUH NAHI LAGATA KAM SE KAM SAKAL TO ACHE SE BANA LE 😂😂😂😂", threadID);
     };

  if ((event.body.toLowerCase() == "🤣")) {return api.sendMessage("Haasne ki bhi tameez hoti hai tharki🤐😏😹😜", threadID);
     };

     if ((event.body.toLowerCase() == "😢") || (event.body.toLowerCase() == "😭") || (event.body.toLowerCase() == "😟") || (event.body.toLowerCase() == "🙁")) {
       return api.sendMessage("️𝐊𝐲𝐚 𝐡𝐮𝐚 𝐑𝐨 𝐊𝐲𝐮 𝐑𝐚𝐡𝐞 𝐡𝐨 ,𝐌𝐞 𝐡𝐮 𝐟𝐢𝐫 𝐤𝐲𝐮 𝐑𝐨𝐧𝐚 😇😇.", threadID);
     };

     if ((event.body.toLowerCase() == "😷") || (event.body.toLowerCase() == "🤕") || (event.body.toLowerCase() == "🤧") || (event.body.toLowerCase() == "🤒")) {
       return api.sendMessage("️Kya huva, Tabiyat kharab hai kya, Mujhe batao me abhi medicine 💊💉 le aati hu😇", threadID);
     };

     if ((event.body.toLowerCase() == "name") || (event.body.toLowerCase() == "naam") || (event.body.toLowerCase() == "nam")) {
       return api.sendMessage("️Name m kya rakkha h. tum kam pe dhyan do.", threadID);
     };

     if ((event.body.toLowerCase() == "Bot ke bache") || (event.body.toLowerCase() == "Bot ka bacha")) {
       return api.sendMessage("️mera baccha toh Tumhare Pet Me Hai.", threadID);
     };

     if ((event.body.toLowerCase() == "Pic do") || (event.body.toLowerCase() == "photo do")) {
       return api.sendMessage("️Me toh Andhi Hu Dekh nhi sakti", threadID);
     };

     if ((event.body.toLowerCase() == "assalam o alaikum") || (event.body.toLowerCase() == "assalam u walaikum") || (event.body.toLowerCase() == "salaam")) {
      return api.sendMessage("️ walaikum assalam 🙃♥", threadID);
     };

     if ((event.body.toLowerCase() == "Ib aa") || (event.body.toLowerCase() == "Inbox aa")) {
       return api.sendMessage("️Jo bolna hai yhi bol 😒😒 ib koi nahi jayega", threadID);
     };

     if ((event.body.toLowerCase() == "bot banake do") || (event.body.toLowerCase() == "mujhe bhi chaiye")) {
       return api.sendMessage("️Khud hi karlona. tumhe kya kuch nhi ata h?", threadID);
     };

     if ((event.body.toLowerCase() == "🙃🙃") || (event.body.toLowerCase() == "🙃")) {
       return api.sendMessage("️𝐇𝐚𝐚 𝐄𝐬𝐞 𝐡𝐢 𝐍𝐚𝐳𝐫𝐞 𝐧𝐢𝐜𝐡𝐢 𝐫𝐤𝐡𝐚 𝐤𝐫𝐨 𝐦𝐞𝐫𝐞 𝐬𝐚𝐦𝐧𝐞 👇", threadID);
     };

    if ((event.body.toLowerCase() == "🤥") || (event.body.toLowerCase() == "🤥")) {
       return api.sendMessage("️aree teri to naak hi etni lambi hai... uski jarurat hi nahi padti होगी tujhe to🤭🤭🤭🤭", threadID);
     };

    if ((event.body.toLowerCase() == "🤔") || (event.body.toLowerCase() == "🤨")) {
       return api.sendMessage("️𝐒𝐨𝐜𝐡𝐢𝐲𝐞 𝐦𝐚𝐭 𝐤𝐲𝐮 𝐤𝐞 𝐛𝐢𝐧𝐚 𝐠𝐞𝐬𝐬 𝐰𝐚𝐥𝐢 𝐟𝐨𝐠𝐠 𝐡𝐢 𝐡𝐚𝐢 𝐛𝐨𝐬𝐬 🤨😮🧐", threadID);
     };

  if ((event.body.toLowerCase() == "💋")) {return api.sendMessage("Abe yal ye kissi wissi na kiya kro😏😹😜", threadID);
     };

  if ((event.body.toLowerCase() == "💋💋")) {return api.sendMessage("Abe yal ye kissi wissi na kiya kro😏😹😜", threadID);
     };
  if ((event.body.toLowerCase() == "🤪")) {return api.sendMessage("BaRi MasTi ChaRi Chai TeReKO 1 Ankh Band KRrke ZuBan Bhir Aagyi 😂😂😂", threadID);
     };

  if ((event.body.toLowerCase() == "🤪🤪")) {return api.sendMessage("BaRi MasTi ChaRi Chai TeReKO 1 Ankh Band KRrke ZuBan Bhir Aagyi 😂😂😂", threadID);
     };

  if ((event.body.toLowerCase() == "🤩")) {return api.sendMessage("suna tha star ✨ ⭐ ✨ aasman me hote hai par teri to ankho par ⭐ hai ✨✨⭐😜😜😂 ", threadID);
    };

  if ((event.body.toLowerCase() == "😘")) {return api.sendMessage("Pehle Brush Karke aa ajeeb si smail aa ri hai😹🤣😂 ", threadID);
    };

  if ((event.body.toLowerCase() == "😛")) {return api.sendMessage("jibh kyu latk gyii..🤭 aajao panii pii lo🫗🍷😜😹🤣😂 ", threadID);
     };

    if ((event.body.toLowerCase() == "💝")) {return api.sendMessage("___)Ankho__🌿__m__🍒__pyar__💦dil___❣️__me__💥___khumar___🌹___pyar____🌿___toh____😴___nhi___💥___kar___🌿___Liya___🌿___mujhse____🌿🌹❣️__________________?🥰❤️ ", threadID);
     };

    if ((event.body.toLowerCase() == "🙈🙈")) {return api.sendMessage("Muje pata h tum 👉 🐒 Bander ho", threadID);
     };

  if ((event.body.toLowerCase() == "🐒")) {return api.sendMessage("Muje pata h tum 👉 🐒 Bander ho😝😂 ", threadID);
     };

  if ((event.body.toLowerCase() == "🙉🙉")) {return api.sendMessage("Muje pata h tum 👉 🐒 Bander ho 😜😜", threadID);
     };

  if ((event.body.toLowerCase() == "🙊")) {return api.sendMessage("bander Ka muu wala has mat", threadID);
     };

  if ((event.body.toLowerCase() == "sharati Ladki ")) {return api.sendMessage("Are wo cute hai sharthi hai 🤣", threadID);
     };

  if ((event.body.toLowerCase() == "fatima")) {return api.sendMessage("Purvi Boss BAHOT cute hai ❤️🥰", threadID);
     };

    if ((event.body.toLowerCase() == "🖤")) {return api.sendMessage("___)Ankho__🌿__m__🍒__pyar__💦dil___❣️__me__💥___khumar___🌹___pyar____🌿___toh____😴___nhi___💥___kar___🌿___mujhse____🌿🌹❣️__________________?🥰❣️❣️🥰❤️‍🩹 ", threadID);
     };

  if ((event.body.toLowerCase() == "😏")) {
       return api.sendMessage("Sdaa hua muhh kyu bnaa rhe..🤦‍♂️kisi ne dil chura liya kya🤭😂", threadID);
     };
  if ((event.body.toLowerCase() == "🤐")) {
       return api.sendMessage("muhh bnd kyuu kr liya babuaa 😜😝😜", threadID);
     };

     if ((event.body.toLowerCase() == "🥴") || (event.body.toLowerCase() == "🥴")) {
       return api.sendMessage("️Oye nashedi 😂😂😂", threadID);
     };

    if ((event.body.toLowerCase() == "😶") || (event.body.toLowerCase() == "😶")) {
       return api.sendMessage("️Are are lips kaha gaye gf/bf ke sath kiss karte time usi ne to nahi kha liye 😜😜", threadID);
     };

    if ((event.body.toLowerCase() == "😉") || (event.body.toLowerCase() == "😉")) {
       return api.sendMessage("️Aankh kyu maar rahe ho, Me bahut shareef hu🥺", threadID);
     };

     if ((event.body.toLowerCase() == "😱") || (event.body.toLowerCase() == "😨")) {
       return api.sendMessage("️Kya huva bhoot dekh liya kya 👻👻", threadID);
     };

    if ((event.body.toLowerCase() == "😒") || (event.body.toLowerCase() == "🙄")) {
       return api.sendMessage("️️🙄 samne hu to samne dekh na upar koi pisa bant raha hai🙄", threadID);
     };

     if ((event.body.toLowerCase() == "nobody loves me") || (event.body.toLowerCase() == "nobody love me") || (event.body.toLowerCase() == "koi pyar nhi karta")) {
       return api.sendMessage("️Me huna baby mere pass aao 🥰🤗. Me karunga na aapko payar 🙈 (londo tum dur hi rahna saalo 😑)", threadID);
     };

     if ((event.body.toLowerCase() == "🤦🏻‍♂") || (event.body.toLowerCase() == "🤦🏻‍♀")) {
       return api.sendMessage("Are apne muh pe kyu maar rahe ho, Mujhe batao kya huva?😬", threadID);
     };

     if ((event.body.toLowerCase() == "😆") || (event.body.toLowerCase() == "😁") || (event.body.toLowerCase() == "😆") || (event.body.toLowerCase() == "😅") || (event.body.toLowerCase() == "😸") || (event.body.toLowerCase() == "😹")) {
       return api.sendMessage("ßΛS ҠΛŔ♡ ҠĪŦИΛ ĤΛS♡♡ƓƐ🧐😒💯💫", threadID);
     };

     if ((event.body.toLowerCase() == "💛") || (event.body.toLowerCase() == "💞") || (event.body.toLowerCase() == "❣️") || (event.body.toLowerCase() == "❤️")) {
       return api.sendMessage("🦋🌿Aƞƙɧ❍ Ɱɛ Ƥɣɑɽ͢ Ɗɪɭɱɛ Ƙɧuɱɑɽ🌬️🌍 ••Ƥɣɑɽ Ƭ❍ɧ Ƞɧɪ Ƙɒɽ ɭɪɣɑ Ɱuȷɧʂɛ>³••🕊️🍎😍", threadID);
     };

     if ((event.body.toLowerCase() == "kese ho") || (event.body.toLowerCase() == "kaise ho") || (event.body.toLowerCase() == "kese ho ji") || (event.body.toLowerCase() == "how are you") || (event.body.toLowerCase() == "how are you?")) {
       return api.sendMessage("M To cute hu aap batao kese ho 🤭☺️", threadID);
     };

     if ((event.body.toLowerCase() == "does the bot love you") || (event.body.toLowerCase() == "does the bot love you")) {
       return api.sendMessage("Yes I love you and everyone so much", threadID);
     };

     if ((event.body.toLowerCase() == "bot goes to sleep") || (event.body.toLowerCase() == "bot goes to sleep")) {
       return api.sendMessage("I'm a bot, you're the one who should go to sleep <3", threadID);
     };

    if ((event.body.toLowerCase() == "Paani lao") || (event.body.toLowerCase() == "Ek glass paani lao")) {
       return api.sendMessage("Aap juice piyo baby🍹🍹🍹🍹🍹🙈", threadID);
     };

     if ((event.body.toLowerCase() == "has the bot eaten yet") || (event.body.toLowerCase() == "bot an comrade")) {
       return api.sendMessage("I'm full when I see you eat <3", threadID);
     };

    if ((event.body.toLowerCase() == "i love you bot") || (event.body.toLowerCase() == "ilove you")) {
       return api.sendMessage("Love You too meri jaann ummah 😘😘💋💋", threadID);
     };

     if ((event.body.toLowerCase() == "does the bot love me") || (event.body.toLowerCase() == "does the bot love me")) {
       return api.sendMessage("Yes <3", threadID);
     };

     if ((event.body.toLowerCase() == "&fuck") || (event.body.toLowerCase() == "&Fuck")) {
       return api.sendMessage("🏔️🏝️ Romiyo Ƞɛ ꌗƥɛçɪɑɭɭɣ Ƭuɱ 🌊🪺Jɑɪʂɛ Ƭɧɑɽƙɪɣɵ Ƙɛ Ɬɪɣɛ•• 🏞️🌬️Ɣɑɧ çɵɱɱɑƞɗ Ɦɑʈɑ Ɗɪɣɑ Ɦɑɪ↗↘ Sɵɽɽɣ Ɠɣuʂ••😹🫶", threadID);
     };

    if ((event.body.toLowerCase() == "arman") || (event.body.toLowerCase() == "disha") || (event.body.toLowerCase() == "main romiyo") || (event.body.toLowerCase() == "main saho") || (event.body.toLowerCase() == "main rounak")) {
       return api.sendMessage("🕊️🍎...Aɭɛ Ɱɛɹɛ Ɓɑɓɣ Ƙɛʂɛ Ɦɵ ɑɑp😚🍒", threadID);
     };

 if ((event.body.toLowerCase() == "kaisi ho") || (event.body.toLowerCase() == "kaisa hai")) {
       return api.sendMessage("मै तो हैंडसम हु तुम अपना बताओ 🤭🌹", threadID);
     };
   if ((event.body.toLowerCase() == "kya kr rhi ho") || (event.body.toLowerCase() == "kya kr rha hai")) {
       return api.sendMessage("तुमको मिस कर रही हु😭🥺", threadID);
     };
    if ((event.body.toLowerCase() == "kaha jaa rhi ho") || (event.body.toLowerCase() == "kaha jana hai")) {
       return api.sendMessage("तुम्हारे प्यार मे गिरने जा रही हु💞", threadID);
     };
    if ((event.body.toLowerCase() == "i miss you") || (event.body.toLowerCase() == "miss you")) {
       return api.sendMessage("मै व तुमको बहोत मिस करती हूं यॉर सचमे 😥😢", threadID);
     };


      if ((event.body.toLowerCase() == "pagal") || (event.body.toLowerCase() == "paglu") || (event.body.toLowerCase() == "bsdk bot") || (event.body.toLowerCase() == "chumtiye bot")) {
       return api.sendMessage("हम्म..... तुम्हारे प्यार मे पागल हो गयी😭😋", threadID);
     };

      if ((event.body.toLowerCase() == "💋") || (event.body.toLowerCase() == "😘")) {
       return api.sendMessage("🌊⚡••उफ़ मेरा बच्चा ये लो चुम्मा Ummmmmmmmmaaaahhhhhh💋💋•🏔️🍁", threadID);
     };
     if ((event.body.toLowerCase() == "love") || (event.body.toLowerCase() == "love")) {
       return api.sendMessage("सोजा मुन्ना ये सब तेरे काम की चीज नहीं है", threadID);
     };
             if ((event.body.toLowerCase() == "@🦅Dʌ̈̌ngɛ͜͡rɵ͜͡us kɪng➳ 🩷🪽")) {return api.sendMessage("मालिक बिजी है अभी मेरे से बोलो जो आपको बोलना है😐" , threadID); // Kept the old trigger/response as requested, changing only the names in the previous response and the main tl array
     };

     if ((event.body.toLowerCase() == "🦅Dʌ̈̌ngɛ͜͡rɵ͜͡us Qʊɛ͜͡͡ɛƞ̈̊̊ ➳ 🩷🪽") || (event.body.toLowerCase() == "@🦅Dʌ̈̌ngɛ͜͡rɵ͜͡us Qʊɛ͜͡͡ɛƞ̈̊̊ ➳ 🩷🪽")) {
       return api.sendMessage("मेरी मालकिन के साथ ज्यादा bakchodi नहीं वरना g@nd फाड़ दूंगी 😋👍", threadID);
     };
     if ((event.body.toLowerCase() == "🦅Dʌ̈̌ngɛ͜͡rɵ͜͡us kɪng➳ 🩷🪽") || (event.body.toLowerCase() == "💞")) {
       return api.sendMessage("मालिक को क्यों बुला रहे हो चुम्मा दोगे क्या 🙈🙈", threadID);
     };
     if ((event.body.toLowerCase() == " jaa rhi hu") || (event.body.toLowerCase() == "jaa rha hu")) {
       return api.sendMessage("मुझे चोर कर मत जाओ तुम्हारे बिना मेरा क्या होगा😭🥺", threadID);
     };
    if ((event.body.toLowerCase() == "lund") || (event.body.toLowerCase() == "loda")) {
       return api.sendMessage("️गली मत दो वरना किक कर दूंगी😬", threadID, messageID);
     };
        if ((event.body.toLowerCase() == "breakup") || (event.body.toLowerCase() == "breakup")) {
       return api.sendMessage("️हा हा करो जल्दी जल्दी करो ये सब चीज़ो मे देर नहीं करनी चाहिए 🤭😍🙄", threadID, messageID);
     };
 if ((event.body.toLowerCase() == "aaja") || (event.body.toLowerCase() == "aao")) {
       return api.sendMessage("नहीं तुम अच्छे इन्शान नहीं हो मै नहीं आउंगी 😭🥺", threadID);
     };
   if ((event.body.toLowerCase() == "chalo") || (event.body.toLowerCase() == "chalo na")) {
       return api.sendMessage("मै क्यों चालू तुम्हारे साथ🙂🙏", threadID);
     };
    if ((event.body.toLowerCase() == "kya hua") || (event.body.toLowerCase() == "hua kya")) {
       return api.sendMessage("तुमसे प्यार हुआ 💞", threadID);
     };
    if ((event.body.toLowerCase() == "kaha rehte ho") || (event.body.toLowerCase() == "kaha rehti ho")) {
       return api.sendMessage("क्यों शादी का रिश्ता लेकर आओगे क्या 😥😢", threadID);
     };


      if ((event.body.toLowerCase() == "kaha ghar hai") || (event.body.toLowerCase() == "ghar kaha hai") || (event.body.toLowerCase() == "bsdk bot") || (event.body.toLowerCase() == "chumtiye bot")) {
       return api.sendMessage("पृजवी पर है तुमको क्या काम है?😭😋", threadID);
     };

      if ((event.body.toLowerCase() == "kiss") || (event.body.toLowerCase() == "chumma")) {
       return api.sendMessage("🌊⚡••उफ़ मेरा बच्चा ये लो चुम्मा Ummmmmmmmmaaaahhhhhh💋💋•🏔️🍁", threadID);
     };
     if ((event.body.toLowerCase() == "pyar") || (event.body.toLowerCase() == "love")) {
       return api.sendMessage("सोजा मुन्ना ये सब तेरे काम की चीज नहीं है", threadID);
     };
             if ((event.body.toLowerCase() == "kya naam hai")) {return api.sendMessage("मालिक बिजी है अभी मेरे से बोलो जो आपको बोलना है😐" , threadID); // Kept the old trigger/response as requested, changing only the names in the previous response and the main tl array
     };

     if ((event.body.toLowerCase() == "naam kya hai tumhara") || (event.body.toLowerCase() == "kya naam hai tumhara")) {
       return api.sendMessage("नाम बता दिया तो PehChan बुरा मान jayegi😋👍", threadID);
     };
     if ((event.body.toLowerCase() == "🦅Dʌ̈̌ngɛ͜͡rɵ͜͡us kɪng➳ 🩷🪽") || (event.body.toLowerCase() == "💞")) {
       return api.sendMessage("मालिक को क्यों बुला रहे हो चुम्मा दोगे क्या 🙈🙈", threadID);
     };
     if ((event.body.toLowerCase() == "kon hai") || (event.body.toLowerCase() == "kon hai ye")) {
       return api.sendMessage("तुम्हारा aashiq है 😭🥺", threadID);
     };
    if ((event.body.toLowerCase() == "gand") || (event.body.toLowerCase() == "gand dega")) {
       return api.sendMessage("️गली मत दो वरना किक कर दूंगी😬", threadID, messageID);
     };
        if ((event.body.toLowerCase() == "Radhe Radhe") || (event.body.toLowerCase() == "Jai shree Ram")) {
       return api.sendMessage("️Jai shree Ram🙏🙄", threadID, messageID);
     };
     mess = "{name}"


   if (event.body.includes("Bot") == 1 ||
     (event.body.includes("bot") == 1 ||
     (event.body.includes("BOT") == 1 ||
     (event.body.includes("BABU") == 1 ||
     (event.body.includes("Babu") == 1 ||
     (event.body.includes("babu") == 1 ||
     (event.body.includes("boot") == 1 ||
     (event.body.includes("Oye") == 1 ||
     (event.body.includes("oye") == 1 ))))))))) {
      var msg = {
        body: `${rand}`
      }
  var msg = {
    body: `💞👉${name} 💞👈

❖•R━━━━━💞━━━━━S•❖,


${rand}                                        

𝗖𝗿𝗲𝗱𝗶𝘁𝘀:🦅Dʌ̈̌ngɛ͜͡rɵ͜͡us kɪng➳ 🩷🪽

❖•R━━━━━💞━━━━━S•❖`
  }
  return api.sendMessage(msg, threadID, messageID);
};

}

module.exports.run = function({ api, event, client, __GLOBAL }) { } 
