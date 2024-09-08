<script lang="ts">
  import { writable } from "svelte/store";
  import ConfirmDialog from "$comp/confirm-dialog.svelte";
  import type { Volunteer } from "./sort";
  import { updateData as updator } from './sort';
  import { selectedVolunteerId } from '$lib/context'; // Import the selected volunteer ID store
  import { activeTab } from "$str"; // Import active tab store
	import { Separator } from "$comp/ui/separator";

  // Prop received from parent
  export let data: Volunteer[];

  // Track the currently selected volunteer's ID
  let volunteerId: string | undefined;
  $: $selectedVolunteerId, volunteerId = $selectedVolunteerId;

  // Find the selected volunteer based on the ID
  let selectedVolunteer: Volunteer | undefined;
  $: selectedVolunteer = data.find(volunteer => volunteer._id === volunteerId);

  // Dialog visibility state
  const isOpen = writable(false);
  let currentIndex: number | null = null;

  // Open the confirmation dialog for the selected volunteer
  function openDialog(index: number) {
    currentIndex = index;
    isOpen.set(true);
  }

  function closeDialog() {
    isOpen.set(false);
  }

  // Update the local data with the modified volunteer information
  function updateLocalData(updatedVolunteer: Volunteer) {
    data = data.map(volunteer =>
      volunteer._id === updatedVolunteer._id ? updatedVolunteer : volunteer
    );
  }

  // Save changes to the server and update local data
  function saveChanges(index: number) { 
    const updatedVolunteer = { ...data[index] };
    const { _id, ...updateData } = updatedVolunteer;

    // Update data for +page.svelte
    updator(data);

    console.log('Saving volunteer with ID:', _id);

    fetch(`/api/volunteers/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(updatedData => {
        console.log('Data saved:', updatedData);
        updateLocalData({ ...updatedVolunteer, ...updatedData });

        // Update selected volunteer directly if it's currently selected
        if (selectedVolunteer) {
          Object.assign(selectedVolunteer, updatedData);
        }
      })
      .catch(error => console.error('Error saving data:', error));
  }

  // Handle confirmation from the dialog
  function handleConfirm(param: number | null) {
    if (param !== null) {
      saveChanges(param);
    }
    currentIndex = null;
    isOpen.set(false);
  }

  // Handle cancellation of the dialog
  function handleCancel() {
    currentIndex = null;
    isOpen.set(false);
  }

  // Handle closing of the dialog
  function handleDialogClose() {
    isOpen.set(false);
  }
</script>

{#if selectedVolunteer}
  <div class="volunteer">

    <div class="space-y-6">
      <div>
        <div class="text-lg font-medium">Personal Information</div>
        <p class="text-muted-foreground text-sm">Details of {selectedVolunteer.Name}</p>
        <Separator />
      </div>

      <!-- <div id="empty"></div> -->

      <div id="name"
        class="flex space-x-4 pahi-input">
        <div class="w-[30%]">
          <p class="text-muted-foreground text-sm">First Name</p>
          <input bind:value={selectedVolunteer.Fname} placeholder="First Name"/>
        </div>

        <div class="w-[30%]">
          <p class="text-muted-foreground text-sm">Middle Name</p>
          <input bind:value={selectedVolunteer.Midname} placeholder="Middle Name"/>
        </div>

        <div class="w-[30%]">
          <p class="text-muted-foreground text-sm">Last Name</p>
          <input bind:value={selectedVolunteer.Surname} placeholder="Last Name"/>
        </div>
        
        <div class="w-[10%]">
          <p class="text-muted-foreground text-sm">Suffix</p>
          <input bind:value={selectedVolunteer.Suffixname} placeholder="Suffix"/>
        </div>
      </div>

      <div id="birthday"
        class="flex space-x-4 pahi-input">
        <div>
          <p class="text-muted-foreground text-sm">Birthday</p>
          <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" />
        </div>
      </div>
    </div>
  <div>



      
      
      <input bind:value={selectedVolunteer.MobileNum} placeholder="Mobile Num:" />
      <input bind:value={selectedVolunteer.PersonalMail} placeholder="Personal Mail:" />
      <input bind:value={selectedVolunteer.Address} placeholder="Address:" />
      <input bind:value={selectedVolunteer.UPMail} placeholder="UP Mail:" />
      <input bind:value={selectedVolunteer.StudentNumber} placeholder="Student Number:" />
      <input bind:value={selectedVolunteer.DegreeProgram} placeholder="Degree Program:" />
      <input bind:value={selectedVolunteer.College} placeholder="College:" />
      <input bind:value={selectedVolunteer.Department} placeholder="Department:" />
      <input bind:value={selectedVolunteer.Designation} placeholder="Designation:" />
      <input bind:value={selectedVolunteer.EmergencyContactName} placeholder="Emergency Contact Name:" />
      <input bind:value={selectedVolunteer.EmergencyContactRelationship} placeholder="Relationship:" />
      <input bind:value={selectedVolunteer.EmergencyContactNumber} placeholder="Contact Number:" />
      <input bind:value={selectedVolunteer.VolunteerStatus} placeholder="Volunteer Status:" />
      <input bind:value={selectedVolunteer.VolunteerSince} placeholder="Volunteer Since:" />
      <input bind:value={selectedVolunteer.DatabaseID} placeholder="Database ID:" />
      <input bind:value={selectedVolunteer.Notes} placeholder="Notes:" />
      <!-- Trigger the save operation -->
      <button on:click={() => openDialog(data.findIndex(volunteer => volunteer._id === selectedVolunteer._id))}>
        Save
      </button>
    </div>


  </div>
{:else}
  <p>No volunteer selected</p>
{/if}

<!-- {#if $isOpen} -->
  <ConfirmDialog
    content="Are you sure you want to proceed?"
    buttonText="Yes"
    open={$isOpen}
    onConfirm={handleConfirm}
    onCancel={handleCancel}
    confirmParam={currentIndex}
    on:close={handleDialogClose}
  />
<!-- {/if} -->