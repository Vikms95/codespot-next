import {
	MS_PER_DAY,
	MS_PER_HOUR,
	MS_PER_MINUTE,
	MS_PER_WEEK,
} from '@/constants';

export const getRelativeCurrentDate = (dateToCompare: string) => {
	const formatter = new Intl.RelativeTimeFormat('en');
	const diff = (new Date() as any) - Date.parse(dateToCompare);
	console.log('diff', diff);

	switch (true) {
		case diff < MS_PER_MINUTE:
			return 'just now';
		case diff < MS_PER_HOUR:
			return formatter.format(Math.ceil(-diff / MS_PER_MINUTE), 'minutes');
		case diff < MS_PER_DAY:
			return formatter.format(Math.ceil(-diff / MS_PER_HOUR), 'hours');
		case diff < MS_PER_WEEK:
			return formatter.format(Math.ceil(-diff / MS_PER_DAY), 'days');
		case diff >= MS_PER_WEEK:
			return formatter.format(Math.ceil(-diff / MS_PER_WEEK), 'weeks');
	}
};
