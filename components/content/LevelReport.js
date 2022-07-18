import { useLinkProps } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import gameReport from "../../GameLogic/ManageStats/GameReport";
import basic from "../../Styles/basics";
import Character from "./Schedule/Character";
import mStats from "../../GameLogic/ManageStats/ManageStats";

function LevelReport(props){
    const [compiledReport, setCompiledReport] = useState(null);
    const [strongerCharacters, setStrongerCharacters] = useState(mStats.getCharactersWhoAreStongerThanPlayer());

    useEffect(() => {
        setCompiledReport(gameReport.getCompiled());
    }, []);

    return(
        <View
         style={basic.testContainer}
        >
            <Text>Shift recap</Text>
            <Text>Power gain: {compiledReport ? compiledReport.powerGained : "error"}</Text>
            <Text>Sanity change: {compiledReport ? compiledReport.sanityChange : "error"}</Text>
            <Text>Last shift effectiveness: {compiledReport ? compiledReport.effectivness : "error"}</Text>
            <Text>Shift effectiveness gain: {compiledReport ? compiledReport.effectivnessGain : "error"}</Text>
            <Text>Skillpoints used: {compiledReport ? compiledReport.skillPointsUsed : "error"}</Text>
            <Text>Skill gained: {compiledReport ? compiledReport.skillGained : "error"}</Text>
            <Text>Characters who are more powerfull than you</Text>
            <ScrollView
             style={{
                 ...basic.bgStandard,
                 ...basic.height5,
                 ...basic.width100
             }}
            >
             {!strongerCharacters ? <Text>Error</Text> : strongerCharacters.map((characterInfo, i) => 
                 <Character 
                 characterInfo={characterInfo}
                 key={i}
                 />
             )}
            </ScrollView>
            <Button 
             title="Next"
             onPress={() => {
                 gameReport.resetReport();
                 props.navigation.navigate("Conversation");
             }}
            />
        </View>
    );
}

export default LevelReport;