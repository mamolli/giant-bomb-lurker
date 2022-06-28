import { cartStore } from "./stores"
import { assoc, dissoc, pick } from "ramda" 


export let addCartItem = (game) => () => cartStore.update(assoc(game.id, cartItem(game)))
export let removeCartItem = (game) => () => cartStore.update(dissoc(game.id))
export let cartItem = (game) => pick(["id", "name", "image"], game)