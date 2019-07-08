import { Alert } from "react-native";
import * as Facebook from 'expo-facebook';

const logInWithFacebook = async() => {
    try {
        const {
            type,
            token,
        } = await Facebook.logInWithReadPermissionsAsync('463520067716247', {
            permissions: ['public_profile', 'email'],
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            this.props.navigation.navigate('Dashboard')

        } else {
            // type === 'cancel'
            Alert.alert('Oops!', 'Something went wrong...');

        }
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }
};

export default logInWithFacebook;
