<script lang="ts">
  import SectionWrapper from "$comp/SectionWrapper.svelte";
  import About from "../lib/components/About.svelte";
  import Hero from "../lib/components/Hero.svelte";
  import Header from "../lib/components/Header.svelte";
  const logoURL = new URL('../assets/pahi-logo.png', import.meta.url).href;
</script>

<main>
  <SectionWrapper id="landing">
    <Header/>
    <Hero/>
  </SectionWrapper>

 <About/>
</main>