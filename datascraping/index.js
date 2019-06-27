const admin = require('firebase-admin');
const serviceAccount = require('../.serviceAcctKey');
const data = require('./data.js');
const styles = require('./styles.js');
// const collectionKey = 'beers';
const collectionKey = 'styles';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://beer-f6545.firebaseio.com",
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };

firestore.settings(settings);

// if (data && typeof data === 'object') {
//   Object.keys(data).forEach(dockey => {
//     firestore
//       .collection(collectionKey)
//       .doc(dockey)
//       .set(data[dockey])
//       .then(res => {
//         console.log('Document ' + dockey + ' successfully written!');
//       })
//       .catch(error => {
//         console.error('Error writing document: ', error);
//       });
//   });
// }

if (styles && typeof styles === 'object') {
  Object.keys(styles).forEach(dockey => {
    firestore
      .collection(collectionKey)
      .doc(dockey)
      .set(styles[dockey])
      .then(res => {
        console.log('Document ' + dockey + ' successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  });
}
