<script lang="ts">
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
  import { toggleMode } from "mode-watcher"; // Imported function
  import { Button } from "$comp/ui/button/index.js";
  import { darkMode } from '$str';
  import { checkBodyDark } from "$lib/utils";

  

  async function toggleDarkMode() {
    // Simulate an asynchronous operation
    // return new Promise<void>((resolve) => {
      // setTimeout(() => {
        darkMode.update((value) => !value);
        console.log("Toggled dark mode");
        // resolve();
      // }, 1000); // 1-second delay
    // });
  }

  async function handleClick() {
    try {

      let wasDarkMode = checkBodyDark();
      
      await toggleMode(); // Assume this changes the body color

            // Check if dark mode is active based on color-scheme
            const isDarkModeNow = checkBodyDark();
      
      // If the dark mode state has changed, toggle dark mode
      if (wasDarkMode !== isDarkModeNow) {
        toggleDarkMode();
      }

      // Update the previous state
      wasDarkMode = isDarkModeNow;
    } catch (error) {
      console.error("Error in toggling modes:", error);
    }
  }
</script>

<Button on:click={handleClick} variant="outline" size="icon">
  <Sun
    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  />
  <Moon
    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  />
</Button>