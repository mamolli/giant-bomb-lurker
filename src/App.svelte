<script>
  import { Router, Route, link, navigate } from "svelte-routing"
  import Nav from "./Nav.svelte"
  import Listing from "./Listing.svelte"
  import Checkout from "./Checkout.svelte"
  import NotFound from "./NotFound.svelte"

  export let name
  export let url = ""


</script>

<main>
  <Nav />
  <Router url="{url}">
    <Route path="/">
      <Listing />
    </Route>
    <Route path="/checkout">
      <Checkout />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Router>
</main>

<style>
  :root {
    --grey: rgb(201, 201, 201);
  }

  main {
    padding-left: 2em;
    padding-right: 2em;
  }
</style>