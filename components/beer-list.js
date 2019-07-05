import React, { Component } from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Image

} from 'react-native';
import {  Button, Card } from 'react-native-elements'
import firebase from 'firebase';
import 'firebase/firestore';
import { db } from '../server/db';
import { LinearGradient } from "expo-linear-gradient";



export default class BeerList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            page: 1,
            SingleBeer: {}
        }
    }
    componentDidMount(){
        this.getData()
    }
    getData = async () => {
        const name = this.props.navigation.getParam('name')
        try {
            const beers = await db.collection('beers');
            let beerArray =[]
            const query = await beers.where('style.category.name', '==', name);
            const querySnapshot = await query.get()
            querySnapshot.forEach(function (doc){
                let beer = doc.data();
                beerArray.push(beer)
            });
            this.setState({data: beerArray})


        } catch (err)  {
            console.log(err)
        }
}

    renderRow = ({item}) => {
        return(
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
                <View style={styles.item}>
                    <Card
                        style={{height: 20}}
                    >

                     <Button title={item.name} onPress={() => 
                        this.props.navigation.navigate('Beer', {beer:item})}
                    />
                    </Card>
                </View>
            </LinearGradient>
      )}

    render() {
        return(
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
                <FlatList
                    style={{marginTop: 16}}
                    numColumns={2}
                    data={this.state.data}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}

                />

            </LinearGradient>

        )

    }
          

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
   
    },
    item: {
        borderBottomWidth: 1,
        marginBottom: 10,
        justifyContent: "space-around"
    },
    itemText:{
        fontSize: 26,
        padding:25
    },
    itemImage:{
        width:"100%",
        height: 200,
        resizeMode: 'cover'
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
      
    },
})
