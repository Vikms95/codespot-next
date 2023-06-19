import { useEffect, useState } from 'react';
import { formatError } from '../utils/formatError';

export function useFetch(
	fetcher: (...fetcherArgs: string[]) => Promise<any[]>,
	initialArgs: any[] = [''],
	dependencies: any[] = ['']
) {
	const [data, setData] = useState<Record<string, unknown>[]>();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const commitFetch = async (args: string[]) => {
		setError(false);
		setLoading(true);

		try {
			const value = initialArgs.length > 1 ? initialArgs : args;
			const response = await fetcher(...value);

			setLoading(false);
			setData(response);
			return response;
		} catch (err) {
			const formattedError = formatError(err);

			setLoading(false);
			setError(formattedError);
		}
	};

	useEffect(() => {
		if (dependencies) {
			commitFetch(initialArgs);
		}
	}, [...dependencies]);

	return [
		{
			data,
			loading,
			error,
			setData,
		},
		commitFetch,
	];
}
