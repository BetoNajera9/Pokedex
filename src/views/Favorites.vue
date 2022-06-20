<script lang="ts">
import { defineComponent } from 'vue'
import Grid from '../components/Grid.vue'

export default defineComponent({
	components: { Grid },
	setup() {},
})
</script>

<template lang="pug">
grid(:setPokemonsData="'favoritePokemons'")
</template>
