const trimStrings = (obj) => {
	const newObj = {};
	for (const key in obj) {
		if (typeof obj[key] === "string") {
			newObj[key] = obj[key].trim();
		} else {
			newObj[key] = obj[key];
		}
	}
	return newObj;
};

export {trimStrings};
