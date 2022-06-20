import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: () => import('../views/Home.vue'),
	},
	{
		path: '/favorites',
		name: 'favorites',
		component: () => import('../views/Favorites.vue'),
	},
	{
		path: '/pokemon/:name',
		name: 'pokemonDetails',
		component: () => import('../views/PokemonDetails.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

export default router
