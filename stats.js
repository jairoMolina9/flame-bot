const { admin } = require('./firestore');

function updateFlamer(user_id) {
  const docRef = admin.firestore().collection("users-stats").doc(user_id);

  docRef
    .get()
    .catch(function (error) {
      console.error("Error getting document:", error);
    })
    .then(function (doc) {
      if (doc.exists) {
        //user exists
        let flamer = doc.get("flamer") + 1;
        docRef.update({
          flamer: flamer,
        });
      } else {
        //user does not exist
        docRef.set({
          flamer: 1,
          flamed: 0,
        });
      }
    });
}

function updateFlamed(user_id) {
  const docRef = admin.firestore().collection("users-stats").doc(user_id);

  docRef
    .get()
    .catch(function (error) {
      console.error("Error getting document:", error);
    })
    .then(function (doc) {
      if (doc.exists) {
        //user exists
        let flamed = doc.get("flamed") + 1;
        docRef.update({
          flamed: flamed,
        });
      } else {
        //user does not exist
        docRef.set({
          flamer: 0,
          flamed: 1,
        });
      }
    });
}

async function getStats(user_id) {
  const docRef = admin.firestore().collection("users-stats").doc(user_id);
  let arr = [];
  await docRef
    .get()
    .catch(function (error) {
      console.error("Error getting document:", error);
    })
    .then(function (doc) {
      if (doc.exists) {
        //user exists
        arr = {"flamed": doc.get("flamed"), "flamer": doc.get("flamer")};
      } else {
        //user does not exist
        arr = {"flamed": 0, "flamer": 0};
      }
    });
    return arr;
}

module.exports.updateFlamer = updateFlamer;
module.exports.updateFlamed = updateFlamed;
module.exports.getStats = getStats;
