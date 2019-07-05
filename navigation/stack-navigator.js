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
import Search from "../components/search-bar";
import BeerListSearch from "../components/beer-list-search";
import Random from "../components/random";

//Add navigators with screens in this file
export const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
});
export const RandomNavigator = createStackNavigator({
    Random: { screen: Random },
    Beer: { screen: SingleBeer },
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

export const SearchNavigator = createStackNavigator({
    Search: { screen: Search },
    SearchList: {screen: BeerListSearch},
    Beer: { screen: SingleBeer },
    Random: RandomNavigator
});

export const AuthNavigator =  createStackNavigator({
        SignUpScreen: { screen: SignUpView },
        SignInScreen: { screen: SignInView },
    }
);

