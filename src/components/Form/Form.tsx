import './Form.css';
interface Props {
	handleTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const Form = ({ handleClick, handleTextChange }: Props) => {
	return (
		<>
			<form>
				<textarea rows={3} onChange={event => handleTextChange(event)} />
				<button onClick={event => handleClick(event)}>Generuj trening</button>
			</form>
		</>
	);
};
