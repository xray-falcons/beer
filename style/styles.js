import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#c36f09',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        //CHECK DOCS!!!!! cause this could not work on different devices
        height: 1000,
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});
