export interface Exercise {
	name: string;
	repetitionsPerRound: number;
	rounds: number;
	singleRoundDuration: number;
}

export type Training = Exercise[];
