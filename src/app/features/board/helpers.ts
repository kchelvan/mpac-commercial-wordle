import { GuessType } from '@/app/utils/types';
import styles from './board.module.css';
import { CellValueResponse } from './types';

export const getCellValue = (index: number, guesses: GuessType[]) => {
	const row = Math.floor(index / 5);
	const column = index % 5;
	const value = guesses[row]?.guess?.[column];
	const data = guesses[row];

	return { value, data };
};

export const getCellStyle = (cellData: CellValueResponse, column: number) => {
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
