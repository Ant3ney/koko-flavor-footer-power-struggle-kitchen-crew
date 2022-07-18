import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import mStats from "../../GameLogic/ManageStats/ManageStats";
import basic from "../../Styles/basics";
import upgradeStyle from "../../Styles/upgrade";
import upgrades from "../../GameLogic/PresetsAndTemplates/Upgrades"

var menu = "Power";

function Upgrade(props){
    const [currentUpgrades, setCurrentUpgrades] = useState(upgrades.powerUpgrades);

    useEffect(() => {
        if(currentUpgrades === upgrades.powerUpgrades){
            menu = "Power";
        }
        else if(currentUpgrades === upgrades.skillUpgrades){
            menu = "Skill";
        }
        else{
            menu = "Sanity";
        }
    }, [currentUpgrades]);

    return(
        <View
         style={{...upgradeStyle.container, ...basic.makeForground(1)}}
        >
            <Button 
             title="Exit"
             onPress={() => {
                props.setUpgrade(false);
             }}
            />
            <ScrollView
             style={upgradeStyle.scollView}
            >
                <Text
                 style={basic.textAlignCenter}
                >
                    In {menu} menu
                </Text>

                 {currentUpgrades.map((upgrade, i) => <Button 
                                                    title={upgrade.title}
                                                    onPress={upgrade.onPress}
                                                    key={i}
                                                   />)}
            </ScrollView>
            <Button 
             title="Power"
             onPress={() => {
                setCurrentUpgrades(upgrades.powerUpgrades);
             }}
            />
            <Button 
             title="Skill"
             onPress={() => {
                setCurrentUpgrades(upgrades.skillUpgrades);
             }}
            />
            <Button 
             title="Sanity"
             onPress={() => {
                setCurrentUpgrades(upgrades.sanityUpgrades);
             }}
            />
        </View>
    );
}

export default Upgrade;