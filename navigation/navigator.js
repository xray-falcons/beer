import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Loading from "../components/loading";
import { AuthNavigator } from "./stack-navigator";
import UserProfile from "../components/user-profile";
import BottomTabNavigator from "./bottom-tab-navigator";

const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen: Loading,
    Welcome: AuthNavigator,
    Preferences: {screen: UserProfile},
    Dashboard: BottomTabNavigator,
    },
{
        initialRouteName: 'LoadingScreen'
    }
);

export const AppNavigator = createAppContainer(AppSwitchNavigator);
