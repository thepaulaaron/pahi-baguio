<script lang="ts">
  import SectionWrapper from "$comp/SectionWrapper.svelte";
  import About from "../lib/components/About.svelte";
  import Hero from "../lib/components/Hero.svelte";
  import Header from "../lib/components/Header.svelte";
  const logoURL = new URL('../assets/pahi-logo.png', import.meta.url).href;
</script>


<!-- <img src="{logoURL}" class="max-w-xs" alt="" />
<h1 class="text-yellow-400 text-xl font-extrabold">PahiBaguio</h1>
<p>Ugnayan ng Pahinungód</p>
<p>Volunteer Database</p> -->

<SectionWrapper id="landing">
  <Header/>
  <Hero/>
</SectionWrapper>

 <About/>

<nav>
  <a href="/">Home</a>
  <a href="/db">database</a>
  <!-- <a href="/contact">Contact</a>
  <a href="/user/1">User 1 Profile</a>
  <a href="/user/2">User 2 Profile</a> -->
</nav>