import React, {Component} from "react";
import { View, Button, Text, StyleSheet, Image, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
import { db } from "../server/db";

export default class SingleBeer extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         SingleBeer: {}
    //     }
    // }

    // _onTestButton(){
    //   //console.log("PARAMS FROM INSIDE _onTestButton", this.props.navigation)
    //   // const thisUserId = firebase.auth().currentUser.uid
    //   // const userRef = db.collection("users").doc(thisUserId)
    //   //let beerRef = db.collection("beers").where("id", "==", beerId)
    //   //userRef.set()
    //   //console.log("SingleBeer component: ", thisUserId)
    // }

    render() {
        //console.log("PROPS INSIDE _RENDER:", this.props)
        const beerName = this.props.navigation.getParam('beerName')
        const beerImage = this.props.navigation.getParam('beerImage')
        const abv = this.props.navigation.getParam('abv')
        const description = this.props.navigation.getParam('description')
        const ibu = this.props.navigation.getParam('ibu')
        const style = this.props.navigation.getParam('style')
        return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.headText}>{beerName}</Text>
            <Text style={styles.textBold}>{style}</Text>
            <Text style={styles.textBold}>abv: {abv} ibu: {ibu}</Text>
            <Image source={{ uri: beerImage }} style={styles.image} />
            <Text style={styles.text}>{description}</Text>
            <View style={styles.container}>
            <Button title="test-like"
              onPress={()=>{
                const userId = firebase.auth().currentUser.uid
                console.log("userId", userId)
                //const userRef = db.collection("users").doc(userId)
                //console.log("USER", user)
                const beerId = this.props.navigation.getParam('beerId')
                console.log("beerId", beerId)

                //const setMyCollectionItem = db.collection("users").doc(userId).collection("test-collection").set({"apple": "testing2"}, {merge:true})
                // const myBeerRef = db.collection("users").doc(userId).collection("beers").doc()
                // const setMyBeer = myBeerRef.set({rating:1})
                // console.log("MY BEER", myBeerRef)
                //const userBeerRef = userRef.beers.set({beerId:{rating:1}},{merge:true})
                //console.log("USERBEERREF!!!!!", userBeerRef)
                //userBeerRef.set({rating:1},{merge:true})

              }} />
            <Icon.Button name="thumbs-up" color="#640" style={styles.button}/>
            <Icon.Button name="thumbs-down"
            color="#640" style={styles.button} />
            </View>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
    margin: 20
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
  headText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: 'center'
  },
  text: {
    fontSize: 20,
    textAlign: 'justify'
  },
  button: {
    fontSize:25,
    backgroundColor:"#fb0",
    padding:10,
    margin:5,
    borderStyle:"solid",
    borderColor:"#fb0"
  },
  textBold:{
    fontWeight: "bold",
    fontStyle: 'italic',
    textAlign: 'center'
  }
});


//USING PREFERENCES TABLE
// const setPref = db.collection("preferences").set({
// "beerid":beerId,
// "userid":userId,
// "rating":1
// },{merge:true})
