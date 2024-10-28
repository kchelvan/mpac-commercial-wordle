import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			keyframes: {
				heartBeat: {
					'0%': { transform: 'scale(1);' },
					'14%': { transform: 'scale(1.3);' },
					'28%': { transform: 'scale(1);' },
					'42%': { transform: 'scale(1.3);' },
					'70%': { transform: 'scale(1);' },
				},
				wobble: {
					from: {
						transform: 'translate3d(0, 0, 0)',
					},
					'15%': {
						transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)',
					},

					'30%': {
						transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)',
					},

					'45%': {
						transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)',
					},

					'60%': {
						transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)',
					},

					'75%': {
						transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)',
					},
					to: {
						transform: 'translate3d(0, 0, 0)',
					},
				},
			},
			animation: {
				wobble: 'wobble 0.5s',
				heartBeat: 'heartBeat 5s',
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
		},
	},
	plugins: [],
};
export default config;
