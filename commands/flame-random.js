const { getRandom } = require('../giphy');
const insulter = require('insults');

module.exports = {
  name: 'flame-random',
  description: 'Sends random flame to user',
  execute(message, args) {
    try {
      if (!message.mentions.users.size) throw new Error('no user mentioned!');
      const { id: userId } = message.mentions.users.first();
      const mention = `<@${userId}>`;

      getRandom().then(function (giphy) {
        message.channel
          .send(`🔥🔥 ${mention}, ${insulter.default()} 🔥🔥`, {
            files: [giphy.images.fixed_height.url],
          })
          .then((sentMessage) => sentMessage.react('🔥'));
      });
    } catch (error) {
      message.reply(error.message);
    }
  },
};
