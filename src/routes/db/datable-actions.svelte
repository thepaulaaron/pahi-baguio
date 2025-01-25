<script lang="ts">
  import Ellipsis from "lucide-svelte/icons/ellipsis";
  import * as DropdownMenu from "$comp/ui/dropdown-menu";
  import * as Dialog from "$comp/ui/dialog";
  import { Button } from "$comp/ui/button";
	import { writable } from "svelte/store";
	import { Separator } from "$lib/components/ui/separator";
  
  export let row: any;

  const isOpen = writable(false);
  let dialogWrapper: HTMLDivElement;

  function openDialog() {
    isOpen.set(true);
  }

  function closeDialog() {
    isOpen.set(false);
  }

  function handleViewVolunteer() {
    openDialog();
  }

  function getValue(property: any) {
    return row?.original?.[property] ?? "N/A";
  }
 </script>

<Dialog.Root open={$isOpen} onOpenChange={(open) => { if (!open) closeDialog(); }}>
  <div bind:this={dialogWrapper} class="dialog-wrapper">


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
                  <p>Sex: {getValue('Sex')}</p>
                  <p>Birthday: {getValue('Birthday')}</p>
                  <p>Mobile Num: {getValue('MobNum')}</p>
                  <p>Personal Mail: {getValue('PersonalMail')}</p>
                  <p>Address: {getValue('Address')}</p>
                </div>
              </div>

              <!-- Campus Info -->
              <div class="vert">
                <strong class="text-lg whiten">Campus Info</strong>
                <div class="space-y-2 mt-2">
                  <p>UP Mail: {getValue('UPMail')}</p>
                  <p>Student Number: {getValue('StudNum')}</p>
                  <p>Degree Program: {getValue('DegProg')}</p>
                  <p>College: {getValue('College')}</p>
                  <p>Department: {getValue('Dept')}</p>
                  <p>Designation: {getValue('Designation')}</p>
                </div>
              </div>

              <div class="vert space-y-10">
                <!-- Emergency Contact -->
                <div class="box">
                  <strong class="text-lg whiten">Emergency Contact</strong>
                  <div class="space-y-2 mt-2">
                    <p>Name: {getValue('EmergName')}</p>
                    <p>Relationship: {getValue('Relationship')}</p>
                    <p>Contact Number: {getValue('EmergNum')}</p>
                  </div>
                </div>

                <!-- Others -->
                <div class="box">
                  <strong class="text-lg whiten">Others</strong>
                  <div class="space-y-2 mt-2">
                    <p>Volunteer Status: {getValue('VolStatus')}</p>
                    <p>Volunteer Since: {getValue('VolSince')}</p>
                    <p>Database ID: {getValue('DatabaseID')}</p>
                    <p>Notes: {getValue('Notes')}</p>
                  </div>
                </div>
              </div>            

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
    class="relative h-8 w-8 p-0"
   >
    <span class="sr-only">Open menu</span>
    <Ellipsis class="h-4 w-4" />
   </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
   <DropdownMenu.Group>
    <DropdownMenu.Label>Actions</DropdownMenu.Label>
    <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(getValue("_id"))}>
     Copy user ID
    </DropdownMenu.Item>
    <DropdownMenu.Item on:click={handleViewVolunteer}>
      View Volunteer
    </DropdownMenu.Item>
   </DropdownMenu.Group>
   <DropdownMenu.Separator />
   <DropdownMenu.Item>

   </DropdownMenu.Item>
   <DropdownMenu.Item>View payment details</DropdownMenu.Item>
  </DropdownMenu.Content>
 </DropdownMenu.Root>