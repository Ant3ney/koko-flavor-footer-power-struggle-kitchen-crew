import React from "react";
import { View, Text, Button } from "react-native";
import basic from "../../Styles/basics";

function StationOptions(props){
    var mStats = props.gameLogic.manageStats;
    return(
        <View
         style={{
             ...basic.makeForground(2),
             ...basic.width100,
             ...basic.heightAuto,
             ...basic.bgStandard
            }}
        >
            <Text>Switch to</Text>
            <Button 
             title="Sause"
             onPress={() => {
                mStats.setPStation("sause");
             }}
            />
            <Button 
             title="Frier"
             onPress={() => {
                mStats.setPStation("frier");
             }}
            />
            <Button 
             title="Rice"
             onPress={() => {
                mStats.setPStation("rice");
             }}
            />
            <Button 
             title="Cancel"
             onPress={() => {
                 props.exit();
             }}
            />
        </View>
    );
}

export default StationOptions;