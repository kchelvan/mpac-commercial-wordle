export interface GuessType {
	guess: string;
	valid?: boolean;
	score?: number[];
	isCurrent?: boolean;
}

export interface ErrorType {
	row: number | null;
	column: number | null;
}

// 0 = Game Loss
// 1 = Game In-Progress
// 2 = Game Win
export type GameStatusType = 0 | 1 | 2;
