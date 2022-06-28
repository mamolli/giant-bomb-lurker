<script>
  import { cartStore } from "./stores.js"
  import { removeCartItem } from "./cart.js"
  import { values, isEmpty, length } from "ramda"


  let cartItems = []

  cartStore.subscribe(v => {
    cartItems = values(v)
  })
</script>

<h3>Checkout summary:</h3>
{#if !isEmpty(cartItems)}
  <i>Preparing to rent {length(cartItems)} games:</i>
{/if}
<ul>
{#each cartItems as game}
  <li class="cart-item">
    <img alt="{game.name} - game image" src="{game.image.thumb_url}" width="40"/> 
    <div class="game-title">{game.name}</div>
    <div><button on:click={removeCartItem(game)}>❌ remove from cart</button></div>
  </li>
{:else}
  No items in the cart, <br />
  <i>use serach in top bar to find games to add</i>
{/each}
</ul>
{#if !isEmpty(cartItems)}
  <button class="checkout-button" on:click={() => alert("Payment processing not implemented")}>Checkout</button>
{/if}

<style>
  .cart-item {
    margin: 0.3em 0;
    list-style: none;
    display: flex;
    flex-direction: row;
		flex-wrap: nowrap;
    align-items: center;
		justify-content: left;
    padding: 2em;
		border-bottom: 1px var(--grey) solid;
    width: 32em;
  }
  .game-title {
    margin: 0 1em;
    width: 18em;
  }
  .checkout-button {
    font-weight: bold;
    font-size: 1.3em;
  }
  .cart-item button {
    font-size: 0.8em;
  }
</style>