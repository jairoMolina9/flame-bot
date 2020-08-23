const Discord = require("discord.js");
const {
  getStats
} = require("../stats");

module.exports = {
  name: "flame-stats",
  description: "Sends stats of an user",
  execute(message, args) {

    if (!args.length) {
      //print stats of everyone in DB
      message.guild.members.fetch().then((fetchedMembers) => {

        const membersList = fetchedMembers.filter((member) => member.user.id !== message.author.id && !member.user.bot);

        membersList.map(async (member) => {
          const data = await getStats(member.user.id);
          let avatarURL = "";
          if(!member.user.avatar)
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
            },
          );

          message.channel.send(statsEmbeded);
        });

        //*everything in one message*//
        // const statsEmbeded = new Discord.MessageEmbed()
        // .setColor('#ff2a00')
        // .setTitle('🔥 Stats 🔥')
        // .setThumbnail('https://media.giphy.com/media/ifS5VwP9UWUsN9Elu6/giphy.gif');
        //
        //   membersList.map(async (member) => {
        //   const data = await getStats(member.user.id);
        //   let avatarURL = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.` + ("png" || "jpeg" || "webp" || "gif");
        //
        //    statsEmbeded.addFields({
        //       name:`${member.user.username}`,
        //       value:`Been flamed: ${data['flamed']} | Has flamed: ${data['flamer']}`
        //     });
        //     console.log("hello");
        // }); //end of loop
        // console.log("test");
      });
    } else if (message.mentions.users.first()) {
      const data = getStats(message.mentions.users.first().id);
      let avatarURL = "";
      if(!member.user.avatar)
        avatarURL = "https://media.giphy.com/media/3ohzdYDKUSkwOeXtrW/giphy.gif";
      else
        avatarURL = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.` + ("png" || "jpeg" || "webp" || "gif");

      data.then(function(result) {
        const statsEmbeded = new Discord.MessageEmbed()
          .setColor('#ff2a00')
          .setTitle(`🔥 ${message.mentions.users.first().username} Stats 🔥`)
          .setThumbnail(avatarURL)
          .addFields({
            name: '\u200b',
            value: `Been flamed: ${result['flamed'] || 0} | Has flamed: ${result['flamer'] || 0}`
          },
        );

        message.channel.send(statsEmbeded);
      });

    } else {
      message.reply("mention an user!");
      return;
    }
  },
};
