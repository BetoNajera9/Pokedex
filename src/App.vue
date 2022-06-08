<script setup lang="ts">
import Header from './components/Header.vue'
import Searcher from './components/Searcher.vue'
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
