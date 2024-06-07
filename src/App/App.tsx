// App.tsx
import { useEffect, useState } from 'react';
import './App.css';
import { Form } from '../components/Form/Form';
import { Training } from '../types/exercise';
import { TrainingTable } from '../components/TrainingTable/TrainingTable';
import { Loader } from '../components/Loader/Loader';
import { post } from '../utils/post';
import { ErrorBox } from '../components/ErrorBox/ErrorBox';

export const App = () => {
	const [text, setText] = useState('');
	const [training, setTraining] = useState<Training | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
	};

	useEffect(() => {
		console.log('isLoading', isLoading);
		console.log('isError', isError);
	}, [isLoading, isError]);

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		(async () => {
			setIsLoading(true);
			const { error, result: training } = await post({ prompt: text });
			setIsLoading(false);
			if (error) {
				setIsError(true);
				setError(error);
			} else setTraining(training);
		})();
	};

	let elToReturn = null;

	if (isLoading) elToReturn = <Loader />;
	else if (isError) {
		elToReturn = <ErrorBox message={error?.message ?? 'Nieznany błąd'} />;
	} else if (!training)
		elToReturn = (
			<Form handleClick={handleClick} handleTextChange={handleTextChange} />
		);
	else elToReturn = <TrainingTable training={training} />;
	return (
		<>
			<div className='container'>
				{/* {isLoading ? (
					<Loader />
				) : (
					!training && (
						<Form
							handleClick={handleClick}
							handleTextChange={handleTextChange}
						/>
					)
				)}
				{training && <TrainingTable training={training} />} */}
				{elToReturn}
			</div>
		</>
	);
};
