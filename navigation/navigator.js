import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator,} from "react-navigation";
import SignUpView from "../components/sign-up";
import {LinearGradient} from "expo-linear-gradient";
import { SwitchNavigator } from 'react-navigation'
import Loading from '../components/loading';
import SignUp from "../components/sign-in";
import Test from '../components/test';

const Home = SwitchNavigator(
    {
        Loading,
        SignUpView,
        SignInView,
        Test
    },
    {
        initialRouteName: 'Loading'
    }
)
export default Home