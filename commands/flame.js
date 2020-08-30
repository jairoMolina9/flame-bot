const { admin } = require('../firestore');
const { getRandom } = require("../giphy");
const insulter = require("insults");

module.exports = {
  name: "flame",
  description: "Sends custom flame to user",
  execute(message, args) {

    //outside bc it is used in code below line 23
    let user_id = "";
    let mention = "";
    try {
      user_id = message.mentions.users.first().id;
      mention  = "<@".concat(user_id).concat(">");
    } catch (error) {
        message.reply("mention an user!");
      return;
    }

    const docRef = admin.firestore().collection("users").doc(user_id)

    docRef
      .get()
      .catch(function (error) {
        console.error("Error getting document:", error);
      })
      .then(function (doc) {
        if (doc.exists) {
          let data = doc.data(); //array of custom flames
          let index = Math.floor(Math.random() * data["flames"].length);

          getRandom().then(function (giphy) {
            message.channel
              .send(
                "🔥🔥 " + mention + ", " + data["flames"][index] + " 🔥🔥",
                {
                  files: [giphy.images.fixed_height.url],
                }
              )
              .then((sentMessage) => sentMessage.react("🔥"));
          });
        } else {
          //if user has no custom flames
          getRandom().then(function (giphy) {
            message.channel
              .send(
                "🔥🔥 " + mention + ", " + insulter.default() + " 🔥🔥",
                {
                  files: [giphy.images.fixed_height.url],
                }
              )
              .then((sentMessage) => sentMessage.react("🔥"));
          });
        }
      });

  },
};
