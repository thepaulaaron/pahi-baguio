<script lang="ts">
  import { writable } from "svelte/store";
  import type { Volunteer } from "./sort";
  import ConfirmDialog from "$comp/confirm-dialog.svelte";

  export let data: Volunteer[];

  let currentIndex: number | null = null; // Track the index of the volunteer being edited

  // Function to save changes
  function saveChanges(index: number) {
    const updatedVolunteer = { ...data[index] };
    const { _id, ...updateData } = updatedVolunteer;

    console.log('Saving volunteer with ID:', _id); // Debug log

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
      .then(data => console.log('Data saved:', data))
      .catch(error => console.error('Error saving data:', error));
  }

  // State for managing the dialog
  const showDialog = writable(false);

  function openDialog(index: number) {
    currentIndex = index;
    showDialog.set(true);
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

  function handleDialogOpenChange(event: CustomEvent<boolean>) {
    showDialog.set(event.detail);  // Correctly extract boolean value from the event
  }
</script>

<div>
  <!-- Dialog for confirmation -->
  {#if $showDialog}
  <ConfirmDialog
    content="Are you sure you want to proceed?"
    buttonText="Yes"
    open={$showDialog}
    onConfirm={handleConfirm}
    onCancel={handleCancel}
    confirmParam={currentIndex}
    on:openChange={handleDialogOpenChange}
  />
{/if}

  <!-- List of volunteers -->
  {#each data as volunteer, index}
    <div class="volunteer">
      <input bind:value={volunteer.Fname} placeholder="Name" />
      <input bind:value={volunteer.VolType} placeholder="Volunteer Type" />
      <button on:click={() => openDialog(index)}>Save</button>
    </div>
  {/each}
</div>