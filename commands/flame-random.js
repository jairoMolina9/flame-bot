const { getRandom } = require("../giphy");
const stats = require("../stats");
const insulter = require("insults");

module.exports = {
  name: "flame-random",
  description: "Sends random flame to user",
  execute(message, args) {

    if(!message.mentions.users.first()) {
      message.reply("mention an user!");
      return;
    }

    let mention_user_id = message.mentions.users.first().id;
    let mention = `<@${mention_user_id}>`;


    getRandom().then(function(giphy) {
      message.channel
        .send(
          "🔥🔥 " + mention + ", " + insulter.default() + " 🔥🔥", {
            files: [giphy.images.fixed_height.url],
          }
        )
        .then((sentMessage) => sentMessage.react("🔥"));
    });

    //update users stats
    stats.updateFlamer(message.author.id);
    stats.updateFlamed(mention_user_id);

  },
};
