require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");

const insulter = require("insults");
var admin = require("firebase-admin");

const { getRandom } = require("./giphy");
const { getHelp } = require("./help");
var serviceAccount = require("./serviceAccountKey");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
});

const firestore = admin.firestore();

client.on("ready", () => {
  console.log("client is online!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
    return;

  const args = message.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();

  if (command == "flame-here") {
    try {
      client.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("there was an error trying to execute that command!");
    }
  }

  let str = message.content.replace(/\s+/g, " ");

  if (str.includes("!flame")) {
    if (str === "!flame help") {
      message.channel.send(getHelp());
    } else if (str.includes("<@") && str.includes("-s")) {
      //save flame

      let user_id = message.mentions.users.first().id;

      let flame = str.substring(str.lastIndexOf(">") + 1, str.length);

      if (flame === "") {
        message.channel.send("🔥 Write a flame, are you stoopid? 🔥");
      } else {
        const docRef = firestore.collection("users").doc(user_id);

        docRef
          .get()
          .catch(function (error) {
            console.error("Error getting document:", error);
          })
          .then(function (doc) {
            if (doc.exists) {
              //user exists
              docRef.update({
                flames: admin.firestore.FieldValue.arrayUnion(flame),
              });
            } else {
              //user does not exist
              let newArray = [flame];

              docRef.set({
                flames: newArray,
              });
            }
            message.channel.send("🔥 Saved 🔥");
          });
      }
    } else if (str.includes("<@")) {
      //flame an user
      let user_id = message.mentions.users.first().id;
      let mention = "<@".concat(user_id).concat(">");

      if (str.includes("-r")) {
        getRandom().then(function (giphy) {
          message.channel
            .send("🔥🔥 " + mention + ", " + insulter.default() + " 🔥🔥", {
              files: [giphy.images.fixed_height.url],
            })
            .then((sentMessage) => sentMessage.react("🔥"));
        });
      } else {
        const docRef = firestore.collection("users").doc(user_id);

        docRef
          .get()
          .catch(function (error) {
            console.error("Error getting document:", error);
          })
          .then(function (doc) {
            if (doc.exists) {
              let data = doc.data();
              let index = Math.floor(Math.random() * data["flames"].length);

              getRandom().then(function (giphy) {
                message.channel
                  .send(
                    "🔥🔥 " + mention + ", " + data["flames"][index] + " 🔥🔥",
                    {
                      files: [giphy.images.fixed_height.url],
                    }
                  )
                  .then((sentMessage) => sentMessage.react("🔥"));
              });
            } else {
              //if user has no custom flames
              getRandom().then(function (giphy) {
                message.channel
                  .send(
                    "🔥🔥 " + mention + ", " + insulter.default() + " 🔥🔥",
                    {
                      files: [giphy.images.fixed_height.url],
                    }
                  )
                  .then((sentMessage) => sentMessage.react("🔥"));
              });
            }
          });
      }
    } else {
      //if it is not help and its not an user
      message.channel.send(
        "Write !flame help, to learn more about the commands"
      );
    }
  }
});

client.login(process.env.TOKEN);
