import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUpView from './components/sign-up'
import {LinearGradient} from "expo-linear-gradient";


export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoadingComplete: false
        };



    }
  render () {
        return (
          <View
              style={styles.container}
          >
              <LinearGradient
                  colors={['#c36f09', '#eeba0b']}
                  style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      //CHECK DOCS!!!!! cause this could not work on different devices
                      height: 1000,
                  }}
              >
                  <SignUpView/>
              </LinearGradient>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#c36f09',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
