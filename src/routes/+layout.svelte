<!-- <script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  // import Footer from "../lib/components/Footer.svelte";
</script>
 
<ModeWatcher />
<slot />
<Footer/> -->

<script>
// @ts-nocheck

	import "../app.css";
	// @ts-ignore
	import CtAs from "../lib/components/CTAs.svelte";
    import About from "../lib/components/About.svelte";
	// import Footer from "../lib/components/Footer.svelte";

	import { openModal } from "../store";

	/**
	 * @type {number}
	 */
	let y;
	$: outerHeight = 0;

	/**
	 * @param {string} href
	 */
	function reroute(href) {
			$openModal = false;
			window.location.href = href;
	}

	// For dynamic imports

	import { page } from '$app/stores';
	import HeaderDefault from "../lib/components/Header.svelte";
  import HeaderAdmin from "../lib/components/HeaderAdmin.svelte";
	// import Header from "../lib/components/Header.svelte";
	import SectionWrapper from "$lib/components/SectionWrapper.svelte";
	import Hero from "$lib/components/Hero.svelte";

	/**
	 * @type {typeof HeaderAdmin}
	 */
	let currentHeader, currentHero;

	$: {
		if ($page.url.pathname === '/db') {
			currentHeader = HeaderAdmin;
			currentHero = null;
	// } else if ($page.url.pathname === '/another-page') {
		//     currentHeader = AnotherPageModule;
		} else {
			currentHeader = HeaderDefault;
			currentHero = Hero;
		}
	}

</script>

<!-- Main Header -->

<!-- <SectionWrapper>
	<svelte:component this={currentHeader} />
	<div></div>
	<svelte:component this={currentHero} />
</SectionWrapper> -->

<!-- Modal Header -->

{#if $openModal}
    <div
        class="fixed top-0 left-0 w-screen h-screen border-b bg-white z-50 flex flex-col gap-8 p-5 px-8 md:hidden"
    >
        <div class="flex items-center justify-between gap-4 border-b pb-2">
            <h1 class="font-semibold">
                Swoley <span class="text-indigo-400">Moley</span>
            </h1>
            <button
                on:click={() => ($openModal = false)}
                class="outline-none border-none"
            >
                <i class="fa-solid fa-xmark text-2xl"></i>
            </button>
        </div>
        <div class="flex flex-col gap-4 flex-1">
            <button
                on:click={() => reroute("#product")}
                class="border-none outline-none p-2 group duration-200 cursor-pointer text-left"
            >
                <p
                    class="duration-200 group-hover:pl-2 poppins text-3xl font-semibold"
                >
                    Product <i class="fa-solid fa-chevron-right text-xl pl-4" />
                </p>
            </button>
            <button
                on:click={() => reroute("#reviews")}
                class="border-none outline-none p-2 group duration-200 cursor-pointer text-left"
            >
                <p
                    class="duration-200 group-hover:pl-2 poppins text-3xl font-semibold"
                >
                    Reviews <i class="fa-solid fa-chevron-right text-xl pl-4" />
                </p>
            </button>
            <button
                on:click={() => reroute("#faqs")}
                class="border-none outline-none p-2 group duration-200 cursor-pointer text-left"
            >
                <p
                    class="duration-200 group-hover:pl-2 poppins text-3xl font-semibold"
                >
                    FAQs <i class="fa-solid fa-chevron-right text-xl pl-4" />
                </p>
            </button>
        </div>
        <div class="flex flex-col items-center justify-center">
            <CtAs />
        </div>
    </div>
{/if}

<!-- For lingering header -->

<!-- {#if y > outerHeight}
    <div class="bg-white fixed top-0 left-0 w-full flex flex-col z-20 px-4 fadeIn">
			<svelte:component this={currentHeader} />
    </div>
{/if} -->
<slot />
<svelte:window bind:scrollY={y} bind:outerHeight />