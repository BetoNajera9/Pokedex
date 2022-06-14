import { PokemonType } from './pokemon-type.model'

export interface Pokemon {
	id: number
	name: string
	type: PokemonType
	img: string
	height: number
	weight: number
}
