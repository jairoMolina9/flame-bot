const { getRandom } = require("../giphy");
const insulter = require("insults");

module.exports = {
  name: "flame-here",
  description: "Sends a flame for every online user",
  execute(message, args) {
    message.guild.members.fetch().then((fetchedMembers) => {
      const membersOnline = fetchedMembers.filter(
        (member) =>
          member.presence.status === "online" &&
          member.user.id !== message.author.id &&
          !member.user.bot
      );

      const flameList = membersOnline.map((member) => {
        return `🔥🔥 <@${member.user.id}>, ${insulter.default()} 🔥🔥`;
      });

      flameList.forEach((flameItem, i) => {
        getRandom().then((giphy) => {
          message.channel
            .send(flameItem, {
              files: [giphy.images.fixed_height.url],
            })
            .then((sentMessage) => sentMessage.react("🔥"));
        });
      });
    });
  },
};
