const Discord = require("discord.js");
const { getStats } = require("../stats");

module.exports = {
  name: "flame-stats",
  description: "Sends stats of an user",
  execute(message, args) {
    if (args[0] === "@everyone" || args[0] === "here" || !args.length) { //print stats of everyone in DB
      message.guild.members.fetch().then((fetchedMembers) => {

        const membersList = fetchedMembers.filter((member) => member.user.id !== message.author.id && !member.user.bot);

        membersList.map(async (member) => {
          const data = await getStats(member.user.id);
          let avatarURL = "";
          if (!member.user.avatar)
            avatarURL = "https://media.giphy.com/media/3ohzdYDKUSkwOeXtrW/giphy.gif";
          else
            avatarURL = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.` + ("png" || "jpeg" || "webp" || "gif");

          const statsEmbeded = new Discord.MessageEmbed()
            .setColor('#ff2a00')
            .setTitle(`🔥 ${member.user.username} Stats 🔥`)
            .setThumbnail(avatarURL)
            .addFields({
              name: '\u200b',
              value: `Been flamed: ${data['flamed'] || 0} | Has flamed: ${data['flamer'] || 0}`
            }, );

          message.channel.send(statsEmbeded);
        });
      });
    } else if (args[0] === "me" || message.mentions.users.first()) { //prints stats of an user
      let member = "";

      if(args[0] === "me")
        member = message.author;
      else
        member = message.mentions.users.first();

      const data = getStats(member.id);
      
      let avatarURL = "";
      if (!member.avatar)
        avatarURL = "https://media.giphy.com/media/3ohzdYDKUSkwOeXtrW/giphy.gif";
      else
        avatarURL = `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.` + ("png" || "jpeg" || "webp" || "gif");

      data.then(function(result) {
        const statsEmbeded = new Discord.MessageEmbed()
          .setColor('#ff2a00')
          .setTitle(`🔥 ${member.username} Stats 🔥`)
          .setThumbnail(avatarURL)
          .addFields({
            name: '\u200b',
            value: `Been flamed: ${result['flamed'] || 0} | Has flamed: ${result['flamer'] || 0}`
          }, );

        message.channel.send(statsEmbeded);
      });
    } else {
      message.reply("mention an user!");
      return;
    }
  },
};
