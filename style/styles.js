import {StyleSheet} from "react-native";

export default StyleSheet.create({
    attentionButton:{
        backgroundColor:"#841574",
        borderRadius:5
    },
    buttonRow:{
        flexDirection:"row",
        justifyContent: "center"
    },
    buttonText:{
        color:"black",
        fontSize:14
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 20
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
        fontSize: 38,
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 15
      },
    iconButton: {
        fontSize:36,
        color:"#530",
        padding:15,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 100,
        marginLeft: 'auto',
        marginRight: 'auto'
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
    notebox:{
        height:100,
        backgroundColor:"#f0f0f0",
        borderRadius:5
    },
    searchBar:{
        marginTop: 35,
        backgroundColor:"transparent"
    },
    searchLogo:{
        width:200,
        height:200,
        marginBottom: 20,
        borderRadius: 100
    },
    tabBarOptions:{
        paddingTop: 10,
        backgroundColor: "#eeba0b",
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'justify'
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

