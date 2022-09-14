export { default as localStorage } from './localStorage';
var utilities = {
	getRandomIndexFromArray: (arr: any) => {
		var ret = Math.round(Math.random() * arr.length) - 1;
		while (ret < 0) {
			ret = Math.round(Math.random() * arr.length) - 1;
		}
		return ret;
	},
	getConversationTypeFromProps: (props: any) => {
		return props?.route?.params?.type ? props.route.params.type : 'error';
	},
};

export default utilities;
