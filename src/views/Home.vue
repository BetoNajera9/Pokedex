<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import Searcher from '../components/Searcher.vue'
import Grid from '../components/Grid.vue'
import { useStore } from '../store'
import { ActionTypes } from '../store/actions'

export default defineComponent({
	components: { Searcher, Grid },
	setup() {
		const store = useStore()

		const fetchMorePokemons = async () => {
			store.dispatch(
				ActionTypes.SetPokemonIndex,
				store.getters.pokemonIndex + 12
			)
		}

		onBeforeMount(() => {
			store.dispatch(ActionTypes.SetPokemonIndex, 12)
		})

		return {
			fetchMorePokemons,
			store,
		}
	},
})
</script>

<template lang="pug">
section.title
	h1 Pokédex
searcher
grid(:setPokemonsData="'pokemonContent'")
.charge-page-area
	button.charge-page(@click='fetchMorePokemons') Cargar mas pokemon
</template>

<style lang="postcss" scoped>
.title {
	@apply text-dark;
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

	@apply active:bg-blue-high;
}
</style>
