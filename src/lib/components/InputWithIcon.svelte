<script lang="ts">
  export let label = '';
  export let icon: any;
  export let id = '';
  export let value = '';

  import { Label } from "./ui/label";
  import { Input } from "./ui/input";
</script>

<div class="flex flex-col space-y-2">
  <Label for={id} class="flex">{label}</Label>
  <div class="input-box flex items-center border rounded-md">
    {#if icon}
      <svelte:component this={icon} class="input-icon ml-3 mr-3 h-5 w-5" />
    {/if}
    <Input id={id} type="text" class="border-0" value={value} />
  </div>
</div>
