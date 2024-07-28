<script>
// @ts-nocheck

	import { Button } from "./ui/button";
    import { darkMode } from '$str';

    // To use the store in the component
    let dark;
    darkMode.subscribe(value => {
        dark = value;
    });

    function toggleDarkMode() {
        darkMode.update(value => !value);
        console.log("Toggled dark mode");
    }
</script>

<!-- <button on:click={toggleDarkMode}>adfdf</button> -->

<div class="flex items-center gap-4">

    <button on:click={toggleDarkMode} class={"button specialBtn " + (dark ? " bg-[#181b34]" : " ")}>
        <p class="text-base sm:text-lg md:text-xl">
            <i class="fa-solid fa-user text-xl">&nbsp;</i>
            As Guest</p>
    </button>

    <button class={"button specialBtnDark" + (dark ? " bg-[#d58a00]" : " ")}>
        <p class="text-base sm:text-lg md:text-xl">
            <i class="fa-solid fa-user-tie text-xl">&nbsp;</i>
            As Admsin</p>
    </button>

    <button class={"btn primary" + (dark ? "-dark" : " ")}>
        <p class="text-base sm:text-lg md:text-xl">
            <i class="fa-solid fa-user-tie text-xl">&nbsp;</i>
            As Admin</p>
    </button>

</div>
