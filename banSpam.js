import axios from "axios";
import fs from "fs";
import delay from "delay";

function readBannedWordsFromFile(filePath) {
    try {
        const bannedWords = fs.readFileSync(filePath, 'utf8').split('\n').map(word => word.trim());
        return bannedWords;
    } catch (error) {
        console.error('Error reading banned words from file:', error.message);
        return [];
    }
};

//!Get Session
const getSession = async (cookie) => {
    try {
        const apiUrl = `https://live.shopee.co.id/api/v1/session`;
        const getData = await axios.get(apiUrl, {
            headers: {
                'Cookie': cookie,
            }
        })
        return getData.data;
    } catch (error) {
        console.error
    }
}

//!Get Check Messages
const getCheckMessages = async (chatroomId, deviceId, cookie) => {
    try {
        const apiUrl = `https://chatroom-live.shopee.co.id/api/v1/fetch/chatroom/${chatroomId}/message?uuid=${deviceId}`;
        const getData = await axios.get(apiUrl, {
            headers: {
                'Cookie': cookie,
            }
        })
        return getData.data;
    } catch (error) {
        console.error
    }
}

//!Ban User
const banUser = async (sessionId, uid, cookie) => {
    try {
        const apiUrl = `https://live.shopee.co.id/webapi/v1/session/${sessionId}/comment/ban`;
        const postData = {
            is_ban: true,
            ban_uid: uid
        }
        const getData = await axios.post(apiUrl, postData, {
            headers: {
                'Cookie': cookie,
                'Content-Type': 'application/json',
            }
        })
        return getData.data;
    } catch (error) {
        console.error;
    }
}

//!Check Request Item
const checkRequestItem = async (chatroomId, cookie) => {
    try {
        const apiUrl = `https://chatroom-live.shopee.co.id/api/v1/fetch/chatroom/${chatroomId}/message`;
        const uuid = 'WRwcnVzam1q5yIWuTdhiU0CNPwh2xn2g';
        const timestamp = 1704726336;
        const version = 'v2';

        const url = `${apiUrl}?uuid=${uuid}&timestamp=${timestamp}&version=${version}`;
        const getData = await axios.get(url, {
            headers: {
                'Cookie': cookie,
            },
        })
        return getData.data;
    } catch (error) {
        console.error(`${error.message}`)
    }
}

//!Send Reques Item To PIN
const sendPostReqquestItem = async (sessionId, itemId, shopId, cookie) => {
    try {
        const apiUrl = `https://live.shopee.co.id/webapi/v1/session/${sessionId}/show`;
        const postData = {
            item: `{"item_id":${itemId},"shop_id":${shopId},"name":"Kerudung Segiempat Polos BELLA SQUARE Hijab Pollycotton Jilbab Bela Grosir Murah Part 1 \\"Full Warna\\"","image":"sg-11134201-22120-wybkdxq4bskv2b","currency":"IDR","discount":0,"price":"8050","price_before_discount":"8050","price_min":"8050","price_min_before_discount":"8050","price_max":"8050","price_max_before_discount":"8050","label":{"popularity_labels":[{"type":1,"type_name":"star_rate","star_count":5248}],"promotion_labels":[{"type":9,"type_name":"bundle_deal","text":"Pilih 20, diskon Rp3.000","promotion_id":219514552}]}, "id":36, "sp_flag":false, "sp_end_time":0}`
        };
        const getData = await axios.post(apiUrl, postData, {
            headers: {
                'Cookie': cookie,
                'Content-Type': 'application/json',
            },
        })
        return getData.data;
    } catch (error) {
        console.error(`${error.message}`)
    }
}

//!Get User Sign
const getUserSign = async (sessionId, deviceId, cookie) => {
    try {
        const apiUrl = `https://live.shopee.co.id/api/v1/session/${sessionId}/joinv2`;
        const postData = {
            "is_boost": false,
            "recommendation_extra": "{\"rrkpos\":\"1@fix_slot_op=4>4|rerank_model_50=4>0|qc_deboost=0>0|ecology_boost=0>0|streamer_boost=0>0|newstreamer_boost=0>0|tier_boost=0>0|kol_boost=0>0|aff_boost_exp=0>0\",\"from_source\":\"home_tab\",\"scene\":\"livestream_fullscreen\",\"ques\":\"STREAM-VIEW|STREAM-ITEMCLICK|STREAM-FOLLOW|STREAM-AFFILICATE-CR|STREAM-BACKUP-CCU\"}",
            "joinv2_watch_id": deviceId,
            "recommendation_reason": "[]",
            "need_follow_session": true,
            "uuid": deviceId
        };
        const getData = await axios.post(apiUrl, postData, {
            headers: {
                'Cookie': cookie,
                'User-Agent': 'ShopeeID/3.15.24 (com.beeasy.shopee.id; build:3.15.24; iOS 16.6.1) Alamofire/5.0.5 language=id app_type=1 Cronet/102.0.5005.61'
            }
        })

        return getData.data;
    } catch (error) {
        console.error(`${error.message}`)
    }
}

//!Get Reply To Message
const getReplyMessage = async (sessionId, deviceId, userSign, sanitize, cookie) => {
    try {
        const apiUrl = `https://live.shopee.co.id/webapi/v1/session/${sessionId}/message`;
        const postData = {
            uuid: deviceId,
            usersig: userSign,
            content: JSON.stringify({ type: 101, content: sanitize }),
            pin: false,
        }
        const getData = await axios.post(apiUrl, postData, {
            headers: {
                'Cookie': cookie,
                'Content-Type': 'application/json',
            }
        })

        return getData.data;
    } catch (error) {
        console.error(`${error.message}`)
    }
}

//!Function Same Word
function containsBannedWords(content, textBanned) {
    const lowerContent = content.toLowerCase();
    return textBanned.some(word => lowerContent.includes(word.toLowerCase()));
}

//!Function SanitizeContent
function sanitizeContent(content) {
    if (content == null || typeof content.toString !== 'function') {
        return content;
    }

    const contentString = content.toString();
    return contentString.replace(/[\u007F-\uFFFF]/g, char => {
        return "\\u" + ("0000" + char.charCodeAt(0).toString(16)).substr(-4);
    });
}

//!Function check myUid
function isMyUid(uid, myUid) {
    return String(uid) === String(myUid);
}

//!Function timeStamp
function hasAlreadyReplied(repliedTimestamps, timestamp) {
    return repliedTimestamps.includes(timestamp);
}


(async () => {
    const textBanned = `banWord.txt`;
    const cookie = fs.readFileSync(`cookies.txt`, `utf-8`);
    const resultReadTextBan = readBannedWordsFromFile(textBanned);
    const getReadReply = fs.readFileSync(`textReply.json`, `utf-8`);
    const keywordsToResponses = JSON.parse(getReadReply)

    const resultSession = await getSession(cookie);
    // console.log(resultSession)
    if (resultSession.err_msg === `Berhasil`) {
        console.log(`[!] Success Get Session ID, Room_Id, dll`);
        const sessionId = resultSession.data.session.session_id;
        const chatroomId = resultSession.data.session.chatroom_id;
        const deviceId = resultSession.data.session.device_id;
        const myUid = resultSession.data.session.uid;

        console.log('[!] Session ID:', sessionId);
        console.log('[!] Chatroom ID:', chatroomId);
        console.log('[!] Device ID:', deviceId);
        console.log('[!] My UID:', myUid);
        console.log()

        let isNoMessageLogged = false;

        while (true) {
            const resultUserSign = await getUserSign(sessionId, deviceId, cookie)
            // console.log(resultUserSign)\
            const userSign = resultUserSign.data.usersig;

            const resultCheckMessage = await getCheckMessages(chatroomId, deviceId, cookie);
            // console.log(resultCheckMessage)
            if (resultCheckMessage.data.message.length > 0) {
                isNoMessageLogged = false;
                for (const pesan of resultCheckMessage.data.message) {
                    if (pesan.msgs.length > 0) {
                        console.log();
                        console.log(`[!] Get Message`);

                        for (const check of pesan.msgs) {
                            const uidUser = check.uid;
                            const nameUser = check.nickname;
                            const displayNameUser = check.display_name;
                            const getContent = check.content;
                            const timestamp = pesan.timestamp;;
                            const contentParse = JSON.parse(getContent)
                            const messageUser = contentParse.content;
                            const type = contentParse.type;
                            const statusPengkondisian = contentParse.is_aggr;

                            // console.log(pesan)
                            // console.log(check)
                            // console.log(contentParse)
                            console.log(`[!] UID User : ${uidUser}`)
                            console.log(`[!] Nama User : ${nameUser}`)
                            console.log(`[!] Display Nama User : ${displayNameUser}`)
                            // console.log(type)

                            if (statusPengkondisian === false) {
                                console.log(`[!] Request Dari User`);
                                console.log(`[!] Request User : ${messageUser}`);
                                console.log();

                                const shopId = contentParse.shop_id;
                                const itemId = contentParse.item_id;
                                console.log(`[!] Shop ID User : ${shopId}`)
                                console.log(`[!] Item ID User : ${itemId}`)

                                const resultPinRequestItem = await sendPostReqquestItem(sessionId, itemId, shopId, cookie)
                                // console.log(resultPinRequestItem)
                                if (resultPinRequestItem.err_msg === `Berhasil`) {
                                    console.log(`[!] Success Pin Product ${messageUser}`)
                                    console.log()
                                    break;
                                }
                            } else {
                                console.log(`[!] Pesan User Disini`)
                                console.log(`[!] Pesan User : ${messageUser}`)
                                console.log()
                                // const test = containsBannedWords(messageUser, resultReadTextBan)
                                // console.log(test)

                                if (containsBannedWords(messageUser, resultReadTextBan)) {
                                    console.log(`[!] Message dengan kata2 Banned FOUND`)
                                    try {
                                        const resultBannedUser = await banUser(sessionId, uidUser, cookie);
                                        console.log(resultBannedUser);
                                        console.log()
                                        break;
                                    } catch (error) {
                                        console.error(`Gagal melakukan ban user: ${error.message}`);
                                    }
                                } else {
                                    const timeStamp = pesan.timestamp;
                                    const nameUser = check.nickname;
                                    const uid = check.uid;

                                    let repliedTimestamps = [];

                                    if (!isMyUid(uid, myUid)) {
                                        if (!hasAlreadyReplied(repliedTimestamps, timeStamp)) {
                                            const contentLowerCase = messageUser.toLowerCase();

                                            for (const keyword in keywordsToResponses) {
                                                if (contentLowerCase.includes(keyword.toLowerCase())) {
                                                    console.log(`[!] Found Keyword : ${keyword}`)
                                                    console.log(`[!] Uid User : ${uidUser} Pesan User To Reply : ${messageUser}`)

                                                    const replyContent = `${keywordsToResponses[keyword]} ${nameUser}`;
                                                    console.log(replyContent);

                                                    if (replyContent) {
                                                        const sanitize = sanitizeContent(replyContent)
                                                        console.log(`[!] ${sanitize}`)
                                                        repliedTimestamps.push(timestamp)

                                                        const resultReplyKomen = await getReplyMessage(sessionId, deviceId, userSign, sanitize, cookie)

                                                        console.log(resultReplyKomen)
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    } else {
                        console.log(`[!] Gagal get messages!`);
                        console.log();
                    }

                }
            } else {
                if (!isNoMessageLogged) {
                    console.log(`[!] Belum ada message Masuk`);
                    isNoMessageLogged = true;
                }
            }

            await delay(3 * 1000);
        }
    } else {
        console.log(`[!] Gagal Get SessionId dll`);
    }
})();

// (async () => {
//     const textBanned = `banWord.txt`;
//     const cookie = fs.readFileSync(`cookies.txt`, `utf-8`);
//     const resultReadTextBan = readBannedWordsFromFile(textBanned)
//     // console.log(resultReadTextBan)
//     // console.log(cookie)

//     const resultSession = await getSession(cookie)
//     // console.log(resultSession)
//     if (resultSession.err_msg === `Berhasil`) {
//         console.log(`[!] Success Get Session ID, Room_Id, dll`)
//         const sessionId = resultSession.data.session.session_id;
//         const chatroomId = resultSession.data.session.chatroom_id;
//         const deviceId = resultSession.data.session.device_id;
//         const myUid = resultSession.data.session.uid

//         console.log('Session ID:', sessionId);
//         console.log('Chatroom ID:', chatroomId);
//         console.log('Device ID:', deviceId);
//         console.log('My UID:', myUid);

//         // const content = `rekaman`

//         // const test = containsBannedWords(content, resultReadTextBan)
//         // console.log(test)


//         let resultCheckMessage
//         while (true) {
//             resultCheckMessage = await getCheckMessages(chatroomId, deviceId, cookie)
//             // console.log(resultCheckMessage)

//             if (resultCheckMessage.data.message.length > 0) {
//                 resultCheckMessage.data.message.forEach((pesan, index) => {
//                     // console.log(pesan)
//                     if (pesan.msgs.length > 0) {
//                         console.log()
//                         console.log(`[!] Get Message`)
//                         pesan.msgs.forEach((check) => {
//                             const uidUser = check.uid;
//                             const nameUser = check.nickname;
//                             const displayNameUser = check.display_name;
//                             const getContent = check.content;
//                             const contentParse = JSON.parse(getContent)
//                             const messageUser = contentParse.content;
//                             const type = contentParse.type;
//                             const statusPengkondisian = contentParse.is_aggr;

//                             // console.log(check)
//                             // console.log(contentParse)
//                             console.log(`[!] UID User : ${uidUser}`)
//                             console.log(`[!] Nama User : ${nameUser}`)
//                             console.log(`[!] Display Nama User : ${displayNameUser}`)
//                             // console.log(type)


//                             if (statusPengkondisian === false) {
//                                 console.log(`[!] Request Dari User`);
//                                 console.log(`[!] Request User : ${messageUser}`);
//                                 console.log();
//                             } else {
//                                 console.log(`[!] Pesan User Disini`)
//                                 console.log(`[!] Pesan User : ${messageUser}`)

//                                 const test = containsBannedWords(messageUser, resultReadTextBan)
//                                 console.log(test)
//                                 if (containsBannedWords(messageUser, resultReadTextBan)) {
//                                     console.log(`[!] Message dengan kata2 Banned FOUND`)
//                                     // console.log(banUser(sessionId, uidUser, cookie))
//                                     const resultBannedUser = await banUser(sessionId, uidUser, cookie)
//                                     console.log(resultBannedUser)
//                                 }
//                                 console.log();
//                             }
//                         })
//                     } else {
//                         console.log(`[!] Gagal get messages!`)
//                         console.log()
//                     }
//                 });
//             } else {
//                 console.log(`[!] Belum ada message Masuk`)
//             }
//             await delay(3 * 1000)
//         }

//         // console.log(resultCheckMessage)

//     } else {
//         console.log(`[!] Gagal Get SessionId dll`)
//     }
// })();