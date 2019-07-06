import {StyleSheet} from "react-native";

export default StyleSheet.create({
    buttonText:{
        color:"black",
        fontSize:14
    },
    container: {
        flex: 1,
        backgroundColor: '#c36f09',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    containerApp: {
        flex: 1,
    },
    containerImage: {
        width: "30%",
        height: "40%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    headText: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 15
      },
    item: {
        borderBottomWidth: 1,
        marginBottom: 10,
        marginTop: 70
    },
    itemImage:{
        width:"100%",
        height: 200,
        resizeMode: 'cover'
    },
    itemImageSmall:{
        width:"100%",
        height: 100,
        resizeMode: 'cover'
    },
    itemText:{
        fontSize: 26,
        padding:25
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
    listCard:{
        backgroundColor:"transparent",
        alignItems:"center",
        justifyContent:"center",
        height:320
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarOptions:{
        paddingTop: 10,
        backgroundColor: "#eeba0b",
        alignItems: 'center',
    },
    textBold:{
        fontWeight: "bold",
        fontStyle: 'italic',
        textAlign: 'center',
        fontSize:22
      },
});

// beerlistsearch container
// container: {
//     flex: 1,
//     marginTop: 20,
// },

//choose category container
// container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 20
// },

//home component itemText

// itemText:{
//     fontSize: 16,
//     padding:25,
//     marginTop: 25,
//     marginBottom: 25,
//     textAlign: 'center',
// },

