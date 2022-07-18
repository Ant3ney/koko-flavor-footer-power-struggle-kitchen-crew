var utilities = {
    getRandomIndexFromArray: (arr) => {
        var ret = (Math.round(Math.random() * arr.length) - 1);
        while(ret < 0){
            ret = (Math.round(Math.random() * arr.length) - 1);
        }
        return ret;
    },
    getConversationTypeFromProps: (props) => {
        let route = props.route;
        if(!route){
            console.error('Game menu nav renderd without setting nav paramaters');
            return 'error';
        }
        let params = route.params;
        if(!params){
            console.error('Game menu nav renderd without setting nav paramaters');
            return 'error';
        }
        if(params.type === 'beginning'){
            return 'beginning';
        }
        return 'error';
    }
}

utilities.refactor = {
    
}

export default utilities;