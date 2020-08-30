const { getRandom } = require('../giphy');
const insulter = require('insults');

module.exports = {
  name: 'flame-random',
  description: 'Sends random flame to user',
  execute(message, args) {
    try {
      if (!message.mentions.users.size) throw new Error('no user mentioned!');
      const taggedUser = message.mentions.users.first();

      getRandom().then(function (giphy) {
        message.channel
          .send(`🔥🔥 ${taggedUser}, ${insulter.default()} 🔥🔥`, {
            files: [giphy.images.fixed_height.url],
          }
        )
        .then((sentMessage) => sentMessage.react("🔥"));
    });

    //update users stats
    stats.updateFlamer(message.author.id);
    stats.updateFlamed(mention_user_id);
    } catch (error) {
      message.reply(error.message);
    }
  },
};
