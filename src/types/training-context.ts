import { Training } from './exercise';

export interface TrainingContextProps {
	training: Training | null;
	setTraining: (training: Training | null) => void;
	isLoading: boolean;
	setIsLoading: (loading: boolean) => void;
}
