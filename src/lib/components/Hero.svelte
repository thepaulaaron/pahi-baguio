<script>
// @ts-nocheck

    import CtAs from "./CTAs.svelte";
    import Header from "./Header.svelte";
    import SectionWrapper from "./SectionWrapper.svelte";
</script>

<!-- <SectionWrapper> -->
    <!-- <Header/> -->
    <div
        class="flex flex-col gap-10 flex-1 items-center justify-center pb-10 md:pb-14"
    >
        <h2
            class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-[1200px] mx-auto w-full text-center font-semibold"
        >
            <span class="text-pahi-blue">Pahi</span>Baguio
        <br/>
        </h2>
        <p
            class="text-xl sm:text-2xl md:text-3xl text-center max-w-[1000px] mx-auto w-full"
        >
        Volunteer Database of 
         <span class="italic">Ugnayan ng Pahinungód</span>
         <br/>
         University of the Philippines - Baguio
        </p>
        <CtAs />
        <p class="italic">Makibahagi. Maglingkod. Mag<span class="text-pahi-blue">Pahinungod</span>.
        </p>
    </div>
<!-- </SectionWrapper> -->
