import React from "react";
import { View, Text, Button } from "react-native";
import basic from "../../../Styles/basics";

function Character(props){

    return(
        <View
         style={basic.paddingBottom05}
        >
            <View
             style={basic.gridRow}
            >
                <Text
                 style={basic.gridColGeneric}
                >
                    Name: {props.characterInfo.name.get()}
                </Text>
                <Text
                 style={basic.gridColGeneric}
                >
                    Job: {props.characterInfo.getJob()}
                </Text>
            </View>
            <View
             style={basic.gridRow}
            >
                <Text
                 style={{
                    ...basic.gridColGeneric,
                    ...basic.text10
                 }}
                >
                    Power: {props.characterInfo.getPower()}
                </Text>
                <Text
                 style={{
                    ...basic.gridColGeneric,
                    ...basic.text10
                 }}
                >
                    Sanity: {props.characterInfo.getSanity()}
                </Text>
            </View>
        </View>
    );
}

export default Character;