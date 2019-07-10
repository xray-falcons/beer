import { StyleSheet } from "react-native";

export default StyleSheet.create({
    attentionButton:{
        backgroundColor:"#841574",
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




export const beerStyles = ["British Origin Ales", "Irish Origin Ales", "North American Origin Ales","German Origin Ales", "Belgian And French Origin Ales","International Ale Styles","European-germanic Lager","North American Lager", "International Styles","Hybrid/mixed Beer","Mead, Cider, & Perry","Malternative Beverages"]
export const beerTastes = ["sweet", "chocolate", "hoppy", "citrus","sour","spicy", "fruit","light","coffee","earthy", "tropical", "roast", "caramel", "coconut", "porter", "dark", "barley", "malt", "ipa", "grapefruit", "stout", "smokey", "banana", "vanilla", "bitter", "zest", "crispy", "lemon", "raspberries", "smooth", "bavaria"]
export const PAGES = [
    {
        title: 'Welcome to Stumblr!',
        description: "An intelligent beer recommendation engine powered by your delightful taste! We will get your info in a moment but first let us show you around!",
        backgroundColor: '#bc6400',
        image: 'https://raw.githubusercontent.com/xray-falcons/beer/master/style/StumblrLogo.png',
        imageBottom: ''
    },


    {
        title: 'Choose your beer',
        description: "You can find beer you like by category:",
        backgroundColor: '#e9a709',
        image: 'https://raw.githubusercontent.com/malyavka/GroupProject.FullBlastAcademy/master/20190710_004841.jpg?token=AJFKIIWBBC4YCTS7IUAGGXK5F2UQ4',
    imageBottom: "https://raw.githubusercontent.com/malyavka/GroupProject.FullBlastAcademy/master/20190709_210409.jpg?token=AJFKIIVWFR3DAKJPMW3SPR25F2RVQ"
    },
    {
        title: 'Choose your taste',
        description: "You can find beer you like filtering your tastes",
        backgroundColor: '#ffce11',
        image: 'https://raw.githubusercontent.com/malyavka/GroupProject.FullBlastAcademy/master/20190710_004810.jpg?token=AJFKIIW5MN5ZDZYMZCIFWAK5F2UO2',
        imageBottom: "https://raw.githubusercontent.com/malyavka/GroupProject.FullBlastAcademy/master/20190709_210409.jpg?token=AJFKIIVWFR3DAKJPMW3SPR25F2RVQ"
    },
    {
        title: 'Know the name?',
        description: "Perfect! Just put it in the search bar! And our smart engine will find it for you!",
        backgroundColor: '#d35400',
        image: 'https://raw.githubusercontent.com/malyavka/GroupProject.FullBlastAcademy/master/20190710_005142.jpg?token=AJFKIITTQQUCS7DQDPCHF4C5F2UZC',
        imageBottom: "https://raw.githubusercontent.com/malyavka/GroupProject.FullBlastAcademy/master/20190709_210350.jpg?token=AJFKIIXA5ZFLVKY2SFSGBQC5F2RSW"
    },
    {
        title: 'Know what you want?',
        description: "We can find the nearest bar to you using geolocation! ",
        backgroundColor: '#863705',
        image: 'https://raw.githubusercontent.com/malyavka/GroupProject.FullBlastAcademy/master/20190710_004303.jpg?token=AJFKIIWRQTZXRAGVOGC7YYC5F2UAU',
    imageBottom: "https://raw.githubusercontent.com/malyavka/GroupProject.FullBlastAcademy/master/20190709_210159.jpg?token=AJFKIISUB6JVYP3XFJG5ATK5F2RY6"
    },
    {
        title: 'I feel lucky',
        description: "You are curious and want to leave your comfort zone? Try random beer!",
        backgroundColor: '#bc870c',
        image: 'https://raw.githubusercontent.com/malyavka/GroupProject.FullBlastAcademy/master/20190710_004316.jpg?token=AJFKIIWPW77CGBBVUMMOPXC5F2T62',
        imageBottom: "https://raw.githubusercontent.com/malyavka/GroupProject.FullBlastAcademy/master/20190709_210121.jpg?token=AJFKIIUBAAYRS5WMCUKFF425F2ROY"

    },

    {
        description: "Please help us to prepare list of beers for you! Choose at least three preferences below!",
        backgroundColor: '#863705',
    },
]
