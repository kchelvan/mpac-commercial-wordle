import React from 'react';
import styles from './header.module.css';

const Header = () => {
	return (
		<header className={styles.container}>
			<h1 className={styles.header_text}>Wordle 2.0</h1>
		</header>
	);
};

export default Header;
