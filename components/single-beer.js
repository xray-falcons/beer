import React, {Component} from "react";
import { View, Button, Text, StyleSheet, Image, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
import { db } from "../server/db";
import { TextInput } from "react-native-gesture-handler";

export default class SingleBeer extends Component {

  constructor(){
    super()
    this.state={
      text:""
    }
  }

    render() {
        const userId = firebase.auth().currentUser.uid
        const beer = this.props.navigation.getParam('beer')
        return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.headText}>{beer.name}</Text>
            <Text style={styles.textBold}>{beer.style.category.name}</Text>
            <Text style={styles.textBold}>abv: {beer.abv} ibu: {beer.ibu}</Text>
            <Image source={{ uri: beer.labels.large }} style={styles.image} />
            <Text style={styles.text}>{beer.description}</Text>
            <View style={styles.buttonRow}>
            <Icon.Button name="thumbs-up" onPress={()=>{
                db.collection("users").doc(`${userId}`).collection("beers").doc(`${beer.id}`).set({
                "name":beer.name,"rating":1, "beer":beer}, {"merge":true})
              }} color="#640" style={styles.button}/>
            <Icon.Button name="thumbs-down"
            color="#640" onPress={()=>{
              db.collection("users").doc(`${userId}`).collection("beers").doc(`${beer.id}`).set({
              "name":beer.name,"rating":-1, "beer":beer}, {"merge":true})
            }} style={styles.button} />
            <Icon.Button name="beer" onPress={()=>{
                const beerRef = db.doc(`users/${userId}/beers/${beer.id}`)
                if(!beerRef.times) beerRef.times = 0;
                beerRef.update({"times":firebase.firestore.FieldValue.increment(1)})
                beerRef.set({"lastHad":new Date(), "beer":beer }, {"merge":true})
              }} color="#640" style={styles.button} />
            </View>
            <Text style={styles.textBold}>Contribute your notes here!</Text>
            <TextInput style={{height:100}} placeholder="Your notes..." onChangeText={(text)=>this.setState({text})} value={this.state.text}/>
            <Button title="Submit" onPress={()=>{
              let beerRef = db.doc(`users/${userId}/beers/${beer.id}`)
              beerRef.set({"userNotes":this.state.text, "beer":beer }, {"merge":true})
              this.setState({text:""})
            }} />
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
