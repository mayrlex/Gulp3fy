const throttle = (callback, delay = 250) => {
	let isThrottled = false;

	return function (...args) {
		if (isThrottled) return;

		callback.apply(this, args);
		isThrottled = true;

		setTimeout(() => {
			isThrottled = false;
		}, delay);
	};
};

export default throttle;
