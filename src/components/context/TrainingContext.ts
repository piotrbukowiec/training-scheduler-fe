import { createContext } from 'react';
import { TrainingContextProps } from '../../types/training-context';

export const TrainingContext = createContext<TrainingContextProps | null>(null);
