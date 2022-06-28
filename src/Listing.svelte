<script>
  import { searchPromiseStore, cartStore } from "./stores.js"
  import { addCartItem, removeCartItem } from "./cart.js"
  import { has } from "ramda" 

  // ramda build error can be ignored: 
  // https://stackoverflow.com/questions/69768925/rollup-plugin-svelte-the-following-packages-did-not-export-their-package-json

  let gamesResponse
  let cartState = {}


  cartStore.subscribe(v => {
    cartState = v
  })

  searchPromiseStore.subscribe(v => {
    gamesResponse = v
  })
</script>


<div id="games-flex-results">
	{#await gamesResponse}
		loading..
	{:then games}
		{#each games as game}
			<div class="game-container">
				<div class="game-desc-flex-container">
					<div class="game-thumb">
            <img alt="{game.name} - game image" src="{game.image.thumb_url}" width="100"/>
          </div>
					<div class="game-desc">
						{game.name}
					</div>
				</div>
        {#if has(game.id, cartState)}
          <button on:click={removeCartItem(game)}>
            ❌ remove from cart
          </button>
          <div class="green-helper">Iteam was added to cart.</div>
        {:else}
          <button class="add-button" on:click={addCartItem(game)}>
            🛒 add to cart
          </button>
        {/if}

			</div>
		{:else}
			No games match your search query. <br />
      Type game title into search bar.
		{/each}
	{/await}
</div>

<style>
  button {
    margin-top: 1em;
  }
  .add-button {
    font-weight: bold;;
  }
  .green-helper{
    color: rgb(0, 140, 0);
  }
  
  #games-flex-results {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }

  .game-container {
    margin: 1em;
    padding: 2em;
    border: 1px var(--grey) solid;
  }

  .game-desc-flex-container {
    display: flex;
    width: 12em;
  }

  .game-desc {
    margin-left: 1em;
  }
</style>