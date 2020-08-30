const { admin } = require('../firestore');

module.exports = {
  name: "flame-save",
  description: "Saves flame to firestore",
  execute(message, args) {

    let user_id = ""; //outside bc docRef is const

    try {
      user_id = message.mentions.users.first().id;
      if(args.length == 1) throw ("noflame");

    } catch (error) {
      if(error === "noflame")
        message.reply("write a flame!");
      else
        message.reply("mention an user!");

      return;
    }

    let flameArray = [args[1]];

    for(var i = 2; i < args.length; i++) {
       flameArray[i-1] = args[i];
    }

    let flame = flameArray.join(" ");

    const docRef = admin.firestore().collection("users").doc(user_id)

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

  },
};
