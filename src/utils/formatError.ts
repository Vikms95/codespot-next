export const formatError = (err: Error) => {
	return err?.message.toString().split(':')[1].trim();
};
