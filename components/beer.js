import React, { Component } from 'react'
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert, Category
} from 'react-native';
// import { styles } from '../style/styles';
import { LinearGradient } from "expo-linear-gradient";

export default class Beer extends Component {
  render() {
    const beer = this.props.beer
    return (
      <View>
        <Image source={{uri:beer.labels.medium}} style={styles.itemImage}/>
        <Button title={beer.name} color='black' onPress={() => this.props.navigation.navigate('Beer', {beer: beer}) }/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop: 20,


  },
  itemImage:{
      width:"100%",
      height: 100,
      resizeMode: 'cover'
  },
})
