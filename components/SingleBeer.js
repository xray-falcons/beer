import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import firebase from "firebase";
import connect from "react-redux";
import { db } from "../server/db";

const beerImage =
  "https://brewerydb-images.s3.amazonaws.com/beer/QJZFnY/upload_h8SNgF-contentAwareMedium.png";

export default class SingleBeer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beerName: "myname",
      beerImage: "",
      abv: 10,
      description: "hello",
      ibu: 20,
      brewery: "mybrewery",
      style: "mystyle"
    };
  }

  query = async () => {
    try {
      console.log("single beer query");
      const beers = await db.collection("beers");
      const query = await beers.doc(1);
      console.log(query);
      // let arr = [];
      // query.get().then(function(querySnapshot) {
      //   querySnapshot.forEach(function(doc) {
      //     let beer = doc.data();
      //     arr.push(beer);
      //   });

      // console.log(arr);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headText}>{this.state.beerName}</Text>
        <Image source={{ uri: beerImage }} style={styles.image} />
        <Text style={styles.text}>abv:{this.state.abv}</Text>
        <Text style={styles.text}>{this.state.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 100
  },
  headText: {
    fontSize: 48
  },
  text: {
    fontSize: 20
  }
});