import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import pressStartStyle from "../Styles/pressStart";

function PressStart(props){
    return(
        <View style={pressStartStyle.container}>
            <Text>PressStart</Text>
            <Button
             title="Start"
             onPress={() => {
                props.navigation.navigate("Main Menu");
             }}
            />
        </View>
    );
}

export default PressStart;