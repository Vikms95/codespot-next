export const formatError = (err: Error) => {
	return err.toString().split(':')[1].trim();
};
