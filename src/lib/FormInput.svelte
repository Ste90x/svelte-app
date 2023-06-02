<script lang="ts">
  import type { Writable } from "svelte/store";

  export let id: string;
  export let label: string;
  export let handleChange: (event: Event) => any;
  export let form: Writable<unknown>;
  export let errors: Writable<unknown>;
</script>

<div class="form-control">
  <label class="label" for={id}>
    <span class="label-text text-xl">{label}</span>
  </label>
  <input
    {id}
    name={id}
    on:change={handleChange}
    on:blur={handleChange}
    bind:value={$form[id]}
    placeholder={label}
    class="input input-md input-bordered"
  />
  {#if $errors[id]}
    <small>{$errors[id]}</small>
  {/if}
</div>
