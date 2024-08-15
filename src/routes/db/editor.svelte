<script lang="ts">
  import { writable } from "svelte/store";
  import ConfirmDialog from "$comp/confirm-dialog.svelte";
  import type { Volunteer } from "./sort";
  import { selectedVolunteerId } from '$lib/context'; // Ensure this path is correct

  let editedData: Volunteer[] = [];
  import { activeTab } from "$str";

  export let data: Volunteer[];

  let volunteerId: string | undefined;
  $: $selectedVolunteerId, volunteerId = $selectedVolunteerId;

  let selectedVolunteer: Volunteer | undefined;
  $: selectedVolunteer = data.find(volunteer => volunteer._id === volunteerId);

  const showDialog = writable(false);
  let currentIndex: number | null = null;

  function openDialog(index: number) {
    currentIndex = index;
    showDialog.set(true);
  }

  function updateLocalData(updatedVolunteer: Volunteer) {
    data = data.map(volunteer =>
      volunteer._id === updatedVolunteer._id ? updatedVolunteer : volunteer
    );
  }

  function saveChanges(index: number) {
    // Prepare the data to be passed to the function stored in the store
    const updatedVolunteer = { ...data[index] };
    const { _id, ...updateData } = updatedVolunteer;

    console.log('Saving volunteer with ID:', _id);

    fetch(`/api/volunteers/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(updatedData => {
        console.log('Data saved:', updatedData);

        // Update the local data array with the updated volunteer
        updateLocalData({ ...updatedVolunteer, ...updatedData });

        // Also update the selectedVolunteer directly
        if (selectedVolunteer) {
          Object.assign(selectedVolunteer, updatedData);
        }
      })
      .catch(error => console.error('Error saving data:', error));
  }

  function handleConfirm(param: number | null) {
    if (param !== null) {
      saveChanges(param);
    }
    currentIndex = null;
    showDialog.set(false);
  }

  function handleCancel() {
    currentIndex = null;
    showDialog.set(false);
  }

  function handleDialogClose() {
    showDialog.set(false);
  }
</script>

{#if selectedVolunteer}
  <div class="volunteer">
    <input bind:value={selectedVolunteer.Fname} placeholder="First Name:" />
    <input bind:value={selectedVolunteer.Midname} placeholder="Middle Name:" />
    <input bind:value={selectedVolunteer.Surname} placeholder="Surname:" />
    <input bind:value={selectedVolunteer.Suffixname} placeholder="Suffix:" />
    <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" />
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
    <button on:click={() => openDialog(data.findIndex(volunteer => volunteer._id === selectedVolunteer._id))}>Save</button>
  </div>
{:else}
  <p>No volunteer selected</p>
{/if}

{#if $showDialog}
  <ConfirmDialog
    content="Are you sure you want to proceed?"
    buttonText="Yes"
    open={$showDialog}
    onConfirm={handleConfirm}
    onCancel={handleCancel}
    confirmParam={currentIndex}
    on:close={handleDialogClose}
  />
{/if}
