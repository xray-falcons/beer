import React from "react";
import { createSwitchNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import Loading from "../components/loading";
import { AuthNavigator } from "./stack-navigator";
import BottomTabNavigator from "./bottom-tab-navigator";

const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen: Loading,
    Welcome: AuthNavigator,
    Dashboard: BottomTabNavigator,
    },
{
        initialRouteName: 'LoadingScreen'
    }
);

export const AppNavigator = createAppContainer(AppSwitchNavigator);
