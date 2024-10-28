import { expect, it } from 'vitest';
import styles from '../features/board/board.module.css';
import { getCellStyle, getCellValue } from '../features/board/helpers';

it('should return incorrect letter styles', () => {
	const mockCellData = {
		value: 'COURT',
		data: {
			guess: 'COURT',
			valid: false,
			score: [1, 0, 0, 2, 1],
		},
	};

	const result = getCellStyle(mockCellData, 1);
	expect(result).toEqual(styles.cell_incorrect_letter);
});

it('should return correct letter styles in wrong position', () => {
	const mockCellData = {
		value: 'COURT',
		data: {
			guess: 'COURT',
			valid: false,
			score: [1, 0, 0, 2, 1],
		},
	};

	const result = getCellStyle(mockCellData, 0);
	expect(result).toEqual(styles.cell_correct_letter);
});

it('should return correct letter and position style', () => {
	const mockCellData = {
		value: 'COURT',
		data: {
			guess: 'COURT',
			valid: false,
			score: [1, 0, 0, 2, 1],
		},
	};

	const result = getCellStyle(mockCellData, 3);
	expect(result).toEqual(styles.cell_correct_position);
});

it('should return the correct cell value', () => {
	const mockGuesses = [
		{
			guess: 'COURT',
			valid: false,
			score: [1, 0, 0, 2, 1],
		},
	];

	const result = getCellValue(0, mockGuesses);
	expect(result).toEqual({ value: 'C', data: mockGuesses[0] });
});

it('should return the correct first row cell value with multiple guesses', () => {
	const mockGuesses = [
		{
			guess: 'COURT',
			valid: false,
			score: [1, 0, 0, 2, 1],
		},
		{
			guess: 'COUNT',
			valid: false,
			score: [1, 0, 0, 0, 1],
		},
	];

	const result = getCellValue(4, mockGuesses);
	expect(result).toEqual({ value: 'T', data: mockGuesses[0] });
});

it('should return the correct second row cell value with multiple guesses', () => {
	const mockGuesses = [
		{
			guess: 'COURT',
			valid: false,
			score: [1, 0, 0, 2, 1],
		},
		{
			guess: 'COUNT',
			valid: false,
			score: [1, 0, 0, 0, 1],
		},
	];

	const result = getCellValue(7, mockGuesses);
	expect(result).toEqual({ value: 'U', data: mockGuesses[1] });
});
