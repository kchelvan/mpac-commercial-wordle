import { useEffect, useState } from 'react';

export function useKeydown() {
	const [userInput, setUserInput] = useState<string>('');
	const clearUserInput = () => {
		setUserInput('');
	};

	useEffect(() => {
		const keyDownHandler = (e: KeyboardEvent) => {
			if (e.code.includes('Key')) {
				setUserInput(`${userInput}` + e.key);
			}
		};
		document.addEventListener('keydown', keyDownHandler);

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { userInput, clearUserInput };
}
