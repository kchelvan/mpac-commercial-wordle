import styles from './board.module.css';
import { Guess } from '@/app/hooks/useKeydown';

interface cellValueResponse {
	value: string;
	data: Guess;
}

export const getCellValue = (index: number, guesses: Guess[]) => {
	const row = Math.floor(index / 5);
	const column = index % 5;
	const value = guesses[row]?.guess?.[column];
	const data = guesses[row];

	return { value, data };
};

export const getCellStyle = (cellData: cellValueResponse, column: number) => {
	const score = cellData?.data?.score;
	const value = cellData?.value;

	if (score) {
		switch (score[column]) {
			case 0:
				return styles.cell_incorrect_letter;
			case 1:
				return styles.cell_correct_letter;
			case 2:
				return styles.cell_correct_position;
		}
	} else if (value) {
		return styles.board_active_cell;
	}
	return styles.board_inactive_cell;
};
