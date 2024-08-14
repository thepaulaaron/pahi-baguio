<script lang="ts">
  import Ellipsis from "lucide-svelte/icons/ellipsis";
  import * as DropdownMenu from "$comp/ui/dropdown-menu";
  import { Button } from "$comp/ui/button";
  import { onDestroy, onMount } from "svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import DropdownMenuLabel from "$lib/components/ui/dropdown-menu/dropdown-menu-label.svelte";
  import * as Dialog from "$comp/ui/dialog";
  import { writable } from 'svelte/store';
 
  export let id: string;

  // State to control dialog open/close
  const isOpen = writable(false);
  let dialogWrapper: HTMLDivElement; // Use HTMLDivElement for the wrapper
  let data: Volunteer[] = [];
  let selectedVolunteer: Volunteer | undefined;

  import { array } from './sort';
  import type { Volunteer } from './sort';

  const unsubscribe = array.subscribe(value => {
    data = value;
    searchVolunteerById();
  });

  function openDialog() {
    isOpen.set(true);
  }
  
  function closeDialog() {
    isOpen.set(false);
  }

  function handleViewVolunteer() {
    openDialog();
  }

  function searchVolunteerById() {
  selectedVolunteer = data.find(volunteer => volunteer._id === id);
}

  onDestroy(() => {
    unsubscribe();
  })
</script>

<!-- Dialog -->

<Dialog.Root open={$isOpen} onOpenChange={(open) => { if (!open) closeDialog(); }}>
  <div bind:this={dialogWrapper} class="dialog-wrapper">

    {#if selectedVolunteer}

      <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>{selectedVolunteer.Name}</Dialog.Title>
          <Dialog.Description>
            <div>
              <strong>Volunteer Details:</strong>
              <p>First Name: {selectedVolunteer.Fname}</p>
              <p>Middle Name: {selectedVolunteer.Midname}</p>
              <p>Surname: {selectedVolunteer.Surname}</p>
              <p>Suffix: {selectedVolunteer.Suffixname}</p>
              <p>Type: {selectedVolunteer.VolType}</p> 
              <p>Birthday: {selectedVolunteer.Birthday}</p>
            </div>
          </Dialog.Description>
        </Dialog.Header>
      </Dialog.Content>

    {:else}
      <p>No volunteer found with this ID.</p>
    {/if}

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
      <DropdownMenu.Item on:click={handleViewVolunteer}>
        View Volunteer
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>View payment details</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
