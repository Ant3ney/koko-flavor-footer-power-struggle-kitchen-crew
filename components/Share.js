import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import basic from "../Styles/basics";

function Share(props){
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
            <Text>This is the share view</Text>
        </View>
    );
}

export default Share;