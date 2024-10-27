import { useEffect, useState } from 'react';

export function useKeydown() {
	const [userInput, setUserInput] = useState<string>('');
	const clearUserInput = () => {
		setUserInput('');
	};

	useEffect(() => {
		const keyDownHandler = (e: any) => {
			if (e.code.includes('Key')) {
				setUserInput(`${userInput}` + e.key);
			}
		};
		document.addEventListener('keydown', keyDownHandler);

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		};
	}, []);

	return { userInput, clearUserInput };
}
