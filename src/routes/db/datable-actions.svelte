<script lang="ts">
  import Ellipsis from "lucide-svelte/icons/ellipsis";
  import * as DropdownMenu from "$comp/ui/dropdown-menu";
  import { Button } from "$comp/ui/button";
	import { createEventDispatcher } from "svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import DropdownMenuLabel from "$lib/components/ui/dropdown-menu/dropdown-menu-label.svelte";
 
  export let id: string;
  // export let onAction: (id: string) => void;

  // function handleAction(action: string) {
  //   if (action === 'copy') {
  //     navigator.clipboard.writeText(id);
  //   } else {
  //     onAction(id);
  //   }
  // }

  // function handleCopyId() {
  //   navigator.clipboard.writeText(id);
  //   // Emit an event to the parent component
  //   dispatch('action', { id });
  // }

  // const dispatch = createEventDispatcher();
</script>
 
<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button
      variant="ghost"
      builders={[builder]}
      size="icon"
      class="relative h-5 w-8 items-center"
    >
      <!-- <span class="sr-only">Open menu</span> -->
      <Ellipsis class="h-4 w-7 items-center" />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
      <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id)}>
        Copy payment ID
      </DropdownMenu.Item>
      <!-- <DropdownMenu.Item on:click={() => handleAction('')}>
        View student</DropdownMenu.Item> -->
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>View payment details</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>