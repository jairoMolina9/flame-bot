const { search } = require('../giphy');
const insulter = require('insults');

module.exports = {
  name: 'flame-giphy',
  aliases: ['flame-g'],
  description: 'Accepts a giphy search query',
  args: true,
  usage: '<user> <query>',
  execute(message, args) {
    try {
      const taggedUser = message.mentions.users.first();
      const phrase = args.slice(1).join(' ');

      search(phrase).then(function (giphy) {
        const { url } = giphy.images.fixed_height;
        message.channel
          .send(`🔥🔥 ${taggedUser}, ${insulter.default()} 🔥🔥`, {
            files: [url],
          })
          .then((sentMessage) => sentMessage.react('🔥'));
      });
    } catch (error) {
      console.error(error);
    }
  },
};
