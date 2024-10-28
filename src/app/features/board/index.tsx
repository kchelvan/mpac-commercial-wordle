'use client';

import React, { useEffect, useRef } from 'react';
import styles from './board.module.css';
import { useBoard } from '@/app/hooks/use-board';
import { BOARD_HEIGHT, BOARD_WIDTH } from '@/app/utils/const';
import { getCellStyle, getCellValue } from './helpers';
import Notification from '../notification';

export const Board = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { guesses, error, gameStatus } = useBoard();
	const boardCells = Array(BOARD_HEIGHT * BOARD_WIDTH).fill(0);

	useEffect(() => {
		inputRef?.current?.focus();
	}, []);

	return (
		<>
			<div className={styles.container}>
				<input ref={inputRef} className={styles.hidden_input} />
				<div className={styles.board_container}>
					{boardCells.map((_, idx) => {
						const cellData = getCellValue(idx, guesses);
						const row = Math.floor(idx / 5);
						const column = idx % 5;
						return (
							<div
								key={`board-cell-${idx}`}
								data-testid='board-cell'
								onClick={() => inputRef?.current?.focus()}
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
			</div>
			<Notification gameStatus={gameStatus} />
		</>
	);
};

export default Board;
