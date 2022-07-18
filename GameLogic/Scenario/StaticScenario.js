var StaticScenario = {
    currentTime: null,
    prompt: "This is a scenario",
    onPress: null,
    onTic: null,
    onTimeout: null,
    currentScenario: null,

    handleOnPress: () => {
        if(StaticScenario.onPress){
            StaticScenario.onPress();
        }
    },
    handleOnTimeOut: () => {
        if(StaticScenario.onTimeout){
            StaticScenario.onTimeout();
        }
    }
}

export default StaticScenario;