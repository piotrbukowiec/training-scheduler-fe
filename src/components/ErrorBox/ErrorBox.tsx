import './ErrorBox.css';
interface Props {
	message: string;
}
export const ErrorBox = ({ message }: Props) => {
	return (
		<>
			<div className='message-container'>
				<p>{message}</p>
			</div>
		</>
	);
};
