<script lang="ts">
  import Ellipsis from "lucide-svelte/icons/ellipsis";
  import * as DropdownMenu from "$comp/ui/dropdown-menu";
  import { Button } from "$comp/ui/button";
  import { onMount } from "svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import DropdownMenuLabel from "$lib/components/ui/dropdown-menu/dropdown-menu-label.svelte";
  import * as Dialog from "$comp/ui/dialog";
  import { writable } from 'svelte/store';
 
  export let id: string;

  // State to control dialog open/close
  const isOpen = writable(false);
  let dialogWrapper: HTMLDivElement; // Use HTMLDivElement for the wrapper

  // Function to open the dialog
  function openDialog() {
    isOpen.set(true);
  }

  // Function to close the dialog
  function closeDialog() {
    isOpen.set(false);
  }

  function handleClickOutside(event: MouseEvent) {
    if (dialogWrapper && !dialogWrapper.contains(event.target as Node)) {
      closeDialog();
    }
  }

  function handleCopyId() {
    navigator.clipboard.writeText(id);
    console.log(id);
    openDialog();
  }

  onMount(() => {
    // Add event listener to handle clicks outside the dialog
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up the event listener on component destruction
      window.removeEventListener('mousedown', handleClickOutside);
    };
  });
</script>

<Dialog.Root open={$isOpen} onOpenChange={(open) => { if (!open) closeDialog(); }}>
  <div bind:this={dialogWrapper} class="dialog-wrapper">
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>
          Make changes to your profile here. Click save when you're done.
          <div class="mt-4">
            <strong>Payment ID:</strong> {id}
          </div>
        </Dialog.Description>
      </Dialog.Header>
    </Dialog.Content>
  </div>
</Dialog.Root>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button
      variant="ghost"
      builders={[builder]}
      size="icon"
      class="relative h-5 w-8 items-center"
    >
      <Ellipsis class="h-4 w-7 items-center" />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
      <DropdownMenu.Item on:click={handleCopyId}>
        Copy payment ID
      </DropdownMenu.Item>
      <!-- <DropdownMenu.Item on:click={() => handleAction('')}>
        View student</DropdownMenu.Item> -->
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>View payment details</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
