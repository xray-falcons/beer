import { StyleSheet } from "react-native";

export default StyleSheet.create({
    attentionButton:{
        backgroundColor:"#bf5f11",
        borderRadius:5
    },
    attentionButtonFixed:{
        backgroundColor:"#841574",
        borderRadius:5,
        position: "relative",
    },
    authButton: {
        backgroundColor: "#710000",
    },
    authButtonContainer: {
        height:25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 1,
        width:200,
        borderRadius:30,
    },
    authInputs:{
        height:40,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    authInputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width: 200,
        height: 35,
        marginBottom:2,
        flexDirection: 'row',
        alignItems:'center'
    },
    authInputIcon:{
        width:15,
        height:15,
        marginLeft:15,
        justifyContent: 'center'
    },
    authText: {
        color: 'white',
    },
    badgePosition:{
        left: -25,
        top:-1
    },
    buttonRow:{
        flexDirection:"row",
        justifyContent: "center"
    },
    buttonText:{
        color:"black",
        fontSize:14
    },
    cardContainer:{
        backgroundColor:"transparent",
        width:150
    },
    columns: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: "column",
        margin: 20
    },
    containerApp: {
        flex: 1,
    },
    containerImage: {
        width: "30%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
    },
    headText: {
        fontSize: 38,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15
      },
    iconButton: {
        fontSize:36,
        color:"#530",
        padding:15,
    },
    iconButtonPressed: {
        fontSize:36,
        color:"#eee",
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
        width: 100,
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
    marginTop: {
        marginTop: 70
    },
    notebox:{
        height:100,
        backgroundColor:"#f0f0f0",
        borderRadius:5
    },
    searchBar:{
        marginTop: 120,
        backgroundColor:"transparent"
    },
    searchLogo:{
        width:200,
        height:200,
        marginBottom: 200,
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
    textBox: {
        fontSize: 20,
        textAlign: 'justify',
        padding:4,
        borderWidth:2,
        borderColor:"#443000",
        margin:5
    },
    titleText:{
        fontSize: 26,
        alignItems: 'center',
        textAlign: 'center',

    },
    textBold:{
        fontWeight: "bold",
        fontStyle: 'italic',
        textAlign: 'center',
        fontSize:22
    },
});
