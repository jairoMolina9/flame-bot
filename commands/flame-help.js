const Discord = require('discord.js');

module.exports = {
  name: 'flame-help',
  description: 'Sends an embeded msg with available commands',
  execute(message, args) {
    const helpEmbeded = new Discord.MessageEmbed()
      .setColor('#ff2a00')
      .setTitle('🔥 Flame 🔥')
      .setThumbnail(
        'https://media.giphy.com/media/ifS5VwP9UWUsN9Elu6/giphy.gif'
      )
      .addFields(
        {
          name: 'Commands',
          value:
            '`!flame-help` - shows this message.\n`!flame @user` - sends saved or random flame with random gif.\n`!flame-save @user text` - saves a custom flame **(1)**.\n`!flame-random @user` - sends random flame.\n`!flame-giphy @user text` - sends saved or random flame with custom gif **(2)** \n`!flame-stats @user` - shows stats of an user',
        },
        {
          name: 'Other',
          value:
            '**(1)** - *replace text with custom flame*\n**(2)** - *replace text with custom gif filter, one keyword*',
        }
      )
      .setFooter(
        'For support please @SpykeGTP or @edwin',
        'https://i.imgur.com/mIdF4ZW.png'
      );

    message.channel.send(helpEmbeded);
  },
};
