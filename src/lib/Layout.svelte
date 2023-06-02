<script lang="ts" context="module">
  import { waitLocale } from "svelte-i18n";
  import Router from "svelte-spa-router";
  import { routes } from "../routes";
  import Navbar from "./Navbar.svelte";

  export async function preload() {
    return waitLocale();
  }
</script>

<Navbar />
<Router {routes} />
