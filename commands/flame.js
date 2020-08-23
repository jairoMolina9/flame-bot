const { admin } = require('../firestore');
const { getRandom } = require("../giphy");
const stats = require("../stats");
const insulter = require("insults");

module.exports = {
  name: "flame",
  description: "Sends custom flame to user",
  execute(message, args) {

    if(!message.mentions.users.first()) {
      message.reply("mention an user!");
      return;
    }

    let mention_user_id = message.mentions.users.first().id;
    let mention = `<@${mention_user_id}>`;


    const docRef = admin.firestore().collection("users").doc(mention_user_id)

    docRef
      .get()
      .catch(function (error) {
        console.error("Error getting document:", error);
      })
      .then(function (doc) {
        if (doc.exists) {
          let data = doc.data(); //array of document data
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

        //update users stats
        stats.updateFlamer(message.author.id);
        stats.updateFlamed(mention_user_id);
      });

  },
};
