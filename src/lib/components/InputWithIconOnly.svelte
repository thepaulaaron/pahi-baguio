<script lang="ts">
  export let icon: any;
  export let label = '';
  import { Label } from "./ui/label";
</script>

<div class="flex flex-col space-y-2">
  <Label class="flex">{label}</Label>
  <div class="input-box flex items-center border rounded-md">
    {#if icon}
      <svelte:component this={icon} class="input-icon ml-3 mr-3 h-5 w-5" />
    {/if}
    <slot />
  </div>
</div>
