import busyness from "../Busyness";

//Notice how the structure of this function Constuctor is diffrent than the 
//the Person/Character/Player function constuctors. This is because this 
//constructor fixes the issues some of the strucural issues found in the 
//previous constructors.

function Environment(){
    this.time = null;
    this.busyness = busyness;
    this.lighting = null;

    this.ticTime = () => {
        var minutes = this.time % 100;
        var hours = Math.floor(this.time / 100);
        minutes += 10;
        if(minutes > 59){
            hours += 1;
            minutes = 0;
            if(hours > 12){
                hours = 1;
            }
        }
        var newTime = (hours * 100) + minutes;
        this.time = newTime;
    }
}

export default Environment;