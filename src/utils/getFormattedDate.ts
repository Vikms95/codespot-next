import { MONTH_NAMES } from '@/constants';

/**
 * Return date as Month, Day, Year. If no parameter is passed,
 * formats the current date.
 */
export const getFormattedDate = (date: Date = new Date()) => {
	return (
		MONTH_NAMES[date.getMonth()] +
		' ' +
		date.getDate().toString() +
		', ' +
		date.getFullYear()
	);
};
