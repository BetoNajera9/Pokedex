import axios, { AxiosInstance } from 'axios'
import { Pokemon } from './models'
import { useStore } from '../../store'
import { ActionTypes } from '../../store/actions'

export default class PokeApi {
	private client: AxiosInstance

	constructor() {
		this.client = axios.create({
			headers: {},
		})
	}

	async getPokemons(url: string) {
		const { data: pokemonsList } = await this.client.get(url)

		const store = useStore()
		store.dispatch(ActionTypes.SetNextUrl, pokemonsList.next)

		const pokeData: Pokemon[] = await Promise.all(
			pokemonsList.results.map((element: any) => {
				return this.getPokemon(element.url)
			})
		)
		return pokeData
	}

	private async getPokemon(url: string) {
		const types: string[] = []
		const weakness: string[] = []

		const { data: pokemonsData } = await this.client.get(url)

		await Promise.all(
			pokemonsData.types.map(async (element: any) => {
				const dataType = await this.getTypes(element.type.url)
				types.push(element.type.name)

				dataType.forEach((element: any) => {
					if (weakness.indexOf(element.name) === -1) weakness.push(element.name)
				})
			})
		)

		return {
			id: pokemonsData.id,
			name: pokemonsData.name,
			type: { types, weakness },
			img: pokemonsData.sprites.other['official-artwork'].front_default,
			height: pokemonsData.height,
			weight: pokemonsData.weight,
		}
	}

	private async getTypes(url: string) {
		const { data: typesData } = await this.client.get(url)

		return typesData.damage_relations.double_damage_from
	}
}
