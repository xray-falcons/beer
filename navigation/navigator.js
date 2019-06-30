import React from "react";
import { View, Text } from "react-native";
import SignUpView from "../components/sign-up";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Loading from "../components/loading";
import Test from "../components/test";
import SignInView from "../components/sign-in";
import SingleBeer from "../components/SingleBeer";
import Category from "../components/choose-category";
import Home from "../components/home"
import BeerList from '../components/beerlist'

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: BeerList,
  SignUpScreen: SignUpView,
  SignInScreen: SignInView,
  TestScreen: Test,
  SingleBeer: SingleBeer,
  CategoryScreen: Category
});

export const AppNavigator = createAppContainer(AppSwitchNavigator);
