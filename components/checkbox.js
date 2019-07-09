import React, { Component } from 'react';
import { View, ScrollView, Alert, CheckBox } from 'react-native';
import styles, { beerTastes } from "../style/styles"



const TasteCheckbox = (props) => {
    const firstTastesArr = beerTastes.slice(0, (beerTastes.length-1)/2);
    const secondTastesArr = beerTastes.slice((beerTastes.length-1)/2);
    return (<ScrollView>
        <View style={styles.columns}>
            <View>
                {firstTastesArr.map((elem, idx) => {
                    return (
                        <CheckBox
                            key={idx}
                            title={elem}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={props.isItemChecked(elem)}
                            onPress={evt => props.manageToggle(evt, elem)}
                        />)
                })}
            </View>
            <View>
                {secondTastesArr.map((elem, idx) => {
                    return (
                        <CheckBox
                            key={idx}
                            title={elem}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={props.isItemChecked(elem)}
                            onPress={evt => props.manageToggle(evt, elem)}
                        />)
                })}
            </View>
        </View>
    </ScrollView>)
};





export default TasteCheckbox;
