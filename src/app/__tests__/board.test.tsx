import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Board from '../features/board';
import { BOARD_HEIGHT, BOARD_WIDTH } from '../utils/const';

it('should render a Board component', () => {
	render(<Board />);
});

it('should render a 5x6 Wordle Board', () => {
	render(<Board />);
	const boardCells = screen.getAllByTestId('board-cell');
	expect(boardCells).toHaveLength(BOARD_HEIGHT * BOARD_WIDTH);
});
