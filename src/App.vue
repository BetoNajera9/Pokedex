<script lang="ts">
import Header from './components/Header.vue'
import Searcher from './components/Searcher.vue'
import { defineComponent, onBeforeMount } from 'vue'
import PokeApi from './services/poke-api'
import { ActionTypes } from './store/actions'
import { useStore } from './store'
import { Pokemon } from './services/poke-api/models'

export default defineComponent({
	components: { Header, Searcher },

	setup() {
		const pokeApi = new PokeApi()
		const store = useStore()

		onBeforeMount(async () => {
			if (localStorage.pokemons) {
				store.dispatch(
					ActionTypes.SetPokemonsData,
					JSON.parse(localStorage.pokemons)
				)
			}

			if (store.getters.pokemons.length < store.getters.pokemonCount) {
				const pokemonData = await pokeApi.getPokemons(
					`https://pokeapi.co/api/v2/pokemon?limit=${store.getters.pokemonCount}&offset=0`
				)
				store.dispatch(ActionTypes.SetPokemonsData, pokemonData)
			}

			if (localStorage.favoritePokemon) {
				const favoritePokemon = JSON.parse(localStorage.favoritePokemon)
				favoritePokemon.forEach((element: Pokemon) => {
					store.dispatch(ActionTypes.SetPokemonFavorite, element)
				})
			}
		})
	},
})
</script>

<template lang="pug">
Header
router-view
</template>

<style lang="postcss">
body {
	@apply font-flexo;
}
</style>
