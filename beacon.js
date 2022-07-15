const functions = require("firebase-functions");
const axios = require("axios");
const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${functions.config().lineoa.channel_access_token}`
};

exports.LineBot = functions.https.onRequest(async(req, res) => {
  const event = req.body.events[0];
  if (event.type === "beacon") {
    await reply(
      event.replyToken,
      [{ type: "text", text: "Hello DEVIO Beacon!" }]
    );
  }
  return res.send(req.method);
});

const reply = (token, payload) => {
  return axios({
    method: "post",
    url: `${LINE_MESSAGING_API}/message/reply`,
    headers: LINE_HEADER,
    data: { replyToken: token, messages: payload }
  });
};