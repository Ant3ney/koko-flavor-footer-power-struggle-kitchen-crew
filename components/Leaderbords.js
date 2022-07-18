import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import basic from "../Styles/basics";

function Leaderbords(props){
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
            <Text>This is the leaderbords view</Text>
        </View>
    );
}

export default Leaderbords;