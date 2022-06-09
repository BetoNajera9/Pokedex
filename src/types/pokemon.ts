export interface pokemonRef {
	name: string
	url: string
}

export interface pokemonData {
	id: number
	type: typeData
	img: string
	height: number
	weight: number
}

export interface typeData {
	types: string[]
	weakness: string[]
}

export interface pokemonsData {
	[pokemons: string]: pokemonData
}
