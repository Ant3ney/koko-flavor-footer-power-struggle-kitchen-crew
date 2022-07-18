import Data from "../Data";


var handleData = {};

handleData.addEmployeeToKitchen = (character) => {
    Data.kitchen.push(character);
}
handleData.removeCharacterByName = (name) => {
    for(var i = 0; i < Data.kitchen.length; i++){
        if(Data.kitchen[i].getName() === name){
            Data.kitchen.splice(i, 1);
        }
    }
}