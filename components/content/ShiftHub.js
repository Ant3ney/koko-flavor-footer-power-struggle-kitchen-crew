import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import basic from "../../Styles/basics";
import presets from "../../GameLogic/PresetsAndTemplates/ShiftPresets";
import shiftHubStyle from "../../Styles/shiftHub";
import shiftHubLogic from "../../GameLogic/ShiftHub";
import mStats from "../../GameLogic/ManageStats/ManageStats";
import ScheduleScreen from "./Schedule/Screen";
import { useIsFocused } from "@react-navigation/native";

var focusSchedule = null;

function ShiftHub(props){
    const [currentDay, setCurrentDay] = useState(mStats.getCurrentDay());
    const [schedule, setSchedual] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if(mStats.determinLoseCondition()){
            handleLose(props);
        }
        mStats.onDayChange(() => {
            setCurrentDay(mStats.getCurrentDay());
        }, "current day");
    }, [isFocused]);

    return(
        <View
         style={{...shiftHubStyle.container, ...basic.gridContainer}}
        >
        {schedule ? <ScheduleScreen 
                     schedule = {focusSchedule}
                     exitSchedual = {exitSchedual}
                     day={mStats.getCurrentDay()}
                    /> : <View></View>}
            <Text>Select your next shift</Text>
            <Text>Current Power: {props.gameLogic.manageStats.getPPower()}</Text>
            <Text>Current Sanity: {props.gameLogic.manageStats.getPSanity()}</Text>
            <Text>Current Day: {currentDay.toString().slice(0, 1).toUpperCase() + currentDay.toString().slice(1)}</Text>
            <View
             style={basic.gridRow}
            >
                <View
                 style={basic.gridColGeneric}
                >
                    <Text>Monday</Text>
                    <Button 
                     title="Day Shift"
                     onPress={() => {
                        props.gameLogic.GameDriver.start(presets("monday").day);
                        shiftHubLogic.manageDaysUpTo(presets("monday").day);
                        props.navigation.navigate("Shift");
                     }}
                     disabled={shiftHubLogic.getDisabledOf("monday")}
                    />
                    <Button 
                     title="See schedule"
                     onPress={() => {
                         focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets("monday").day);
                         setSchedual(true);
                     }}
                    />
                    <Button 
                     title="Night Shift"
                     onPress={() =>{
                        props.gameLogic.GameDriver.start(presets("monday").night);
                        shiftHubLogic.manageDaysUpTo(presets("monday").night);
                        props.navigation.navigate("Shift");
                     }}
                     disabled={shiftHubLogic.getDisabledOf("monday")}
                    />
                    <Button 
                     title="See schedule"
                     onPress={() => {
                         focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets("monday").night);
                         setSchedual(true);
                     }}
                    />
                </View>
                <View
                 style={basic.gridColGeneric}
                >
                    <Text>Tuesday</Text>
                    <Button 
                     title="Day Shift"
                     onPress={() => {
                        props.gameLogic.GameDriver.start(presets("tuesday").day);
                        shiftHubLogic.manageDaysUpTo(presets("tuesday").day);
                        props.navigation.navigate("Shift");
                     }}
                     disabled={shiftHubLogic.getDisabledOf("tuesday")}
                    />
                    <Button 
                     title="See schedule"
                     onPress={() => {
                         focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets("tuesday").day);
                         setSchedual(true);
                     }}
                    />
                    <Button 
                     title="Night Shift"
                     onPress={() => {
                        props.gameLogic.GameDriver.start(presets("tuesday").night);
                        shiftHubLogic.manageDaysUpTo(presets("tuesday").night);
                        props.navigation.navigate("Shift");
                     }}
                     disabled={shiftHubLogic.getDisabledOf("tuesday")}
                    />
                    <Button 
                     title="See schedule"
                     onPress={() => {
                         focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets("tuesday").night);
                         setSchedual(true);
                     }}
                    />
                </View>
            </View>
            <View
             style={basic.gridRow}
            >
                <View
                 style={basic.gridColGeneric}
                >
                    <Text>Wednesday</Text>
                    <Button 
                     title="Day Shift"
                     onPress={() => {
                        props.gameLogic.GameDriver.start(presets("wednesday").day);
                        shiftHubLogic.manageDaysUpTo(presets("wednesday").day);
                        props.navigation.navigate("Shift");
                     }}
                     disabled={shiftHubLogic.getDisabledOf("wednesday")}
                    />
                    <Button 
                     title="See schedule"
                     onPress={() => {
                         focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets("wednesday").day);
                         setSchedual(true);
                     }}
                    />
                    <Button 
                     title="Night Shift"
                     onPress={() => {
                        props.gameLogic.GameDriver.start(presets("wednesday").night);
                        shiftHubLogic.manageDaysUpTo(presets("wednesday").night);
                        props.navigation.navigate("Shift");
                     }}
                     disabled={shiftHubLogic.getDisabledOf("wednesday")}
                    />
                    <Button 
                     title="See schedule"
                     onPress={() => {
                         focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets("wednesday").night);
                         setSchedual(true);
                     }}
                    />
                </View>
                <View
                 style={basic.gridColGeneric}
                >
                    <Text>Thursday</Text>
                    <Button 
                     title="Day Shift"
                     onPress={() => {
                        props.gameLogic.GameDriver.start(presets("thursday").day);
                        shiftHubLogic.manageDaysUpTo(presets("thursday").day);
                        props.navigation.navigate("Shift");
                     }}
                     disabled={shiftHubLogic.getDisabledOf("thursday")}
                    />
                    <Button 
                     title="See schedule"
                     onPress={() => {
                         focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets("thursday").day);
                         setSchedual(true);
                     }}
                    />
                    <Button 
                     title="Night Shift"
                     onPress={() => {
                        props.gameLogic.GameDriver.start(presets("thursday").night);
                        shiftHubLogic.manageDaysUpTo(presets("thursday").night);
                        props.navigation.navigate("Shift");
                     }}
                     disabled={shiftHubLogic.getDisabledOf("thursday")}
                    />
                    <Button 
                     title="See schedule"
                     onPress={() => {
                         focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets("thursday").night);
                         setSchedual(true);
                     }}
                    />
                </View>
            </View>
            <View
             style={basic.gridRow}
            >
                <View
                 style={basic.gridColGeneric}
                >
                    <Text>Friday</Text>
                    <Button 
                     title="Day Shift"
                     onPress={() => {
                        props.gameLogic.GameDriver.start(presets("friday").day);
                        shiftHubLogic.manageDaysUpTo(presets("friday").day);
                        props.navigation.navigate("Shift");
                     }}
                     disabled={shiftHubLogic.getDisabledOf("friday")}
                    />
                    <Button 
                     title="See schedule"
                     onPress={() => {
                         focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets("friday").day);
                         setSchedual(true);
                     }}
                    />
                    <Button 
                     title="Night Shift"
                     onPress={() => {
                        props.gameLogic.GameDriver.start(presets("friday").night);
                        shiftHubLogic.manageDaysUpTo(presets("friday").night);
                        props.navigation.navigate("Shift");
                     }}
                     disabled={shiftHubLogic.getDisabledOf("friday")}
                    />
                    <Button 
                     title="See schedule"
                     onPress={() => {
                         focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets("friday").night);
                         setSchedual(true);
                     }}
                    />
                </View>
                <View
                 style={basic.gridColGeneric}
                >
                    <Text>Saturday</Text>
                    <Button 
                     title="Day Shift"
                     onPress={() => {
                        props.gameLogic.GameDriver.start(presets("saturday").day);
                        shiftHubLogic.manageDaysUpTo(presets("saturday").day);
                        props.navigation.navigate("Shift");
                     }}
                     disabled={shiftHubLogic.getDisabledOf("saturday")}
                    />
                    <Button 
                     title="See schedule"
                     onPress={() => {
                         focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets("saturday").day);
                         setSchedual(true);
                     }}
                    />
                    <Button 
                     title="Night Shift"
                     onPress={() => {
                        props.gameLogic.GameDriver.start(presets("saturday").night);
                        shiftHubLogic.manageDaysUpTo(presets("saturday").night);
                        props.navigation.navigate("Shift");
                     }}
                     disabled={shiftHubLogic.getDisabledOf("saturday")}
                    />
                    <Button 
                     title="See schedule"
                     onPress={() => {
                         focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets("saturday").night);
                         setSchedual(true);
                     }}
                    />
                </View>
            </View>
            <View
             style={basic.gridRow}
            >
                <View
                 style={basic.gridColGeneric}
                >
                    <Text>Sunday</Text>
                    <Button 
                     title="Day Shift"
                     onPress={() => {
                        props.gameLogic.GameDriver.start(presets("sunday").day);
                        shiftHubLogic.manageDaysUpTo(presets("sunday").day);
                        props.navigation.navigate("Shift");
                     }}
                     disabled={shiftHubLogic.getDisabledOf("sunday")}
                    />
                    <Button 
                     title="See schedule"
                     onPress={() => {
                         focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets("sunday").day);
                         setSchedual(true);
                     }}
                    />
                    <Button 
                     title="Night Shift"
                     onPress={() => {
                        props.gameLogic.GameDriver.start(presets("sunday").night);
                        shiftHubLogic.manageDaysUpTo(presets("sunday").night);
                        props.navigation.navigate("Shift");
                     }}
                     disabled={shiftHubLogic.getDisabledOf("sunday")}
                    />
                    <Button 
                     title="See schedule"
                     onPress={() => {
                         focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets("sunday").night);
                         setSchedual(true);
                     }}
                    />
                </View>
                <View>
                    <Button 
                     title="Next Week"
                     onPress={() => {
                        //Be very aware that this code is scafolting and is very subject to change

                        //Alow character to progress on any free day in the week
                        shiftHubLogic.manageDaysUpTo(presets("sunday").day, {aplyWholeDay: true, resetButton: true});
                        shiftHubLogic.freeUpAllDays();
                        props.navigation.navigate("Loading Local");
                        mStats.setPSanity(30);

                        fetch('https://coco-game-17308.herokuapp.com/testApi/schedule')
                        .then(response => response.json())
                        .then((structure) => {
                            mStats.setSchedualFromShiftStructure(structure);
                            //Player may have lost by pressing next week 
                            if(mStats.determinLoseCondition()){
                                handleLose(props);
                            }
                            else{
                                props.navigation.navigate("Next Shift Select");
                            }
                          });
                     }}
                    />
                    <Button 
                     title="Reset Data"
                     onPress={() => {
                        mStats.resetData(props.gameLogic.GameDriver);
                     }}
                    />
                </View>
            </View>
        </View>
    );
    function exitSchedual(){
        setSchedual(false);
    }
}

function handleLose(props){
    props.gameLogic.staticConversation.procLose(true);
    props.navigation.navigate("Conversation");
}

export default ShiftHub;