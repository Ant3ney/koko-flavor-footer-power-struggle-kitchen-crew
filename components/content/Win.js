import React from "react";
import { View, Text, Button } from "react-native";
import mStats from "../../GameLogic/ManageStats/ManageStats";
import storyLogic from "../../GameLogic/StoryLogic";

function Win(props){
    return(
        <View>
            <Text>Congrats! You won!</Text>
            <Button 
             title="Start Over"
             onPress={() => {
                //props.navigation.navigate("Next Shift Select");
                mStats.setAlreadyWon(false);
                props.navigation.navigate("Loading Local");

                fetch('https://coco-game-17308.herokuapp.com/testApi/resetData')
                .then(response => response.json())
                .then((data) => {
                    props.gameLogic.GameDriver.awake(data);
                
                    //At this point this is a check to see if this is the users first time playing
                    if(storyLogic.checkForUnhandledStory()){
                        console.log("Initing story");
                        storyLogic.fillChapterQueAndChapter();
                        console.log("storyLogic.chapterQue.lengrth + " + storyLogic.getChapterQue().length);
                    }
                
                    props.navigation.navigate("Begin Conversation");
                });
             }}
            />
            <Button 
             title="Keep playing"
             onPress={() => {
                props.navigation.navigate("Next Shift Select");
             }}
            />
        </View>
    );
}

export default Win;