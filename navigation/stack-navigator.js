import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Home from "../components/home";
import Category from "../components/choose-category";
import BeerList from "../components/beer-list";
import SingleBeer from "../components/single-beer";
import Taste from "../components/choose-taste";
import BeerListTaste from "../components/beer-list-taste";
import SignUpView from "../components/sign-up";
import SignInView from "../components/sign-in";

//Add navigators with screens in this file
export const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
});

export const StyleNavigator = createStackNavigator({
    Style: { screen: Category },
    List: { screen: BeerList },
    Beer: { screen: SingleBeer },
});

export const TasteNavigator = createStackNavigator({
    Taste: { screen: Taste },
    List: { screen: BeerListTaste },
    Beer: { screen: SingleBeer },});

// export const SearchNavigator = createStackNavigator({
//     Search: { screen: SearchScreen }
// });


export const AuthNavigator =  createStackNavigator({
        SignUpScreen: { screen: SignUpView },
        SignInScreen: { screen: SignInView },
    }
);