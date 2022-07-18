import React from "react";
import { View, Text, Button } from "react-native";

function Lose(props){
    var mStats = props.gameLogic.manageStats;
    var storyLogic = props.gameLogic.storyLogic;

    return(
        <View>
            <Text>You lost</Text>

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
                    props.gameLogic.staticConversation.procBegining(true);
                    if(storyLogic.checkForUnhandledStory()){
                        console.log("Initing story");
                        storyLogic.fillChapterQueAndChapter();
                    }
                
                    props.navigation.navigate("Begin Conversation");
                });
             }}
            />
        </View>
    );
}

export default Lose;