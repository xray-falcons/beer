import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SignUpView from './components/sign-up'
import {LinearGradient} from "expo-linear-gradient";
import {styles} from "./style/styles";
import SignInView from './components/sign-in';

import {Provider} from 'react-redux'
import store from './redux/index'



export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoadingComplete: false
        };

    }
  render () {
        return (
            <Provider store={store}>
          <View style={styles.container} >
              <LinearGradient
                  colors={['#c36f09', '#eeba0b']}
                  style={styles.linearGradient}
              >
                  <SignUpView/>


              </LinearGradient>
          </View>
            </Provider>
      );
  }
}
