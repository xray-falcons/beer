import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "react-navigation";
import { HomeNavigator, RandomNavigator, SearchNavigator } from "./stack-navigator";
import TopTabNavigator from "./top-tab-navigator";
import Map from "../components/map";
import Walk from "../components/walk";

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Icon;
    let iconName;
    if (routeName === "Home") {
        iconName = "user";
    } else if (routeName === "Choose a beer!") {
        iconName = "beer";
    } else if (routeName === "I feel lucky!") {
        iconName = "question";
    }
    else if (routeName === "Search") {
        iconName = "search";
    }
    else if (routeName === "Find a bar") {
        iconName = "map-signs";
    }

    return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const BottomTabNavigator = createBottomTabNavigator(
    {
        Home: HomeNavigator,
        "Choose a beer!": TopTabNavigator,
        Search: SearchNavigator,
        "Find a bar": {
            screen: Map
        },
        "I feel lucky!": RandomNavigator,
        Pref: {
            screen: Walk
        }
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
                paddingTop: 10,
                backgroundColor: "#eeba0b",
                alignItems: 'center'
            }
        }
    }
);

export default BottomTabNavigator;
