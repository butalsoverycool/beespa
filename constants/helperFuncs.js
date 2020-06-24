export const clone = (obj, keyName) => {
	// if level bottom or key is 'ref' return val
	if (obj === null || typeof obj !== 'object' || keyName === 'ref') {
		return obj;
	}

	const copy = obj.constructor();

	for (var key in obj) {
		copy[key] = clone(obj[key], key);
	}
	return copy;
};
