<script>
// @ts-nocheck

    import CtAs from "./CTAs.svelte";
    import Header from "./Header.svelte";
    import SectionWrapper from "./SectionWrapper.svelte";
    import { darkMode } from '$str';

    // To use the store in the component
    let dark;
    darkMode.subscribe(value => {
        dark = value;
    });
</script>

<!-- <SectionWrapper> -->
    <!-- <Header/> -->
    <div
        class="flex flex-col gap-10 flex-1 items-center justify-center pb-10 md:pb-14"
    >
        <h2
            class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-[1200px] mx-auto w-full text-center font-semibold typer-box"
        >
            <span class={(dark ? "text-[#3578ca]" : "text-pahi-blue")}>Pahi</span><span class={(dark ? "text-[#ebebeb]" : "text-black-300")}>Baguio</span>
        <br/>
        </h2>

        <div class={(dark ? "text-[#ebebeb]" : "text-black")}>
          <p
          class="text-xl sm:text-2xl md:text-3xl text-center max-w-[1000px] mx-auto w-full"
          >
          Volunteer Database of 
          <span class="italic">Ugnayan ng Pahinungód</span>
          <br/>
          University of the Philippines - Baguio
          </p>
        </div>
        
        <CtAs />
        <p style="font-family: 'Poppins', sans-serif;"
          class={"italic " + (dark ? "text-[#ebebeb]" : "")}>Makibahagi. Maglingkod. Mag<span class={(dark ? "text-[#2c68b2]" : "text-pahi-blue")}>Pahinungod</span>.
        </p>
    </div>
<!-- </SectionWrapper> -->
