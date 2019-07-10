import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Loading from "../components/loading";
import {AuthNavigator, WalkNavigator} from "./stack-navigator";
import BottomTabNavigator from "./bottom-tab-navigator";
import Walk from "../components/walk";

const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen: Loading,
    Welcome: AuthNavigator,
    Preferences: Walk,
    Dashboard: BottomTabNavigator,
    },
{
        initialRouteName: 'LoadingScreen'
    }
);

export const AppNavigator = createAppContainer(AppSwitchNavigator);
