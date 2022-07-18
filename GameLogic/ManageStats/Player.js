import React, { useState } from "react";
import Character from "./Characters";

function Player(){
    //Define player spacific atributes here
    Character.call(this);
    this.energy = null;
    this.getEnergy = () => {
        return this.energy;
    }
    this.setEnergy = (energy) => {
        this.energy = energy;
    }
};

export default Player;