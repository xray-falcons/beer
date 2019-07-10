import React, { Component } from 'react';
import { Animated, Text, View, Dimensions, StyleSheet } from 'react-native';

import Constants from 'expo-constants';
import {Image} from "react-native-elements";
import PAGES from "./pages";
import UserProfile from "./user-profile";

const PAGE_WIDTH = Dimensions.get('window').width;

// This walkthrough displays correctly on iPhoneX but
// not on other devices. The sizing would benefit from flexbox

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
            <View style={styles.container}>
                <Animated.View style={[ StyleSheet.absoluteFill, { backgroundColor, opacity: 0.8 } ]} />
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [ { nativeEvent: { contentOffset: { x: this.state.scroll } } } ],
                    )}>
                    {PAGES.map((page, i) => {
                        return(
                        <View key={i} style={styles.page}>
                                {(i < PAGES.length-1)
                                    ?
                                    <View style={[ styles.card ]}>
                                        <Text style={styles.title}>{page.title}</Text>
                                        <Text style={styles.desc}>{page.description}</Text>
                                    </View>
                                    :
                                    <Text style={styles.desc1}>{page.description}</Text>
                                }
                            {(i < PAGES.length-1)
                                ?
                            <Animated.View style={[ styles.frame, styles.shadow, { transform: [{ translateX: Animated.multiply(Animated.add(position, -i), -200) }] } ]}>
                                <Animated.Image
                                    source={{uri: page.image}}
                                    style={styles.photo}
                                />
                            </Animated.View>
                                :
                                <Animated.View style={[ styles.frame1,  { transform: [{ translateX: Animated.multiply(Animated.add(position, -i), -200) }] } ]}>

                                <UserProfile navigation={this.props.navigation}/>
                                </Animated.View>
                                }
                            {((i > 0) && (i < PAGES.length-1)) ?  <View style={styles.button}>
                                <Image style={{width: 380, height: 90, justifyContent: "center", alignItems: "center" } } source={{uri: page.imageBottom}}/>
                            </View> : <Text style={styles.buttonText}> </Text> }

                        </View>
                    )})}
                </Animated.ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        fontSize: PAGE_WIDTH / 12,
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
    desc1: {
        fontSize: PAGE_WIDTH / 20,
        color: '#fff',
        backgroundColor: 'transparent',
        marginTop: 20,
        lineHeight: 25,
        textAlign: 'center'
    },
    page: {
        width: PAGE_WIDTH,
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
    frame1: {
        position: 'absolute',
        left: 0,
        bottom: 160,
        borderRadius: (PAGE_WIDTH -100)/2,
        height: PAGE_WIDTH -60,
        width: PAGE_WIDTH - 100,
        margin: 50,
    },
    button: {
        // backgroundColor: 'rgba(0,0,0, 0.3)',
        position: 'absolute',
        margin: 12,
        marginTop: 40,
        // left: (PAGE_WIDTH / 2) - 100,
        // borderRadius: 50,
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
