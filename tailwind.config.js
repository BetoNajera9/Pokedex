module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				circuit: "url('/public/background.png')",
				notch: "url('/public/notch-white.png')",
			},
		},
		fontFamily: {
			flexo: ['Flexo', 'arial', 'sans-serif'],
		},
		colors: {
			transparent: 'transparent',
			pink: { low: '#fdb9e9', DEFAULT: '#f366b9' },
			purple: { DEFAULT: '#b97fc9', high: '#7b62a3' },
			blue: { low: '#3dc7ef', DEFAULT: '#30a7d7', high: '#4592c4' },
			green: { DEFAULT: '#9bcc50', high: '#4dad5b' },
			yellow: { DEFAULT: '#eed535', high: '#a38c21' },
			orange: { DEFAULT: '#ee6b2f', high: '#d56723' },
			red: '#E3350D',
			light: { DEFAULT: '#fff', high: '#F1F1F1' },
			dark: { low: '#707070', DEFAULT: '#919191', high: '#313131' },
		},
	},
	plugins: [],
}
