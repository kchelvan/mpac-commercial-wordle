import { useEffect, useState } from 'react';
import { BOARD_HEIGHT } from '../utils/const';
import { ErrorType, GameStatusType, GuessType } from '../utils/types';

export function useKeydown() {
	const [gameStatus, setGameStatus] = useState<GameStatusType>(1);
	const [guesses, setGuesses] = useState<GuessType[]>([]);
	const [error, setError] = useState<ErrorType>({
		row: null,
		column: null,
	});

	const countCorrectPosition = (score: number[]) => {
		return score.filter((x) => x == 2).length;
	};

	const validate = async (guess: string) => {
		setError({
			row: null,
			column: null,
		});
		const response = await fetch(
			'https://wordle-apis.vercel.app/api/validate',
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					guess: guess,
				}),
			}
		);

		const result = await response.json();

		setGuesses((_guesses) => {
			const prevGuesses = _guesses.slice(0, -1);
			if (result.is_valid_word) {
				if (countCorrectPosition(result.score) == 5) {
					return [
						...prevGuesses,
						{ guess: guess, valid: true, score: result.score },
					];
				} else {
					return [
						...prevGuesses,
						{
							guess: guess,
							valid: false,
							score: result.score,
							isCurrent: false,
						},
					];
				}
			} else {
				setError({
					row: prevGuesses?.length || 0,
					column: null,
				});
				return _guesses;
			}
		});
	};

	const keyDownHandler = (e: KeyboardEvent) => {
		setGuesses((_guesses) => {
			const prevGuesses = _guesses.slice(0, -1);
			const lastGuess = _guesses[_guesses.length - 1] || {};
			const gameComplete =
				lastGuess.score?.filter((value) => value == 2).length == 5 ||
				_guesses.length > BOARD_HEIGHT;

			if (!gameComplete) {
				if (e.code.includes('Key')) {
					if (!lastGuess.isCurrent) {
						return [..._guesses, { guess: e.key, isCurrent: true }];
					} else if (lastGuess.isCurrent && lastGuess.guess?.length < 5) {
						return [
							...prevGuesses,
							{ guess: lastGuess.guess + e.key, isCurrent: true },
						];
					} else {
						return _guesses;
					}
				}
				if (e.code == 'Enter' && !lastGuess.score) {
					validate(lastGuess.guess);
				}
				if (e.code == 'Backspace') {
					return [
						...prevGuesses,
						{ guess: lastGuess.guess.slice(0, -1), isCurrent: true },
					];
				}
			}
			return _guesses;
		});
	};

	useEffect(() => {
		const lastGuess = [...guesses].pop();
		const wordleSolved =
			lastGuess?.score?.filter((value) => value == 2).length == 5;
		const gameComplete = wordleSolved || guesses.length == BOARD_HEIGHT;

		if (!gameComplete) {
			setGameStatus(1);
		} else if (wordleSolved) {
			setGameStatus(2);
		} else if (!lastGuess?.isCurrent) {
			setGameStatus(0);
		}
	}, [guesses]);

	useEffect(() => {
		document.addEventListener('keydown', keyDownHandler);

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { guesses, gameStatus, error, setError };
}
