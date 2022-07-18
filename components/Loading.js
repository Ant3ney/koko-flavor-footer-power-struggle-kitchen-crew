import React from "react";
import { View, Text, Button } from "react-native";
import basic from "../Styles/basics";

function Loading(){
    return(
        <View
         style={basic.testContainer}
        >
            <Text>Loading...</Text>
        </View>
    );
}

export default Loading;