import { useEffect, useState } from 'react';
import { BOARD_HEIGHT } from '../utils/const';
export interface Guess {
	guess: string;
	valid?: boolean;
	score?: number[];
	isCurrent?: boolean;
}

export function useKeydown() {
	const [guesses, setGuesses] = useState<Guess[]>([]);

	const countCorrectPosition = (score: number[]) => {
		return score.filter((x) => x == 2).length;
	};

	const validate = async (guess: string) => {
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

		if (result.is_valid_word) {
			setGuesses((_guesses) => {
				const prevGuesses = _guesses.slice(0, -1);
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
			});
		}
	};

	/* 
	
	0 - not in word
  1 - wrong position
	2 - right position

	Word is Blaze
	*/

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
		document.addEventListener('keydown', keyDownHandler);

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { guesses };
}
