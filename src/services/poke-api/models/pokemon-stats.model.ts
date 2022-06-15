export interface PokemonStats {
	hp: Stats
	attack: Stats
	defense: Stats
	'special-attack': Stats
	'special-defense': Stats
	speed: Stats
}

interface Stats {
	number: number
	array: string[]
}
