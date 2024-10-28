'use client';

import React from 'react';
import styles from './board.module.css';
import { useKeydown } from '@/app/hooks/use-board';
import { BOARD_HEIGHT, BOARD_WIDTH } from '@/app/utils/const';
import { getCellStyle, getCellValue } from './helpers';

export const Board = () => {
	const { guesses, error, gameStatus } = useKeydown();
	const boardCells = Array(BOARD_HEIGHT * BOARD_WIDTH).fill(0);

	return (
		<form className={styles.container}>
			<div className={styles.board_container}>
				{boardCells.map((_, idx) => {
					const cellData = getCellValue(idx, guesses);
					const row = Math.floor(idx / 5);
					const column = idx % 5;
					return (
						<div
							key={`board-cell-${idx}`}
							data-testid='board-cell'
							className={`${styles.board_cell} ${getCellStyle(
								cellData,
								column
							)} ${error.row == row ? 'animate-wobble' : ''} ${
								gameStatus == 2 && row == guesses.length - 1
									? 'animate-heartBeat'
									: ''
							}`}
						>
							<p className={styles.board_letter}>{cellData.value}</p>
						</div>
					);
				})}
			</div>
		</form>
	);
};

export default Board;
