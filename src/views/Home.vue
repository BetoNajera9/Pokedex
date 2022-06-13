<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import Searcher from '../components/Searcher.vue'
import Grid from '../components/Grid.vue'
import { getPokemons } from '../api'
import { useStore } from '../store'
import { ActionTypes } from '../store/actions'

export default defineComponent({
	components: { Searcher, Grid },
	setup() {
		const store = useStore()

		const chargeMorePokemons = async () => {
			const pokemonData = await getPokemons(store.getters.nextUrl)
			store.dispatch(ActionTypes.SetPokemonsData, pokemonData)
		}

		onMounted(async () => {
			const pokemonData = await getPokemons()
			store.dispatch(ActionTypes.SetPokemonsData, pokemonData)
		})

		return {
			chargeMorePokemons,
			store,
		}
	},
})
</script>

<template lang="pug">
section.title
	h1 Pokédex
searcher
grid(:setPokemonsData="'pokemon'")
.charge-page-area
	button.charge-page(@click='chargeMorePokemons') Cargar mas pokemon
</template>

<style lang="postcss" scoped>
.title {
	@apply text-dark-light;
	@apply mx-40;
	@apply py-5;
	@apply px-10;
}

.title > h1 {
	@apply text-3xl;
}

.charge-page-area {
	@apply h-[75px];
	@apply text-center;
}

.charge-page {
	@apply w-[196px];
	@apply h-[45px];
	@apply bg-blue;
	@apply text-light;
	@apply rounded-md;

	@apply active:bg-blue-dark;
}
</style>
