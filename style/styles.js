import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 0.6,
        backgroundColor: '#c36f09',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    containerImage: {
        width: "30%",
        height: "40%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        //CHECK DOCS!!!!! cause this could not work on different devices
        // height: 1000
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerApp: {
        flex: 1,
    },
});
