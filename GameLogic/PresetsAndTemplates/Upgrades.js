import mStats from "../ManageStats/ManageStats";

function canAndWillBuy(cost){
    if(mStats.getPSkillPoints() - cost >= 0){
        mStats.subtractPSkillPoints(cost);
        return true;
    }
    return false;
}

var upgrades = {
    powerUpgrades: [
        {
            title: "Increae influence",
            cost: 20,
            description: "Give your self a static power boost",
            onPress: () => {
                if(canAndWillBuy(20)){
                    mStats.setPPower(mStats.getPPower() + 20);
                }
            }
        },
        {
            title: "Colaberate",
            cost: 20,
            description: "Give you and your shift a large static boost. Managers are not included",
            onPress: () => {
                if(canAndWillBuy(20)){
                    mStats.setPPower(mStats.getPPower() + 60)
                }
            }
        },
        {
            title: "Conplain on work chat",
            cost: 100,
            description: "Let the entire team know that they have done wrong and increase your power greatly",
            onPress: () => {
                if(canAndWillBuy(100)){
                    mStats.setPPower(mStats.getPPower() + 150)
                }
            }
        },
        {
            title: "Agresive lead",
            cost: 50,
            description: "Let your crew know your the boss. Boots your power and reduces overall shif power",
            onPress: () => {
                if(canAndWillBuy(50)){
                    mStats.setPPower(mStats.getPPower() + 20)
                }
            }
        },
        {
            title: "Asert self",
            cost: 50,
            description: "Let them know you mean bussiness. A random crew member looses lots of power and you gain power.",
            onPress: () => {
                if(canAndWillBuy(50)){
                    mStats.setPPower(mStats.getPPower() + 20);
                }
            }
        },
        {
            title: "Converse with uppermanigment",
            cost: 200,
            description: "Engage in a casual conversation with uppermanagment to gain lots of power in the company",
            onPress: () => {
                if(canAndWillBuy(200)){
                    mStats.setPPower(mStats.getPPower() + 400);
                }
            }
        },
    ],
    skillUpgrades: [
        {
            title: "Asert self"
        },
        {
            title: "Agresive lead"
        },
        {
            title: "Influence"
        },
        {
            title: "Show off tallent"
        },
        {
            title: "Colaberate"
        },
        {
            title: "Increae influence"
        },
    ],
    sanityUpgrades: [
        {
            title: "Show off tallent"
        },
        {
            title: "Increae influence"
        },
        {
            title: "Agresive lead"
        },
        {
            title: "Asert self"
        },
        {
            title: "Influence"
        },
        {
            title: "Colaberate"
        },
    ]
}

export default upgrades;