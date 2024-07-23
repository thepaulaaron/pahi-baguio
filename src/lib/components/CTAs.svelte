<script>
    export let dark;
</script>

<div class="flex items-center gap-4">

    <button class={"specialBtn " + (dark ? " bg-[#181b34]" : " ")}>
        <p class="text-base sm:text-lg md:text-xl">
            <i class="fa-solid fa-user text-xl">&nbsp;</i>
            As Guest</p>
    </button>

    <button class="specialBtnDark">
        <p class="text-base sm:text-lg md:text-xl">
            <i class="fa-solid fa-user-tie text-xl">&nbsp;</i>
            As Admin</p>
    </button>

</div>
