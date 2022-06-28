import { writable } from 'svelte/store'

// SEARCH
// empty iterable as default for response with list of games
export const searchPromiseStore = writable([]) 

// CART
// since its renting only, we are going to use js object, id as key, cartObject as value
// its unlikely someone wants to rent the same game twice
export const cartStore = writable({})


