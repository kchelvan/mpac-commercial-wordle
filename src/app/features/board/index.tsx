'use client';
import React from 'react';
import styles from './board.module.css';
import { BOARD_HEIGHT, BOARD_WIDTH } from '@/app/utils/const';
import { useKeydown } from '@/app/hooks/useKeydown';

const Board = () => {
	const { userInput } = useKeydown();
	const boardCells = Array(BOARD_HEIGHT * BOARD_WIDTH).fill(0);

	return (
		<form className={styles.container}>
			<div className={styles.board_container}>
				{boardCells.map((_, idx) => (
					<div
						key={idx}
						className={`${styles.board_cell} ${
							userInput[idx]
								? styles.board_active_cell
								: styles.board_inactive_cell
						}`}
					>
						<p className={styles.board_letter}>{userInput[idx]}</p>
					</div>
				))}
			</div>
		</form>
	);
};

export default Board;
