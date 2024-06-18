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
		if (!res.ok) {
			const errMsg =
				`${res.status}`[0] === '4'
					? 'Niepoprawne dane wejściowe'
					: 'Błąd serwera';
			throw new Error(errMsg);
		}
		const training: Training = await res.json();
		return {
			result: training,
			error: null,
		};
	} catch (err) {
		const { message } = err as Error;
		const errMsg =
			err instanceof TypeError && message === 'Failed to fetch'
				? 'Serwer nie odpowiada. Przepraszamy :('
				: message;
		console.error('Error fetching data:', errMsg, err);
		return {
			error: new Error(errMsg),
			result: null,
		};
	}
};
