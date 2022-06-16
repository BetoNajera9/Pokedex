<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ActionTypes } from '../store/actions'
import { useStore } from '../store'

export default defineComponent({
	props: ['imgSrc', 'favorite', 'pokemonName'],
	setup(props) {
		const { favorite, imgSrc, pokemonName } = props

		const store = useStore()

		let isFavorite = ref(store.getters.favoritePokemon(pokemonName))

		const toogleFavorite = () => {
			isFavorite.value = !isFavorite.value

			if (isFavorite.value === false) {
				store.dispatch(ActionTypes.RemovePokemonFavorite, pokemonName)
			} else {
				const pokemonData = store.getters.pokemon(pokemonName)
				store.dispatch(ActionTypes.SetPokemonFavorite, pokemonData)
			}
		}

		return {
			pokemonName,
			toogleFavorite,
			isFavorite,
			favorite,
			imgSrc,
		}
	},
})
</script>

<template lang="pug">
div
	span.toogle-favorite(@click="toogleFavorite")
		mdicon.btn-favorite(:class="{favorite: isFavorite}" v-show="favorite === true"  name="heart" size="25")
	router-link(:to="{ name: 'pokemonDetails', params: { name: pokemonName }}")
		img(:src="imgSrc")

</template>

<style lang="postcss">
.toogle-favorite {
	@apply flex;
	@apply justify-end;
}

.favorite.btn-favorite {
	@apply text-red;
}

.btn-favorite {
	@apply block;
	@apply text-dark;
	@apply cursor-pointer;
	@apply mr-2;
	@apply mt-2;
}
</style>
