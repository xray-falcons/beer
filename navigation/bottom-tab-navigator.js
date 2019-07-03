import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "react-navigation";
import {
    HomeNavigator, SearchNavigator,
    StyleNavigator,
    TasteNavigator
} from "./stack-navigator";
import TopTabNavigator from "./top-tab-navigator";

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    if (routeName === "Home") {
        iconName = "ios-home";
    } else if (routeName === "Choose your beer!") {
        iconName = "ios-beer";
    } else if (routeName === "Taste") {
        iconName = "ios-heart";
    }
    else if (routeName === "Search") {
        iconName = "ios-search";
    }

    return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const BottomTabNavigator = createBottomTabNavigator(
    {
        Home: HomeNavigator,
        "Choose your beer!": TopTabNavigator,
        // Taste: TasteNavigator,
        Search: SearchNavigator,

    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor)
        }),
        tabBarOptions: {
            activeTintColor: "black",
            inactiveTintColor: "white",
            style: {
                // height: 100,
                // marginBottom: 55,
                paddingTop: 10,

                backgroundColor: "#c36f09",
                // justifyContent: 'center',
                alignItems: 'center',

            },
        }
    }
);

export default BottomTabNavigator;
