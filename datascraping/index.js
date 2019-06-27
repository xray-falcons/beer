const admin = require('firebase-admin');
const serviceAccount = require('../data-sandbox.json');
const data = require('./data.js');
const collectionKey = 'beers'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://data-sandbox-d9071.firebaseio.com"
});

const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};

firestore.settings(settings);

if (data && (typeof data === "object")) {

Object.keys(data).forEach(dockey => {

 firestore.collection(collectionKey).doc(dockey).set(data[dockey]).then((res) => {

    console.log("Document " + dockey + " successfully written!");

}).catch((error) => {

   console.error("Error writing document: ", error);

});

});

}
