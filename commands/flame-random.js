const {
  getRandom
} = require("../giphy");
const insulter = require("insults");

module.exports = {
  name: "flame-random",
  description: "Sends random flame to user",
  execute(message, args) {

    //outside bc it is used in code below line 23
    let user_id = "";
    let mention = "";
    try {
      user_id = message.mentions.users.first().id;
      mention = "<@".concat(user_id).concat(">");
    } catch (error) {
      message.reply("mention an user!");
      return;
    }


    getRandom().then(function(giphy) {
      message.channel
        .send(
          "🔥🔥 " + mention + ", " + insulter.default() + " 🔥🔥", {
            files: [giphy.images.fixed_height.url],
          }
        )
        .then((sentMessage) => sentMessage.react("🔥"));
    });

  },
};
