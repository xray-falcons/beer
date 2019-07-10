import React, {Component} from "react";
import { View, Text, Image, ScrollView, TouchableWithoutFeedback} from "react-native";
import { Audio } from 'expo-av';
import {Button, Badge} from "react-native-elements";
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
      dislike:false,
      notes:"",
      times:0,
      drinkPress:false,
      userId:0,
      beer:this.props.navigation.getParam('beer')
    }
  }
    static navigationOptions = {
        header: null
    }

  componentDidMount = async()=>{
    try {
      this.setState({userId: await firebase.auth().currentUser.uid})
      const userId = this.state.userId
      const beer = this.state.beer
      const beerQuery = await db.collection("users").doc(`${userId}`).collection("beers").doc(`${beer.id}`).get()
      if(beerQuery.data()){
        if(beerQuery.data().rating === 1){
          this.setState({like:true, dislike:false})
        } else if(beerQuery.data().rating === -1){
          this.setState({like:false, dislike:true})
        }
        const notes = await beerQuery.data().userNotes;
        this.setState({notes:notes})
        const times = await beerQuery.data().times;
        this.setState({times:Number(times)})
      }
    }catch(error){
      console.error(error)
    }
  }

  onLike = async(stateObj, rating) => {
    const userId = this.state.userId
    const beer = this.state.beer
    this.setState(stateObj)
    await db.collection("users").doc(`${userId}`).collection("beers").doc(`${beer.id}`).set({
      "name":beer.name,"rating":rating, "beer":beer
      }, {"merge":true});
  }

  onDrink = async() => {
    try {      
        const userId = this.state.userId
        const beer = this.state.beer
        const beerRef = await db.doc(`users/${userId}/beers/${beer.id}`)
        if(!beerRef.times) beerRef.times = 0;
        beerRef.update({"times":firebase.firestore.FieldValue.increment(1)})
        beerRef.set({"lastHad":new Date(), "beer":beer }, {"merge":true})
        let countIncrementer = 1;
        countIncrementer+=this.state.times
        this.setState({times:countIncrementer})
        const soundObj = new Audio.Sound()
        await soundObj.loadAsync(require('../sounds/open_beer.m4a')) 
        await soundObj.playAsync()
    } catch (err){
      console.log(err)
    }
  }

  glowButton = (bool) => {
    this.setState({drinkPress:bool})
  }

  submitNote = async() => {
    if (this.state.text){
      const userId = this.state.userId
      const beer = this.state.beer
      let beerRef = await db.doc(`users/${userId}/beers/${beer.id}`)
      beerRef.set({"userNotes":this.state.text, "beer":beer }, {"merge":true})
      this.setState({notes:this.state.text})
      this.setState({text:""})
    }
  }

  getStyle = (bool) => {
    if (bool) {
      return styles.iconButtonPressed
    } else {
      return styles.iconButton}
  }

  render(){
    const beer = this.state.beer
    return (
      <LinearGradient
        colors={["#c36f09", "#eeba0b"]}
        style={styles.linearGradient}
      >
        <View style={styles.container}>
          <ScrollView style={styles.marginTop}>
            <Text style={styles.headText}>{beer.name}</Text>
            <Text style={styles.textBold}>{beer.style.category.name}</Text>
            <Text style={styles.textBold}>abv: {beer.abv} ibu: {beer.ibu}</Text>
            <Image source={{ uri: beer.labels.large }} style={styles.image} />
            <Text style={styles.text}>{beer.description}</Text>

            <View style={styles.buttonRow}>
              <Icon name="thumbs-up" style={this.getStyle(this.state.like)} onPress={()=>{this.onLike({like:true, dislike:false}, 1)}} />
              <Icon name="thumbs-down" style={this.getStyle(this.state.dislike)} onPress={()=>{this.onLike({like:false, dislike:true}, -1)}} />
              <TouchableWithoutFeedback onPressIn={()=>{this.glowButton(true)}} onPress={this.onDrink} onPressOut={()=>{this.glowButton(false)}}>
                <Icon name="beer" style={this.getStyle(this.state.drinkPress)} />
              </TouchableWithoutFeedback>
              <Badge value={this.state.times} status="primary" containerStyle={styles.badgePosition}/>
            </View>
            <Text style={styles.text}>Like, dislike, or drink this beer</Text>
            <Text style={styles.textBold}>Contribute your notes here!</Text>
            <Text style={styles.textBox}>{this.state.notes || null}</Text>
            <TextInput style={styles.notebox} placeholder="Your notes..." onChangeText={(text)=>this.setState({text})} value={this.state.text}/>
            <Button buttonStyle={styles.attentionButton} title="Submit" onPress={this.submitNote} />
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}
