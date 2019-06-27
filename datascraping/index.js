const admin = require('firebase-admin');

const serviceAccount = require('../.serviceAcctKey.json');

const data = require('./data');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://beer-f6545.firebaseio.com',
});

const firestore = admin.firestore();

const settings = {timestampsInSnapshots: true};

firestore.settings(settings);

if (data && (typeof data === "object")) {

Object.keys(data).forEach(docKey => {

 firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {

    console.log("Document " + docKey + " successfully written!");

}).catch((error) => {

   console.error("Error writing document: ", error);

});

});

}
