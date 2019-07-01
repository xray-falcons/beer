import React from "react";
import { View, Button, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
import { db } from "../server/db";

export default class SingleBeer extends React.Component {
    async like(){
        firebase.auth().onAuthStateChanged(async (user) => {
            await db.collection('users').doc(user.uid).set({rating: +1},{merge:true});
        })

            const users = await db.collection("users")

    //     let userbeer = await users
    //         .where('beerId', "==", "this.props.beerId")
    //         .where("userId", "==", "props.userId")
    //         .set({rating:1},{merge:true})
    //     console.log("User-beer rating is now: ", userbeer)
    }

    async dislike(){
        let userbeer = await db.collection("preferences")
            .where('beerId', "==", "this.props.beerId")
            .where("userId", "==", "props.userId")
            .set({rating:-1},{merge:true})
        console.log("User-beer rating is now: ", userbeer)
    }


    render() {
        const beerName = this.props.navigation.getParam('beerName')
        const beerImage = this.props.navigation.getParam('beerImage')
        const abv = this.props.navigation.getParam('abv')
        const description = this.props.navigation.getParam('description')
        const ibu = this.props.navigation.getParam('ibu')
        const style = this.props.navigation.getParam('style')
            return (
                <View style={styles.container}>
                    <Text style={styles.headText}>{beerName}</Text>
                    <Image source={{ uri: beerImage}} style={styles.image} />
                    <Text style={styles.text}>abv:{abv}</Text>
                    <Text style={styles.text}>{description}</Text>
                    <Button
                        title='like'
                        icon={
                            <Icon
                                name="thumbs-up"
                                size={15}
                                color="#640"
                            />
                        }
                        onPress={() => this.like()}
                    />

                    {/*<Icon.Button name="thumbs-down"*/}
                                 {/*color="#640" style={styles.button} onPress={() => this.dislike()} />*/}
                </View>
            );
        }

}

const styles = StyleSheet.create({
    container: {
        flex: 0.6,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 100
    },
    headText: {
        fontSize: 48
    },
    text: {
        fontSize: 20
    },
    button: {
        fontSize:25,
        backgroundColor:"#fb0",
        padding:10,
        margin:5,
        borderStyle:"solid",
        borderColor:"#fb0"
    }
});
