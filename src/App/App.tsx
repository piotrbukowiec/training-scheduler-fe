// App.tsx
import { useEffect, useState } from 'react';
import './App.css';
import { Form } from '../components/Form/Form';
import { Training } from '../types/exercise';
import { TrainingTable } from '../components/TrainingTable/TrainingTable';
import { Loader } from '../components/Loader/Loader';

export const App = () => {
	const [text, setText] = useState('');
	const [training, setTraining] = useState<Training | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

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
			try {
				const res = await fetch('http://localhost:3001/trainings', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ prompt: text }),
				});
				const data = await res.json();
				console.log('TRAINING DATA: ', data);
				if (data) setIsLoading(false);
				setTraining(data);
			} catch (error) {
				setIsError(true);
				console.error('Error fetching data:', error);
			}
		})();
	};

	return (
		<>
			<div className='container'>
				{isLoading ? (
					<Loader />
				) : (
					!training && (
						<Form
							handleClick={handleClick}
							handleTextChange={handleTextChange}
						/>
					)
				)}
				{training && <TrainingTable training={training} />}
			</div>
		</>
	);
};
