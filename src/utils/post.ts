import { Training } from '../types/exercise';

interface SuccessResult {
	error: null;
	result: Training;
}

interface FailureResult {
	error: Error;
	result: null;
}

type FetchResult = SuccessResult | FailureResult;

interface RequestBody {
	prompt: string;
}

export const post = async (body: RequestBody): Promise<FetchResult> => {
	try {
		const res = await fetch(`http://localhost:3001/trainings`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		if (!res.ok) throw new Error('Failed to fetch');
		const training: Training = await res.json();
		return {
			result: training,
			error: null,
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			error: error instanceof Error ? error : new Error(String(error)),
			result: null,
		};
	}
};
