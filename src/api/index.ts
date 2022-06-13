import axios from 'axios'
import { pokemonData } from '../types/pokemon'
import { useStore } from '../store'
import { ActionTypes } from '../store/actions'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const getPokemons = async (
	url: string = `${BASE_URL}/pokemon?limit=12&offset=0`
) => {
	const config = {
		method: 'get',
		url,
		headers: {},
	}

	const { data: pokemonsList } = await axios(config)

	const store = useStore()
	store.dispatch(ActionTypes.SetNextUrl, pokemonsList.next)

	const pokeData: pokemonData[] = await Promise.all(
		pokemonsList.results.map((element: any) => {
			return getPokemon(element.url)
		})
	)
	return pokeData
}

export const getPokemon = async (url: string) => {
	const types: string[] = []
	const weakness: string[] = []
	const config = {
		method: 'get',
		url,
		headers: {},
	}

	const { data: pokemonsData } = await axios(config)

	await Promise.all(
		pokemonsData.types.map(async (element: any) => {
			const dataType = await getTypes(element.type.url)
			types.push(element.type.name)

			dataType.forEach((element: any) => {
				if (weakness.indexOf(element.name) === -1) weakness.push(element.name)
			})
		})
	)

	return {
		id: pokemonsData.id,
		name: pokemonsData.forms[0].name,
		type: { types, weakness },
		img: pokemonsData.sprites.other['official-artwork'].front_default,
		height: pokemonsData.height,
		weight: pokemonsData.weight,
	}
}

const getTypes = async (url: string) => {
	const config = {
		method: 'get',
		url,
		headers: {},
	}

	const { data: typesData } = await axios(config)

	return typesData.damage_relations.double_damage_from
}
