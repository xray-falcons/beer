import React, { Component } from 'react';
import { Animated, Text, View, Dimensions, StyleSheet } from 'react-native';

import Constants from 'expo-constants';
import UserProfile from "./user-profile";

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGES = [
    {
        title: 'Welcome to Stumblr!',
        description: "An intelligent beer recommendation engine powered by your delightful taste! We will get your info in a moment but first let us show you around!",
        backgroundColor: '#bc6400',
        image: 'https://raw.githubusercontent.com/xray-falcons/beer/master/style/StumblrLogo.png'
    },
    {
        title: 'Consectetur adipisicing',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ",
        backgroundColor: '#bc7804',
        image: 'https://github.com/xray-falcons/beer/blob/master/style/browse_by_flavor_input.png?raw=true'
    },
    {
        title: 'Adipisicing elitt',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
        backgroundColor: '#d3901a',
        image: 'https://unsplash.it/400/400?image=900'
    },
    {
        title: 'sit amet',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
        backgroundColor: '#e9a709',
        image: 'https://unsplash.it/400/400?image=999'
    },
    {
        title: 'Sed do eiusmod',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
        backgroundColor: '#d3901a',
        image: 'https://unsplash.it/400/400?image=1011'
    },
]

export default class Walk extends Component {
    state = {
        scroll: new Animated.Value(0),
    };
    static navigationOptions = {
        header: null
    }

    render() {
        const position = Animated.divide(this.state.scroll, PAGE_WIDTH);
        const backgroundColor = position.interpolate({
            inputRange: PAGES.map((_, i) => i),
            outputRange: PAGES.map(p => p.backgroundColor),
        });

        return (
            <View style={walkStyles.container}>
                <Animated.View style={[ StyleSheet.absoluteFill, { backgroundColor, opacity: 0.8 } ]} />

                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [ { nativeEvent: { contentOffset: { x: this.state.scroll } } } ],
                    )}>

                    <View style={walkStyles.page}>
                        <View style={[ walkStyles.card ]}>
                            <Text style={walkStyles.title}>Welcome to Stumblr!</Text>
                            <Text style={walkStyles.desc}>"An intelligent beer recommendation engine powered by your delightful taste! We will get your info in a moment but first let us show you around!"</Text>

                        </View>
                        <Animated.View style={[ walkStyles.frame, walkStyles.shadow, { transform: [{ translateX: Animated.multiply(Animated.add(position, -0), -200) }] } ]}>
                            <Animated.Image
                                source={{uri: 'https://raw.githubusercontent.com/xray-falcons/beer/master/style/StumblrLogo.png'}}
                                style={{
                                    flex: 1,
                                    borderRadius: (PAGE_WIDTH -100)/2,
                                }}
                            />
                        </Animated.View>

                    </View>
                    {PAGES.map((page, i) => (
                        <View key={i} style={walkStyles.page}>
                            <View style={[ walkStyles.card ]}>
                                <Text style={walkStyles.title}>{page.title}</Text>
                                <Text style={walkStyles.desc}>{page.description}</Text>

                            </View>
                            <Animated.View style={[ walkStyles.frame, walkStyles.shadow, { transform: [{ translateX: Animated.multiply(Animated.add(position, -i-1), -200) }] } ]}>
                                <Animated.Image
                                    source={{uri: page.image}}
                                    style={walkStyles.photo}
                                />
                            </Animated.View>

                        </View>
                    ))}
                    <View style={walkStyles.page}>
                        <View style={[ walkStyles.card ]}>
                            <Text style={walkStyles.title}>Welcome to Stumblr!</Text>
                            <Text style={walkStyles.desc}>"Please give"</Text>

                        </View>
                        <Animated.View style={[ walkStyles.frame, walkStyles.shadow, { transform: [{ translateX: Animated.multiply(Animated.add(position, -6), -200) }] } ]}>
                            < UserProfile />
                        </Animated.View>

                    </View>

                </Animated.ScrollView>

                <View style={walkStyles.button}>
                    <Text style={walkStyles.buttonText} onPress={() => this.props.navigation.navigate('Dashboard')}>{"GET STARTED"}</Text>
                </View>
            </View>
        );
    }
}

const walkStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    shadow: {
        elevation: 16,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 20,
        shadowOffset: {
            height: 12
        },
    },
    title: {
        fontSize: PAGE_WIDTH / 15,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: 'transparent',
        textAlign: 'center'
    },

    desc: {
        fontSize: PAGE_WIDTH / 24,
        color: '#fff',
        backgroundColor: 'transparent',
        marginTop: 20,
        lineHeight: 25,
        textAlign: 'center'
    },
    page: {
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
        paddingTop: Constants.statusBarHeight + 48,
    },
    card: {
        position: 'absolute',
        margin: 12,
        marginTop: 40,
        left: 12,
        top: 0,
        right: 0,
        borderRadius: 8,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 140,
    },
    frame: {
        position: 'absolute',
        left: 0,
        bottom: 160,
        borderRadius: (PAGE_WIDTH -100)/2,
        height: PAGE_WIDTH -100,
        width: PAGE_WIDTH - 100,
        margin: 50,
    },
    button: {
        backgroundColor: 'rgba(0,0,0, 0.3)',
        position: 'absolute',
        margin: 12,
        marginTop: 40,
        left: (PAGE_WIDTH / 2) - 100,
        borderRadius: 50,
        alignItems: 'center',
        bottom: 30,
    },
    buttonText: {
        margin: 15,
        marginLeft: 50,
        marginRight: 40,
        color: '#fff',
        fontSize: 14,
    },
    photo: {
        flex: 1,
        // borderRadius: (PAGE_WIDTH -100)/2,
    }
});
