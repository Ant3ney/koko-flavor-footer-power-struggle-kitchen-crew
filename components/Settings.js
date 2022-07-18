import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import basic from "../Styles/basics";

function Settings(props){
    const navigation = useNavigation();

    return(
        <View style={[basic.centerContainer, basic.bgWhite]}>
            <Button
             title="Back"
             onPress={() => {
                props.gameLogic.GameDriver.possibleGamePlayReturn(true);
                navigation.goBack();
             }}
            />
            <Button
             title="Main Menu"
             onPress={() => {
                props.navigation.navigate("Main Menu");
                props.gameLogic.GameDriver.quitGame();
             }}
            />
            <Text>This is the settings view</Text>
        </View>
    );
}

export default Settings;