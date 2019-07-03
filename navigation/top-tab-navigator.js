import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import {StyleNavigator} from "./stack-navigator";
import {TasteNavigator} from "./stack-navigator";


const TopTabNavigator = createMaterialTopTabNavigator(
    {
        "Choose your style!":  StyleNavigator ,
        "Choose your taste!": TasteNavigator,
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {

            activeTintColor: 'red',
            inactiveTintColor: 'black',
            style: {
                backgroundColor: 'yellow',
                marginTop: 50
            },
            labelStyle: {
                textAlign: 'center',
            },
            indicatorStyle: {
                borderBottomColor: '#87B56A',
                borderBottomWidth: 2,
            },
        },
    }
);

export default TopTabNavigator;
