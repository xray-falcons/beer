import React, { Component } from 'react'
import {View, Image} from 'react-native';
import {Button} from "react-native-elements"
import styles from '../style/styles';

export default class Beer extends Component {
  render() {
    const beer = this.props.beer
    return (
      <View style={{backgroundColor:"transparent"}}>
        <Image source={{uri:beer.labels.medium}} style={styles.itemImageSmall}/>
        <Button title={beer.name} type="clear" titleStyle={styles.buttonText} onPress={() => this.props.navigation.navigate('Beer', {beer: beer}) }/>
      </View>
    )
  }
}
