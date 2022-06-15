import { PokemonType } from './pokemon-type.model'
import { PokemonStats } from './pokemon-stats.model'

export interface Pokemon {
	id: number
	name: string
	type: PokemonType
	img: string
	height: number
	weight: number
	description: string
	evolution_chain: string
	category: string
	ability: string
	stats: PokemonStats
}
