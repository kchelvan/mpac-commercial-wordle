'use client';
import React from 'react';
import styles from './board.module.css';
import { useKeydown } from '@/app/hooks/useKeydown';
import { BOARD_HEIGHT, BOARD_WIDTH } from '@/app/utils/const';
import { getCellStyle, getCellValue } from './helpers';

export const Board = () => {
	const { guesses } = useKeydown();
	const boardCells = Array(BOARD_HEIGHT * BOARD_WIDTH).fill(0);

	return (
		<form className={styles.container}>
			<div className={styles.board_container}>
				{boardCells.map((_, idx) => {
					const cellData = getCellValue(idx, guesses);
					const column = idx % 5;
					return (
						<div
							key={idx}
							className={`${styles.board_cell} ${getCellStyle(
								cellData,
								column
							)}`}
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
