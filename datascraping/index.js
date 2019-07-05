const admin = require('firebase-admin');
const serviceAccount = require('../.serviceAcctKey');
//const serviceAccount = require('../.data-sandbox');
const data = require('./data2.js');
const collectionKey = 'beers';


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://beer-f6545.firebaseio.com",
  //databaseURL: "https://data-sandbox-d9071.firebaseio.com"
});

const firestore = admin.firestore();

const settings = { timestampsInSnapshots: true };

firestore.settings(settings);

if (data && typeof data === 'object') {
  Object.keys(data).forEach(dockey => {
    firestore
      .collection(collectionKey)
      .doc(dockey)
       .update(data[dockey])
      // .set(data[dockey])
      .then(res => {
        console.log('Document ' + dockey + ' successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  });
}

