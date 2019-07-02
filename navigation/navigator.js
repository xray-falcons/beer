import React from "react";
import { createSwitchNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import Loading from "../components/loading";
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
