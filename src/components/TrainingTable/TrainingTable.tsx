import { Exercise, Training } from '../../types/exercise';
import './TrainingTable.css';

interface Props {
	training: Training;
}

export const TrainingTable = ({ training }: Props) => {
	return (
		<>
			<table>
				<thead>
					<tr>
						<th colSpan={6}>Trening</th>
					</tr>
					<tr>
						<th>nr ćwiczenia</th>
						<th>nazwa</th>
						<th>ilość powtórzeń w rundzie</th>
						<th>ilość serii</th>
						<th>czas trwania serii</th>
					</tr>
				</thead>
				<tbody>
					{training?.map(
						(
							{
								name,
								repetitionsPerRound,
								rounds,
								singleRoundDuration,
							}: Exercise,
							index
						) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{name}</td>
								<td>{repetitionsPerRound}</td>
								<td>{rounds}</td>
								<td>{singleRoundDuration}</td>
							</tr>
						)
					)}
				</tbody>
			</table>
		</>
	);
};
