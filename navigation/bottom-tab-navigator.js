import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "react-navigation";
import {
    HomeNavigator,
    StyleNavigator,
    TasteNavigator
} from "./stack-navigator";

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    if (routeName === "Home") {
        iconName = "ios-home";
    } else if (routeName === "Style") {
        iconName = "ios-beer";
    } else if (routeName === "Taste") {
        iconName = "ios-search";
    }

    return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const BottomTabNavigator = createBottomTabNavigator(
    {
        Home: HomeNavigator,
        Style: StyleNavigator,
        Taste: TasteNavigator
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor)
        }),
        tabBarOptions: {
            activeTintColor: "black",
            inactiveTintColor: "gray",
            style: {
                // height: 100,
                // marginBottom: 55,
                paddingTop: 10,
                backgroundColor: 'green',
            },
        }
    }
);

export default BottomTabNavigator;
