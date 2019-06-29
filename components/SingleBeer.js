import React from "react";
import { View, Button, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NEG_ONE } from "long";


// import firebase from "firebase";
// import connect from "react-redux";
// import { db } from "../server/db";

//const beerImage =
//  "https://brewerydb-images.s3.amazonaws.com/beer/QJZFnY/upload_h8SNgF-contentAwareMedium.png";

// will refactor so that beer info is passed in props
// will refactor again so that beer info is passed from redux store

const props = {
      beerName: "myname",
      beerImage: "https://brewerydb-images.s3.amazonaws.com/beer/QJZFnY/upload_h8SNgF-contentAwareMedium.png",
      abv: 10,
      description: "hello",
      ibu: 20,
      brewery: "mybrewery",
      style: "mystyle"
    };

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
      },
      button: {
        fontSize:25,
        backgroundColor:"#fb0",
        padding:10,
        margin:5,
        borderStyle:"solid",
        borderColor:"#fb0"
      }
    });

    const SingleBeer = () => {
      return (
        <View style={styles.container}>
        <Text style={styles.headText}>{props.beerName}</Text>
        <Image source={{ uri: props.beerImage }} style={styles.image} />
        <Text style={styles.text}>abv:{props.abv}</Text>
        <Text style={styles.text}>{props.description}</Text>
        <Icon.Button name="thumbs-up" color="#640" style={styles.button}/>
        <Icon.Button name="thumbs-down"
        color="#640" style={styles.button} />
      </View>
    );
}


export default SingleBeer

// Functional component
// export const SingleBeer = props => {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.headText}>{props.beerName}</Text>
//         <Image source={{ uri: props.beerImage }} style={styles.image} />
//         <Text style={styles.text}>abv:{props.abv}</Text>
//         <Text style={styles.text}>{props.description}</Text>
//       </View>
//     );
// }

