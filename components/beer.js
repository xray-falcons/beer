import React, { Component } from 'react'
import {View, Image, Text, TouchableOpacity } from 'react-native';
import styles from '../style/styles';

export default class Beer extends Component {
  render() {
    const route = this.props.navigation.state.routeName
    const beer = this.props.beer
    if(route === 'Home'){
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Beer', {beer: beer}) }>
        <View style={{backgroundColor:"transparent", padding: 10}}>
          <Image source={{uri:beer.labels.medium}} style={styles.itemImageSmall}/>
        </View>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Beer', {beer: beer}) }>
      <View style={{backgroundColor:"transparent"}}>
        <Image source={{uri:beer.labels.medium}} style={styles.itemImageSmall}/>
        <Text>{beer.name}</Text>
      </View>
      </TouchableOpacity>
    )
  }
}
