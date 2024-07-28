<!-- SearchBar.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Input } from '$lib/components/ui/input';

  const dispatch = createEventDispatcher();

  export let filterValue: string;

  function handleInput(event: Event) {
    dispatch('input', (event.target as HTMLInputElement).value);
  }
</script>

<div class="relative max-w-sm">
  <Input
    class="w-full pl-4 pr-9 rounded-lg"
    placeholder="Search"
    type="text"
    bind:value={filterValue}
    on:input={handleInput}
  />
  <span class="absolute inset-y-0 right-0 flex items-center pr-3">
    <i class="fa-solid fa-search text-muted"></i>
  </span>
</div>
