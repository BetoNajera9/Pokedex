<script lang="ts">
import { defineComponent } from 'vue'
import Searcher from '../components/Searcher.vue'

export default defineComponent({
	components: { Searcher },
	setup() {},
})
</script>

<template lang="pug">
section.title
  h1 Pokédex
searcher
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
</style>
