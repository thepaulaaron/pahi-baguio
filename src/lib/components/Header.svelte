<script>
    import { openModal } from "../../store";
    import DarkToggle from "./dark-toggle.svelte";
</script>

<header class="flex flex-col relative z-20">
    <div
        class="max-w-[1400px] mx-auto w-full flex items-center justify-between p-4 py-6"
    >
        <a href="/">
            <h1 class="font-semibold">
               UP | Baguio
            </h1>
        </a>
        <button
            on:click={() => ($openModal = true)}
            class="md:hidden grid place-items-center"
        >
            <i class="fa-solid fa-bars"></i>
        </button>
        <nav class="hidden md:flex items-center gap-4 lg:gap-6">
            <a
                href="#faqs"
                class="duration-200 hover:text-indigo-400 cursor-pointer font-poppins"
                >About</a
            >
            <a
                href="#product"
                class="duration-200 hover:text-indigo-400 cursor-pointer"
                >Contact</a
            >
            <a
                href="#reviews"
                class="duration-200 hover:text-indigo-400 cursor-pointer"
                >Reviews</a
            >
            <DarkToggle/>
            <!-- <button class="specialBtn">
                <p>Start free todazzy</p>
            </button> -->
        </nav>
    </div>
</header>
