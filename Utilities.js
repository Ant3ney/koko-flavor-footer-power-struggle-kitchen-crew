var utilities = {
	getRandomIndexFromArray: arr => {
		var ret = Math.round(Math.random() * arr.length) - 1;
		while (ret < 0) {
			ret = Math.round(Math.random() * arr.length) - 1;
		}
		return ret;
	},
	getConversationTypeFromProps: props => {
		return props?.route?.params?.type ? props.route.params.type : 'error';
	},
};

utilities.refactor = {};

export default utilities;
