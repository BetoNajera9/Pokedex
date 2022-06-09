module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			flexo: ['Flexo', 'arial', 'sans-serif'],
		},
		colors: {
			transparent: 'transparent',
			purple: '#b97fc9',
			blue: { DEFAULT: '#30a7d7', dark: '#4592c4' },
			green: { DEFAULT: '#9bcc50', dark: '#4dad5b' },
			yellow: '#e6bc2f',
			orange: '#ee6b2f',
			red: '#E3350D',
			light: { DEFAULT: '#fff', dark: '#F1F1F1' },
			dark: { DEFAULT: '#313131', light: '#919191' },
		},
	},
	plugins: [],
}
