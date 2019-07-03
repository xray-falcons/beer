import React, {Component} from "react";
import { View, Button, Text, StyleSheet, Image, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
import { db } from "../server/db";

export default class SingleBeer extends Component {

    render() {
        const beerName = this.props.navigation.getParam('beerName')
        const beerImage = this.props.navigation.getParam('beerImage')
        const abv = this.props.navigation.getParam('abv')
        const description = this.props.navigation.getParam('description')
        const ibu = this.props.navigation.getParam('ibu')
        const style = this.props.navigation.getParam('style')
        const userId = firebase.auth().currentUser.uid
        const beerId = this.props.navigation.getParam('beerId')
        return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.headText}>{beerName}</Text>
            <Text style={styles.textBold}>{style}</Text>
            <Text style={styles.textBold}>abv: {abv} ibu: {ibu}</Text>
            <Image source={{ uri: beerImage }} style={styles.image} />
            <Text style={styles.text}>{description}</Text>
            <View style={styles.buttonRow}>
            <Icon.Button name="thumbs-up" onPress={()=>{
                db.collection("users").doc(`${userId}`).collection("beers").doc(`${beerId}`).set({
                "name":beerName,"rating":1}, {"merge":true})
              }} color="#640" style={styles.button}/>
            <Icon.Button name="thumbs-down"
            color="#640" onPress={()=>{
              db.collection("users").doc(`${userId}`).collection("beers").doc(`${beerId}`).set({
              "name":beerName,"rating":-1}, {"merge":true})
            }} style={styles.button} />
            <Icon.Button name="beer" onPress={()=>{
                let beerRef = db.doc(`users/${userId}/beers/${beerId}`)
                if(!beerRef.times) beerRef.times = 0;
                beerRef.update({"times":firebase.firestore.FieldValue.increment(1)})
                beerRef.set({"lastHad":new Date() }, {"merge":true})
              }} color="#640" style={styles.button} />
            </View>
          </ScrollView>
          {/* <Text>Notes!</Text> */}
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
  },
  buttonRow:{
    flexDirection:"row",
    justifyContent: "center"
  }
});
