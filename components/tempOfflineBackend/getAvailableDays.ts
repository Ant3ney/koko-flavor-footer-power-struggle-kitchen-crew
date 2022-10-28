var availableDays = {
	monday: {
		day: true,
		night: true,
	},
	tuesday: {
		day: true,
		night: true,
	},
	wednesday: {
		day: true,
		night: true,
	},
	thursday: {
		day: true,
		night: true,
	},
	friday: {
		day: true,
		night: true,
	},
	saturday: {
		day: true,
		night: true,
	},
	sunday: {
		day: true,
		night: true,
	},
};

export default () => {
	//Ensures that an object with all days available will be returned when called.
	return (() => {
		const newAvailableDays: any = {};
		for (let day in availableDays) {
			newAvailableDays[day] = {
				day: true,
				night: true,
			};
		}
		return newAvailableDays;
	})();
};
