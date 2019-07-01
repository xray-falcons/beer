import React from "react";
import { View, Text } from "react-native";
import SignUpView from "../components/sign-up";
import { createSwitchNavigator, createAppContainer, createBottomTabNavigator, createStackNavigator, createNavigationContainer } from "react-navigation";
import Loading from "../components/loading";
import Test from "../components/test";
import SignInView from "../components/sign-in";
import SingleBeer from "../components/single-beer";
import Category from "../components/choose-category";
import Home from "../components/home"


const AuthStack =  createStackNavigator({
        SignUpScreen: SignUpView,
        SignInScreen: SignInView,
    }
)

const HomeStack =  createStackNavigator({
    HomeScreen:  {screen: Home},
    CategoryScreen: {screen: Category},
    SingleBeerScreen: {screen: SingleBeer},

})



const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen: Loading,
    Auth: AuthStack,
    // App: HomeStack,

},
    {
        initialRouteName: 'LoadingScreen',
    });


export const AppNavigator = createAppContainer(AppSwitchNavigator);
