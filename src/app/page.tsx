import Board from './features/board';
import Header from './features/header';

export default function Home() {
	return (
		<div className='w-screen min-h-screen justify-center items-center flex flex-col'>
			<Header />
			<Board />
		</div>
	);
}
