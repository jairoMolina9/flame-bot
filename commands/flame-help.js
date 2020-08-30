const Discord = require("discord.js");

module.exports = {
  name: "flame-help",
  description: "Sends an embeded msg with available commands",
  execute(message, args) {
    const helpEmbeded = new Discord.MessageEmbed()
      .setColor('#ff2a00')
      .setTitle('🔥 Flame 🔥')
      .setThumbnail('https://media.giphy.com/media/ifS5VwP9UWUsN9Elu6/giphy.gif')
      .addFields(
        { name: 'Commands',
        value: '`!flame help` - shows this message.\n`!flame @user` - sends saved or unsaved flame with random gif.\n`!flame -s @user text` - saves a custom flame **(1)**.\n`!flame -r @user` - sends unsaved random flame.\n~~`!flame -g @user text` - sends saved or unsaved flame with custom gif **(2)**~~.\n~~`!flame -r -g @user text` - sends unsaved random flame with custom gif **(2)**~~.'
        },
        { name: 'Other', value: '**(1)** - *replace text with custom flame*\n**(2)** - *replace text with custom gif filter, one keyword*' },
      )
      .setFooter('For support please @SpykeGTP or @edwin', 'https://i.imgur.com/mIdF4ZW.png');

    message.channel.send(helpEmbeded);
  },
};
