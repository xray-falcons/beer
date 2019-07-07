import React, {Component} from "react";
import { View, Text, Image, ScrollView} from "react-native";
import {Button} from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
import { db } from "../server/db";
import { TextInput } from "react-native-gesture-handler";
import styles from "../style/styles"
import {LinearGradient} from "expo-linear-gradient";


export default class SingleBeer extends Component {

  constructor(props){
    super(props)
    this.state={
      text:"",
      like:false,
      dislike:false
    }
  }

  componentDidMount = async () =>{
    const userId = firebase.auth().currentUser.uid
    const beer = this.props.navigation.getParam('beer')
    const beerQuery = await db.collection("users").doc(`${userId}`).collection("beers").doc(`${beer.id}`).get()
    if(beerQuery){
      if(beerQuery.data().rating === 1){
        this.setState({like:true, dislike:false})
      } else if(beerQuery.data().rating === -1){
        this.setState({like:false, dislike:true})
      }
    }
  }

    render(){
        const userId = firebase.auth().currentUser.uid
        const beer = this.props.navigation.getParam('beer');
        return (
          <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.headText}>{beer.name}</Text>
            <Text style={styles.textBold}>{beer.style.category.name}</Text>
            <Text style={styles.textBold}>abv: {beer.abv} ibu: {beer.ibu}</Text>
            <Image source={{ uri: beer.labels.large }} style={styles.image} />
            <Text style={styles.text}>{beer.description}</Text>
            <View style={styles.buttonRow}>
              <Icon name="thumbs-up" style={this.state.like ? styles.iconButtonPressed : styles.iconButton} onPress={()=>{
                db.collection("users").doc(`${userId}`).collection("beers").doc(`${beer.id}`).set({
                  "name":beer.name,"rating":1, "beer":beer
                  }, {"merge":true});
                  this.setState({like:true, dislike:false})
              }} />
              <Icon name="thumbs-down" style={this.state.dislike ?styles.iconButtonPressed : styles.iconButton} onPress={()=>{
                db.collection("users").doc(`${userId}`).collection("beers").doc(`${beer.id}`).set({
                  "name":beer.name,"rating":-1, "beer":beer}, {"merge":true});
                  this.setState({like:false, dislike:true})
              }} />
              <Icon name="beer" style={styles.iconButton} onPress={()=>{
                  const beerRef = db.doc(`users/${userId}/beers/${beer.id}`)
                  if(!beerRef.times) beerRef.times = 0;
                  beerRef.update({"times":firebase.firestore.FieldValue.increment(1)})
                  beerRef.set({"lastHad":new Date(), "beer":beer }, {"merge":true})
                }} />
            </View>
            <Text style={styles.text}>Like, dislike, or drink this beer</Text>
            <Text style={styles.textBold}>Contribute your notes here!</Text>
            <TextInput style={styles.notebox} placeholder="Your notes..." onChangeText={(text)=>this.setState({text})} value={this.state.text}/>
            <Button buttonStyle={styles.attentionButton} title="Submit" onPress={()=>{
              let beerRef = db.doc(`users/${userId}/beers/${beer.id}`)
              beerRef.set({"userNotes":this.state.text, "beer":beer }, {"merge":true})
              this.setState({text:""})
            }} />
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}

