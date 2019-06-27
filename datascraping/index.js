const admin = require('firebase-admin');

const serviceAccount = require('../.serviceAcctKey.json');

const data = require('./data');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://beer-f6545.firebaseio.com',
});
