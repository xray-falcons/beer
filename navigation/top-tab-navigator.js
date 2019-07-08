import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import {StyleNavigator, TasteNavigator} from "./stack-navigator";


const TopTabNavigator = createMaterialTopTabNavigator(
    {
        "Choose your style!":  StyleNavigator,
        "Choose your taste!": TasteNavigator,
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {

            activeTintColor: 'black',
            inactiveTintColor: 'white',
            style: {
                backgroundColor: '#c36f09',
                marginTop: 30,
                fontWeight: "bold"
            },
            labelStyle: {
                textAlign: 'center',
            },
            indicatorStyle: {
                borderBottomColor: '#788475',
                borderBottomWidth: 2,
            },
        },
    }
);

export default TopTabNavigator;
