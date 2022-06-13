export interface pokemonRef {
	name: string
	url: string
}

export interface pokemonData {
	id: number
	name: string
	type: typeData
	img: string
	height: number
	weight: number
}

export interface typeData {
	types: string[]
	weakness: string[]
}
