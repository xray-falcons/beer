import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from 'firebase';
import { db } from '../server/db';
import { Platform } from 'react-native'

// Use this to fix bug with Expo and firebase
//expo-web is inspired or based on react-native-web
// which introduces a 'web' as platform value
// if (Platform.OS !== 'web') {
//     window = undefined;
// }

//Initial State
export const initialState = {
    user: {
        fullName: '',
        email: '',
        password: '',
    }
};

//Actions
const SIGNED_UP = 'SIGNED_UP';

//Action creator

export const signUp = (email, password, fullName) => {
    return {
        type: SIGNED_UP,
        email, password, fullName
    }
};

//thunks

export const signUpThunk = (userData, password) => {
    return async (dispatch) => {
        try {

            let { user } = await firebase.auth().createUserWithEmailAndPassword(userData.email, password);
            await db.collection('users').doc(user.uid).set(userData);
            dispatch(signUp(userData));
        } catch (error) {
            console.error(error);
        }
    };
};

//reducer

const reducer = (state = initialState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case SIGNED_UP:
            newState.email = action.email;
            newState.password = action.password;
            return newState;
        default:
            return state;
    }
};

//creates store and attaches middleware (logger and devtools)

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
);

export default store;