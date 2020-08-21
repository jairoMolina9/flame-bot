require("dotenv").config();
const insulter = require("insults");
const Discord = require("discord.js");
var admin = require("firebase-admin");
const { getRandom } = require("./giphy");
const { getHelp } = require("./help");

var serviceAccount = require("./serviceAccountKey.json");

const bot = new Discord.Client();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
}); //connect to firebase

const db = admin.firestore(); //access to database

bot.on("ready", () => {
  console.log("bot is online!");
});

bot.on("ready", () => {
  console.log("bot is online!");
});

bot.on("message", (message) => {
  if (message.author.bot) return;

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
        const docRef = db.collection("users").doc(user_id);

        docRef
          .get()
          .catch(function (error) {
            console.log("Error getting document:", error);
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
        message.channel
          .send("🔥🔥 " + mention + ", " + insulter.default() + " 🔥🔥")
          .then(function (message) {
            getRandom().then(function (giphy) {
              message.channel.send({
                files: [giphy.images.original.url],
              });
            });
          });
      } else {
        const docRef = db.collection("users").doc(user_id);

        docRef
          .get()
          .catch(function (error) {
            console.log("Error getting document:", error);
          })
          .then(function (doc) {
            if (doc.exists) {
              let data = doc.data();

              let index = Math.floor(Math.random() * data["flames"].length);

              message.channel
                .send(
                  "🔥🔥 " + mention + ", " + data["flames"][index] + " 🔥🔥"
                )
                .then(function (message) {
                  getRandom().then(function (giphy) {
                    console.log(giphy.images.original);
                    message.channel.send({
                      files: [giphy.images.original.url],
                    });
                  });
                })
                .catch(function (error) {
                  message.channel.send("couldn't load the gif :()");
                });
            } else {
              //if user has no custom flames
              message.channel
                .send("🔥🔥 " + mention + ", " + insulter.default() + " 🔥🔥")
                .then(function (message) {
                  getRandom().then(function (giphy) {
                    message.channel.send({
                      files: [giphy.images.original.url],
                    });
                  });
                });
            }
          });
      }
    }
  } else {
    //if it is not help and its not an user
    message.channel.send("Write !flame help, to learn more about the commands");
  }
});

bot.login(process.env.TOKEN);
