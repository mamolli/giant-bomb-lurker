<script>
    
  import { onMount } from 'svelte';
  import { link, navigate } from "svelte-routing"
  import { keys, length } from "ramda"

  import { searchPromiseStore, cartStore } from "./stores.js";
  import * as gb from "./giantBomb.js"

  let cartItemCount = 0
  let query = new URLSearchParams(window.location.search).get('search') || ""

  const search = () => {
    searchPromiseStore.set(gb.searchGamesByString(query))

    // pushing new url with query, as history state without reloading
    if (history.pushState) {
      const newurl = window.location.protocol + "//" + window.location.host  + `?search=${query}` // pathname skipped
      window.history.pushState({ path : newurl }, '', newurl)
    }
    navigate(`/?search=${query}`)
  }

  cartStore.subscribe(v => {
    cartItemCount = length(keys(v))
  })

  onMount(async () => {
    searchPromiseStore.set(gb.searchGamesByString(query))
  })

</script>

<nav>
  <a id="logo" href="/" use:link>GiantBomb Lurker</a>

  <form on:submit|preventDefault={search}>
    <input id="search-input" type="text" bind:value={query} placeholder="what game title you look for?"/>
    <button id="search-button" type="submit">Search</button>
  </form>
  <a id="cart" href="/checkout" use:link>🛒cart ({cartItemCount} items)</a>
</nav>

<style>
  nav {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
  }

  nav form {
    margin-left: 2em;
    margin-right: 2em;
  }
  #logo {
    font-weight: bold;
    font-size: 1.4em;
  }
  #search-input {
    width: 19em;
    /* font-weight: bold; */
  }
  #search-button {
    font-weight: bold;
  }
  #cart {
    font-size: 1.2em;
  }
</style>