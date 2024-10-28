'use client';

import React from 'react';
import styles from './notification.module.css';
import { TOAST_MESSAGES } from './const';
import { useKeydown } from '@/app/hooks/use-board';

const Notification = () => {
	const { gameStatus } = useKeydown();

	return (
		<header className={styles.container}>
			{gameStatus == 0 || gameStatus == 2 ? (
				<h1 className={styles.alert_text}>
					{gameStatus == 0 ? TOAST_MESSAGES.loss : TOAST_MESSAGES.win}
				</h1>
			) : null}
		</header>
	);
};

export default Notification;
