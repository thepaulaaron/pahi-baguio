<script lang="ts">
  import { writable } from 'svelte/store';
  import Ellipsis from "lucide-svelte/icons/ellipsis";
  import * as DropdownMenu from "$comp/ui/dropdown-menu";
  import { Button } from "$comp/ui/button";
  import { toast } from "svelte-sonner";
  import { Separator } from "$lib/components/ui/separator";
  import type { Volunteer } from './sort';
  import { array } from './sort';
  import * as Dialog from "$comp/ui/dialog";
  import { selectedVolunteerId } from '$lib/context'; // Ensure this path is correct
  import { onDestroy } from 'svelte';
	import { activeTab } from '$str';

  export let id: string;
  let selectedVolunteer: Volunteer | undefined;

  // State to control dialog open/close
  const isOpen = writable(false);
  let dialogWrapper: HTMLDivElement;
  let data: Volunteer[] = [];

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

  function closeDialogAsync(): Promise<void> {
    return new Promise((resolve) => {
      // Simulate closing dialog with some delay (for demonstration)
      setTimeout(() => {
        closeDialog(); // Call the synchronous closeDialog
        resolve();    // Resolve the promise
      }, 300); // Adjust the delay as needed
    });
  }

  function handleViewVolunteer() {
    openDialog();
  }

  function searchVolunteerById() {
    selectedVolunteer = data.find(volunteer => volunteer._id === id);
  }

  function getValue(property: keyof Volunteer) {
    return selectedVolunteer?.[property] ?? "N/A";
  }

  let editWhat = "Editing " + selectedVolunteer?.Name;

  async function editVolunteer() {
    if (selectedVolunteer) {
      toast.loading("Edit Mode", {
      description: editWhat,
      duration: 1900,
    });
      // await closeDialogAsync();
      selectedVolunteerId.set(selectedVolunteer._id);
      closeDialog();
      setTimeout(() => {
        activeTab.set('editor');
      }, 800)
    }
  }

  onDestroy(() => {
    unsubscribe();
  });
</script>

<!-- Dialog -->

<Dialog.Root open={$isOpen} onOpenChange={(open) => { if (!open) closeDialog(); }}>
  <div bind:this={dialogWrapper} class="dialog-wrapper">

    {#if selectedVolunteer}
      <Dialog.Content class="volunteer-dialog p-10">
        <Dialog.Header>
          <Dialog.Title class="dialog-title">{getValue('Name')}</Dialog.Title>
          <Dialog.Description>
            <Separator class="my-5" />
            <div class="flex space-x-4 text-base">
              
              <!-- Personal Info -->
              <div class="vert">
                <strong class="text-lg whiten">Personal Info</strong>
                <div class="space-y-2 mt-2">
                  <p>First Name: {getValue('Fname')}</p>
                  <p>Middle Name: {getValue('Midname')}</p>
                  <p>Surname: {getValue('Surname')}</p>
                  <p>Suffix: {getValue('Suffixname')}</p>
                  <p>Birthday: {getValue('Birthday')}</p>
                  <p>Mobile Num: {getValue('MobileNum')}</p>
                  <p>Personal Mail: {getValue('PersonalMail')}</p>
                  <p>Address: {getValue('Address')}</p>
                </div>
              </div>

              <!-- Campus Info -->
              <div class="vert">
                <strong class="text-lg whiten">Campus Info</strong>
                <div class="space-y-2 mt-2">
                  <p>UP Mail: {getValue('UPMail')}</p>
                  <p>Student Number: {getValue('StudentNumber')}</p>
                  <p>Degree Program: {getValue('DegreeProgram')}</p>
                  <p>College: {getValue('College')}</p>
                  <p>Department: {getValue('Department')}</p>
                  <p>Designation: {getValue('Designation')}</p>
                </div>
              </div>

              <div class="vert space-y-10">
                <!-- Emergency Contact -->
                <div class="box">
                  <strong class="text-lg whiten">Emergency Contact</strong>
                  <div class="space-y-2 mt-2">
                    <p>Name: {getValue('EmergencyContactName')}</p>
                    <p>Relationship: {getValue('EmergencyContactRelationship')}</p>
                    <p>Contact Number: {getValue('EmergencyContactNumber')}</p>
                  </div>
                </div>

                <!-- Others -->
                <div class="box">
                  <strong class="text-lg whiten">Others</strong>
                  <div class="space-y-2 mt-2">
                    <p>Volunteer Status: {getValue('VolunteerStatus')}</p>
                    <p>Volunteer Since: {getValue('VolunteerSince')}</p>
                    <p>Database ID: {getValue('DatabaseID')}</p>
                    <p>Notes: {getValue('Notes')}</p>
                  </div>
                </div>
              </div>            

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
    <Separator />
    <DropdownMenu.Item on:click={
    editVolunteer}>Edit details</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
