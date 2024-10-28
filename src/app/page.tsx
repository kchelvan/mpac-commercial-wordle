import Board from './features/board';
import Header from './features/header';

export default function Home() {
	return (
		<div className='w-dvw min-h-dvh justify-center items-center flex flex-col'>
			<Header />
			<Board />
		</div>
	);
}
