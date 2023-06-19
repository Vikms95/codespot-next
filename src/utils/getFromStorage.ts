export const getFromStorage = (key: string) => {
	const storageData = localStorage.getItem(key);

	if (storageData) return JSON.parse(storageData);
};
