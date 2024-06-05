// App.tsx
import { useState } from 'react';
import './App.css';
import { Form } from '../components/Form/Form';
import { Training } from '../types/exercise';
import { TrainingTable } from '../components/TrainingTable/TrainingTable';

export const App = () => {
	const [text, setText] = useState('');
	const [training, setTraining] = useState<Training | null>(null);

	const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
	};

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		console.log('PROMPT: ', text);
		(async () => {
			const res = await fetch('http://localhost:3001/trainings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt: text }),
			});
			setTraining(await res.json());
		})();
	};

	return (
		<>
			<div className='container'>
				<Form handleClick={handleClick} handleTextChange={handleTextChange} />
				{training && <TrainingTable training={training} />}
			</div>
		</>
	);
};
