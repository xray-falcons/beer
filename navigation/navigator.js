import React from "react";
import { View, Text } from "react-native";
import SignUpView from "../components/sign-up";
import { createSwitchNavigator, createAppContainer, createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from "react-navigation";
import Loading from "../components/loading";
import Test from "../components/test";
import SignInView from "../components/sign-in";
import SingleBeer from "../components/single-beer";
import Category from "../components/choose-category";
import Home from "../components/home"
import Icon from '@expo/vector-icons/Ionicons';
import BeerList from "../components/beerlist";

const AuthStack =  createStackNavigator({
        SignUpScreen: SignUpView,
        SignInScreen: SignInView,
    }
)

const BeerStack =  createStackNavigator({
        Search: Category,
    BeerList: BeerList,
    SingleBeer: SingleBeer
    }
)



const DashboardTabNavigator = createBottomTabNavigator(
    {
        Category: {
            screen: Category
        },
        Home: {
            screen: Home
        },
        SingleBeer: {
            screen: SingleBeer
        }
    },
    {
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.routes[navigation.state.index];
            return {
                headerTitle: routeName
            };
        }
    }
);
const DashboardStackNavigator = createStackNavigator(
    {
        DashboardTabNavigator: DashboardTabNavigator,
        Home: {
            screen: Home
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                headerLeft: (
                    <Icon
                        style={{ paddingLeft: 10 }}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu"
                        size={30}
                    />
                )
            };
        }
    }
);

const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: DashboardStackNavigator,
    },
    Profile: {
        screen: Home,
    },
    BeerStack,
    Beer: {
        screen: SingleBeer
    },


});

const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen: Loading,
    Welcome: AuthStack,
    Dashboard: {
        screen: AppDrawerNavigator
    }
},
{
        initialRouteName: 'LoadingScreen'
    }
);
//
// const AppContainer = createAppContainer(AppSwitchNavigator);
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });
//
//
//

// const bottomNavigator = createBottomTabNavigator({
//     Category,
//     Home,
//     SingleBeer
// })
//
// const HomeStack =  createStackNavigator({
//     Test: {
//         screen: bottomNavigator
//     }
//
// })
//
//
// const AppSwitchNavigator = createSwitchNavigator({
//     LoadingScreen: Loading,
//     Auth: AuthStack,
//     Home: HomeStack,
//
// },
//     {
//         initialRouteName: 'Home',
//     });


export const AppNavigator = createAppContainer(AppSwitchNavigator);
