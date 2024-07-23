<!-- <Button>hey</Button> -->

<!-- <script lang="ts">
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
 
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";

  const logoURL = new URL('../assets/pahi-logo.png', import.meta.url).href;
</script>
 
<Button on:click={toggleMode} variant="outline" size="icon">
  <Sun
    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  />
  <Moon
    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  />
  <span class="sr-only">Toggle theme</span>
</Button>

<img src="{logoURL}" class="max-w-xs" alt="" />
<h1 class="text-yellow-400 text-xl font-extrabold">PahiBaguio</h1>
<p>Ugnayan ng Pahinungód</p>
<p>Volunteer Database</p> -->

<script>
  // import Conversion from "../lib/components/Conversion.svelte";
  import About from "../lib/components/About.svelte";
  import Hero from "../lib/components/Hero.svelte";
</script>

<main class="flex flex-col">
  <Hero/>
  <!-- <Product /> -->
  <!-- <Reviews /> -->
  <About/>
  <!-- <Conversion /> -->
</main>
