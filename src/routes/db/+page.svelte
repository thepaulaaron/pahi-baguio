<script lang="ts">
  import About from "../../lib/components/About.svelte";
  import Hero from "../../lib/components/Hero.svelte";

  import type { PageData } from "./$types";

  export let data: PageData;
  $: volunteers = data.volunteers;
</script>

{#each volunteers as volunteer}
  <div>
    {#each Object.entries(volunteer) as [key, value]}
      <p><strong>{key}:</strong> {value}</p>
    {/each}
  </div>
{/each}

<main class="flex flex-col">
  <div>heasd</div>
  <About/>
</main>

<nav>
  <a href="/">Home</a>
  <a href="/db">databasss</a>
  <!-- <a href="/contact">Contact</a>
  <a href="/user/1">User 1 Profile</a>
  <a href="/user/2">User 2 Profile</a> -->
</nav>