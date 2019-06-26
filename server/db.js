import * as firebase from 'firebase';
import {firebaseConfig} from '../configs/ApiKeys';

//initialising firebase

firebase.initializeApp(firebaseConfig);


export const db = firebase.firestore();