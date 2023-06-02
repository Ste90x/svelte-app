<script lang="ts">
  import { _, locale } from "svelte-i18n";
  import { Labels } from "../assets/locale/Labels";
  import { link } from "svelte-spa-router";

  const toggleLanguage = () => {
    locale.update((currentLanguage) => {
      if (currentLanguage === "de-DE") {
        return "en";
      } else {
        return "de-DE";
      }
    });
  };
</script>

<div class="navbar bg-neutral text-white">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost normal-case text-xl" use:link
      >YAEWA - YetAnotherEnterpriseWebApp</a
    >
  </div>
  <div class="flex-none dropdown dropdown-bottom dropdown-end">
    <button
      tabindex="0"
      class="btn btn-square btn-ghost hover:bg-base-200 hover:text-black"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-5 h-5 stroke-current"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        /></svg
      >
    </button>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-64"
    >
      <li>
        <label class="label cursor-pointer">
          <span class="label-text"
            >{$_(Labels.shared.navbar.menu.LANGUAGE)} ({$locale})</span
          >
          <input
            type="checkbox"
            class="toggle"
            checked
            on:click={toggleLanguage}
          />
        </label>
      </li>
      <li>
        <div class="text-black">{$_(Labels.shared.navbar.menu.LOGOUT)}</div>
      </li>
    </ul>
  </div>
</div>
