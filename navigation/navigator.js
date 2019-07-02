import React from "react";
import SignUpView from "../components/sign-up";
import { createSwitchNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import Loading from "../components/loading";
import SignInView from "../components/sign-in";
import Drawer from "./drawer-navigator";
import { AuthNavigator } from "./stack-navigator";

const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen: Loading,
    Welcome: AuthNavigator,
    Dashboard: {
        screen: Drawer
    }
},
{
        initialRouteName: 'LoadingScreen'
    }
);

export const AppNavigator = createAppContainer(AppSwitchNavigator);
