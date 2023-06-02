<script lang="ts">
  import type { Writable } from "svelte/store";
  export let id: string;
  export let label: string;
  export let handleChange: (event: Event) => any;
  export let form: Writable<unknown>;
  export let errors: Writable<unknown>;
  export let options: string[];
</script>

<div class="form-control">
  <label class="label" for={id}>
    <span class="label-text text-xl">{label}</span>
  </label>
  <select
    {id}
    name={id}
    on:change={handleChange}
    on:blur={handleChange}
    bind:value={$form[id]}
    class="select input-bordered"
  >
    <option disabled selected>{label}</option>
    {#each options as option}
      <option>{option}</option>
    {/each}
  </select>
  {#if $errors[id]}
    <small class="text-red-500">{$errors[id]}</small>
  {/if}
</div>
